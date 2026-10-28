"""Check a clean Hugo production build: python3 scripts/check_site.py BUILD_DIR."""
import json
from html.parser import HTMLParser
from pathlib import Path
import sys
from urllib.parse import unquote, urljoin, urlsplit


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.references = []
        self.redirects = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for key in ("src", "href"):
            if attrs.get(key):
                self.references.append(attrs[key])
        if tag == "meta" and attrs.get("http-equiv", "").lower() == "refresh":
            self.redirects.append(attrs.get("content", ""))


root = Path(sys.argv[1]).resolve()
repo = Path(__file__).resolve().parents[1]
data = json.loads((root / "content.json").read_text())
assert data == json.loads((repo / "static/content.json").read_text())
assert all(isinstance(p.get("tldr", ""), str) for p in data["research"]["publications"])
assert {p["topic"] for p in data["research"]["publications"]} == {"efficient", "discovery", "hci"}
assert all("contributor" not in p["description"].lower() and "project lead" not in p["description"].lower() for p in data["projects"]["items"])
arena = next(p for p in data["projects"]["items"] if p["name"] == "Social Simulation Arena")
assert arena["paper"] and arena["project"] and arena["code"]

routes = ["index.html", "404.html"]
for blog in data["blogs"]["items"]:
    slug = blog["slug"]
    routes.append(f"blogs/{slug}/index.html")
    alias = Page((root / f"projects/{slug}/index.html").read_text())
    assert any(f"/blogs/{slug}/" in value for value in alias.redirects)
for path, target in [("about", "about"), ("publications", "publications"), ("projects", "blogs"), ("blogs", "blogs"), ("search", "about")]:
    alias = Page((root / path / "index.html").read_text())
    assert any(f"/#{target}" in value for value in alias.redirects), path

for route in routes:
    text = (root / route).read_text()
    assert "editor.js" not in text and "editor.css" not in text and "data-edit-module" not in text, route
    assert "noindex" not in text, route
    for reference in Page(text).references:
        url = urlsplit(urljoin("https://jayzou3773.github.io/" + route, reference))
        if url.netloc != "jayzou3773.github.io" or url.scheme not in ("http", "https"):
            continue
        path = root / unquote(url.path).lstrip("/")
        if url.path.endswith("/"):
            path /= "index.html"
        assert path.is_file(), (route, reference)

for name in ("editor.js", "editor.css", "server.py", "test_editor.py", ".editor-backups", "api"):
    assert not (root / name).exists(), name
app = (root / "app.js").read_text()
assert "Full publication details" not in app
assert "new Set(groups.map(group => group.id))" in app
assert "/api/" not in app and "editModule" not in app
for name in ("openai_tc", "apple_tc", "meta_tc", "cbs_wiki", "chrysler_wiki", "united_airlines_wiki"):
    assert (root / f"projects/group-behavior-simulation/{name}.html").is_file()
print(f"Verified {len(routes)} pages, {len(data['research']['publications'])} papers, redirects, assets and read-only output.")
