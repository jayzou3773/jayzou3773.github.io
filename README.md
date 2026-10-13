# jayzou3773.github.io

Minimal personal website for Jay (Xinkai) Zou, built with Hugo and custom templates.

## Content

- `static/content.json` is the source of truth for About, Research (including authors and TL;DR), Projects, Blogs metadata, Experience and social links.
- Blog bodies and images remain in `content/projects/<slug>/`; their public URLs are `/blogs/<slug>/`.
- Legacy `/projects/<slug>/` article links redirect to the corresponding blog. `/about/`, `/publications/`, and `/projects/` redirect to their new homepage sections.
- The old About/Publications Markdown is retained as historical source; it is not used by the new homepage.
- The photo and J favicon are in `static/assets/`.
- Research groups start collapsed. Each paper has an independently expandable TL;DR.
- This is a read-only static site: there is no browser editor, save API, or Python backend. Edit the source files to update content.

## Local development

```bash
hugo server --buildFuture
```

Open http://localhost:1313. Production build:

```bash
hugo --minify --buildFuture --environment production
python3 scripts/check_site.py public
```

## Deployment

The existing GitHub Actions workflow deploys `public/` to GitHub Pages on push to `main`. Building or previewing locally does not deploy the website.
