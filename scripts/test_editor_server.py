"""Verify saving, conflict protection, and request validation without editing real content."""
import copy
import json
from pathlib import Path
import tempfile
import threading
import unittest
from urllib.error import HTTPError
from urllib.request import Request, urlopen

from editor_server import EditorServer


class EditorTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        (self.root / "static").mkdir()
        self.file = self.root / "static/content.json"
        self.file.write_bytes((Path(__file__).resolve().parents[1] / "static/content.json").read_bytes())
        self.initial = self.file.read_bytes()
        self.server = EditorServer(("127.0.0.1", 0), self.root)
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.origin = f"http://127.0.0.1:{self.server.server_port}"
        with urlopen(self.origin + "/__editor/state") as response:
            self.state = json.load(response)

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join()
        self.temp.cleanup()

    def save(self, content=None, rev=None, **headers):
        payload = {"content": content if content is not None else self.state["content"],
                   "revision": rev if rev is not None else self.state["revision"]}
        auth = {"Origin": self.origin, "Content-Type": "application/json", "X-Editor-Token": self.state["token"]}
        auth.update(headers)
        request = Request(self.origin + "/__editor/save", json.dumps(payload).encode(), auth, method="POST")
        try:
            with urlopen(request) as response:
                return response.status, json.load(response)
        except HTTPError as error:
            return error.code, json.load(error)

    def test_save_persists_and_keeps_exact_backup(self):
        draft = copy.deepcopy(self.state["content"])
        draft["socialsim"]["headline"] = "Edited research statement"
        status, result = self.save(draft)
        self.assertEqual(status, 200)
        self.assertEqual(json.loads(self.file.read_text()), draft)
        self.assertNotEqual(result["revision"], self.state["revision"])
        backups = list((self.root / ".local-editor/backups").glob("*.json"))
        self.assertEqual(len(backups), 1)
        self.assertEqual(backups[0].read_bytes(), self.initial)

    def test_conflicting_external_change_is_not_overwritten(self):
        external = self.initial + b"\n"
        self.file.write_bytes(external)
        self.assertEqual(self.save()[0], 409)
        self.assertEqual(self.file.read_bytes(), external)

    def test_cross_origin_and_invalid_session_cannot_save(self):
        self.assertEqual(self.save(Origin="https://example.com")[0], 403)
        self.assertEqual(self.save(**{"X-Editor-Token": "wrong"})[0], 403)
        self.assertEqual(self.file.read_bytes(), self.initial)

    def test_broken_publication_reference_is_rejected(self):
        draft = copy.deepcopy(self.state["content"])
        draft["socialsim"]["evaluation"][0]["paper"] = "https://example.com/missing"
        self.assertEqual(self.save(draft)[0], 422)
        self.assertEqual(self.file.read_bytes(), self.initial)

    def test_invalid_schema_is_rejected(self):
        draft = copy.deepcopy(self.state["content"])
        draft["research"]["publications"] = "invalid"
        self.assertEqual(self.save(draft)[0], 422)
        self.assertEqual(self.file.read_bytes(), self.initial)


if __name__ == "__main__":
    unittest.main()
