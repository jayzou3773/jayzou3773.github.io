"""Local content editor and Hugo preview proxy. Run alongside hugo server."""
import argparse
from datetime import datetime, timezone
import hashlib
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import os
from pathlib import Path
import re
import secrets
import tempfile
import threading
from urllib.error import HTTPError, URLError
from urllib.parse import parse_qs, urlsplit
from urllib.request import urlopen

ASSETS = Path(__file__).parent / "local-editor"
LIMIT = 2 * 1024 * 1024


def revision(raw):
    return hashlib.sha256(raw).hexdigest()


def validate_shape(value, source, path="content"):
    if type(value) is not type(source):
        raise ValueError(f"{path}: type must remain {type(source).__name__}")
    if isinstance(source, dict):
        if value.keys() != source.keys():
            raise ValueError(f"{path}: fields cannot be added or removed in this editor")
        for key in source:
            validate_shape(value[key], source[key], path + "." + key)
    elif isinstance(source, list):
        if len(value) != len(source):
            raise ValueError(f"{path}: item count must remain unchanged")
        for index, (item, original) in enumerate(zip(value, source)):
            validate_shape(item, original, f"{path}[{index}]")
    elif isinstance(source, str) and len(value) > 20000:
        raise ValueError(f"{path}: text is too long")


def validate_content(value, source):
    validate_shape(value, source)
    papers = value["research"]["publications"]
    urls = [p["paper"] for p in papers]
    if len(urls) != len(set(urls)):
        raise ValueError("Publication URLs must be unique")
    for p in papers:
        if not p["title"].strip() or urlsplit(p["paper"]).scheme not in ("http", "https"):
            raise ValueError("Each publication needs a title and an HTTP(S) paper link")
    refs = list(value["socialsim"]["evaluation"])
    refs += [p for b in value["socialsim"]["branches"] for p in b["papers"]]
    refs += value["modeling"]["methods"] + value["modeling"]["evaluation"]
    if any(item.get("paper") and item["paper"] not in urls for item in refs):
        raise ValueError("A research item refers to a paper outside the publication list")


class EditorServer(ThreadingHTTPServer):
    daemon_threads = True

    def __init__(self, address, root, upstream="http://127.0.0.1:1313"):
        self.root = Path(root).resolve()
        self.content_file = self.root / "static" / "content.json"
        self.upstream = upstream.rstrip("/")
        self.token = secrets.token_urlsafe(32)
        self.write_lock = threading.Lock()
        super().__init__(address, EditorHandler)


class EditorHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

    def send_body(self, status, body, content_type="application/json; charset=utf-8"):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "SAMEORIGIN")
        self.end_headers()
        self.wfile.write(body)

    def reply(self, status, payload):
        self.send_body(status, json.dumps(payload, ensure_ascii=False).encode())

    def valid_host(self):
        port = self.server.server_port
        return self.headers.get("Host") in (f"127.0.0.1:{port}", f"localhost:{port}")

    def do_GET(self):
        if not self.valid_host():
            return self.reply(403, {"error": "Local host required"})
        path = urlsplit(self.path).path
        if path == "/__editor/state":
            raw = self.server.content_file.read_bytes()
            return self.reply(200, {"content": json.loads(raw), "revision": revision(raw), "token": self.server.token})
        if path == "/content.json":
            return self.send_body(200, self.server.content_file.read_bytes())
        assets = {"/__editor/editor.js": ("editor.js", "text/javascript"),
                  "/__editor/editor.css": ("editor.css", "text/css")}
        if path in assets:
            name, mime = assets[path]
            return self.send_body(200, (ASSETS / name).read_bytes(), mime + "; charset=utf-8")
        if path.startswith("/__editor/"):
            return self.reply(404, {"error": "Not found"})
        try:
            with urlopen(self.server.upstream + self.path, timeout=10) as response:
                body = response.read()
                content_type = response.headers.get("Content-Type", "application/octet-stream")
                status = response.status
        except HTTPError as error:
            return self.send_body(error.code, error.read(), error.headers.get("Content-Type", "text/plain"))
        except URLError:
            return self.reply(502, {"error": "Start Hugo on port 1313, then refresh this page."})
        if "text/html" in content_type:
            html = body.decode("utf-8")
            html = re.sub(r'<script[^>]+src=["\']?/livereload\.js[^>]*></script>', '', html)
            if parse_qs(urlsplit(self.path).query).get("edit") == ["1"] and ('id="main"' in html or 'id=main' in html):
                html = html.replace('</body>', '<link rel="stylesheet" href="/__editor/editor.css"><script src="/__editor/editor.js" defer></script></body>')
            # Legacy aliases should stay on the editable local origin.
            html = html.replace("http://localhost:1313/", "/").replace("http://127.0.0.1:1313/", "/")
            body = html.encode("utf-8")
        self.send_body(status, body, content_type)

    def do_POST(self):
        if not self.valid_host() or self.headers.get("Origin") != "http://" + self.headers.get("Host", ""):
            return self.reply(403, {"error": "Save from the local editor page only"})
        if not secrets.compare_digest(self.headers.get("X-Editor-Token", ""), self.server.token):
            return self.reply(403, {"error": "Editor session expired. Reload the page."})
        if urlsplit(self.path).path != "/__editor/save":
            return self.reply(404, {"error": "Not found"})
        if self.headers.get_content_type() != "application/json":
            return self.reply(415, {"error": "JSON required"})
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length < 1 or length > LIMIT:
                return self.reply(413, {"error": "Invalid content size"})
            payload = json.loads(self.rfile.read(length))
        except (ValueError, UnicodeDecodeError):
            return self.reply(400, {"error": "Invalid JSON"})
        if not isinstance(payload, dict) or not isinstance(payload.get("content"), dict):
            return self.reply(400, {"error": "Content is required"})
        with self.server.write_lock:
            raw = self.server.content_file.read_bytes()
            if payload.get("revision") != revision(raw):
                return self.reply(409, {"error": "文件已被其他编辑修改。你的草稿仍保留，请先复制草稿，再刷新页面。"})
            try:
                validate_content(payload["content"], json.loads(raw))
            except (ValueError, KeyError, TypeError) as error:
                return self.reply(422, {"error": str(error)})
            saved = (json.dumps(payload["content"], ensure_ascii=False, indent=2) + "\n").encode()
            if saved != raw:
                backup_dir = self.server.root / ".local-editor" / "backups"
                backup_dir.mkdir(parents=True, exist_ok=True)
                stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S.%fZ")
                (backup_dir / (stamp + "-" + revision(raw)[:8] + ".json")).write_bytes(raw)
                handle, temp = tempfile.mkstemp(prefix=".content-", dir=self.server.content_file.parent)
                try:
                    with os.fdopen(handle, "wb") as output:
                        output.write(saved)
                        output.flush()
                        os.fsync(output.fileno())
                    os.replace(temp, self.server.content_file)
                finally:
                    if os.path.exists(temp):
                        os.unlink(temp)
            self.reply(200, {"revision": revision(saved), "content": payload["content"]})


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=1314)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    server = EditorServer(("127.0.0.1", args.port), root)
    print(f"Local editor: http://127.0.0.1:{args.port}/?edit=1#research", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
