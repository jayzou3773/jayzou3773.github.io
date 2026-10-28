# jayzou3773.github.io

Minimal personal website for Jay (Xinkai) Zou, built with Hugo and custom templates.

## Content

- `static/content.json` is the source of truth for About, Research (including authors and TL;DR), Projects, Blogs metadata, Experience and social links.
- Blog bodies and images remain in `content/projects/<slug>/`; their public URLs are `/blogs/<slug>/`.
- Legacy `/projects/<slug>/` article links redirect to the corresponding blog. `/about/`, `/publications/`, and `/projects/` redirect to their new homepage sections.
- The old About/Publications Markdown is retained as historical source; it is not used by the new homepage.
- The photo and J favicon are in `static/assets/`.
- Research groups start collapsed. Each paper has an independently expandable TL;DR.
- `Research` (`/#research`) combines the Social Simulation roadmap and Language Models. `Publications` (`/#publications`) is the full paper list.
- `/socialsim/` opens Research; `/modeling/` and `/#modeling` open the Language Models section. The prior hash links still work.
- `socialsim` and `modeling` in `static/content.json` define headings, short paper labels, and references. The full publication list supplies titles and venue data. Research uses shortened HCI venue labels; Publications retains the full Poster labels.
- The published website is static. The optional local editor runs separately on loopback and is never included in the Hugo output.

## Local development

```bash
hugo server --buildFuture
```

Open http://localhost:1313. For editing in the browser, keep Hugo running and start a second terminal:

```bash
python3 scripts/editor_server.py
```

The default preview has no edit button. To enable local editing, open http://127.0.0.1:1314/?edit=1#research and click **编辑内容**. Change fields, inspect the live preview, and click **保存到项目**. This writes `static/content.json` and saves a prior copy in ignored `.local-editor/backups/`. The editor changes existing items and fields; add or remove entries in the source JSON. Publication URL changes are propagated to research references. Unsaved edits can be undone or downloaded as a JSON draft. Concurrent source changes are rejected instead of overwritten.

The editor binds only to 127.0.0.1. Writes require the same origin and a session token. It does not push or deploy. Verify the save service with `python3 scripts/test_editor_server.py`.

Production build (use a separate destination while Hugo's preview is running):

```bash
hugo --minify --buildFuture --environment production --destination /tmp/personal-site-production
python3 scripts/check_site.py /tmp/personal-site-production
```

## Deployment

The existing GitHub Actions workflow deploys `public/` to GitHub Pages on push to `main`. Building or previewing locally does not deploy the website.
