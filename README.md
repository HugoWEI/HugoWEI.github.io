# Hugo Wei — Research Portfolio

A responsive, accessible, no-build static research website with ten pages, four active research articles, and two public editorial research synopses (PDF + LaTeX + original diagrams).

## Preview locally

Open `index.html` directly in a browser, or run:

```bash
python -m http.server 8000
```

Visit `http://localhost:8000/`.

No runtime dependencies or build step. Content and generated markup are held in `build_site.py`. Style and interactions live in `assets/styles.css` and `assets/app.js`. To regenerate pages after editing `build_site.py`:

```bash
python build_site.py
```

## Publish on GitHub Pages

1. Create a **new public repository** in your GitHub account (e.g. `research-portfolio` or `HugoWEI.github.io`).
2. Add this site's files to the repository root and push to `main`.
3. Under **Settings → Pages → Build and deployment**, select **GitHub Actions**.
4. The included `.github/workflows/deploy.yml` publishes every push. The site will be at `https://hugowei.github.io/research-portfolio/` if using `research-portfolio`, or `https://hugowei.github.io/` for the special repository `HugoWEI.github.io`.
5. For a custom domain, use the GitHub Pages domain configuration in **Settings → Pages**, then set the DNS records at your registrar.

All internal links are relative, so either repository naming pattern is supported without a separate build step.

Cloudflare Pages is also supported: connect the repository, leave **build command** empty, and use `/` (repo root) for the static output. GitHub Pages is the simplest first deployment for this release.

## Public materials policy

- `papers/hawkes/hawkes-research-synopsis.pdf` — new editorial public synopsis of the 2024 CentraleSupélec group project.
- `papers/big-data/big-data-research-synopsis.pdf` — new editorial public synopsis of the 2023 ESCP group project.
- Corresponding `main.tex` and credited historical figures are included and downloadable.
- The two complete original report PDFs are **not** included in this publishable folder: they were provided for editorial review, but the full-group and interview permissions, outdated data, and mathematical statements have not been exhaustively cleared.
- The PDFs here are newly authored synopsis editions, not full replacements for the 25-page and 94-page originals. For full LaTeX reconstruction of the originals, original `.tex`, `.bib`, image files and any source documents would be needed for reliable, layout-preserving edits.

## Scientific provenance

Descriptions of active research are drawn from the four public GitHub repositories as read on 30 October 2026. Results described as exact have the scope of the posted finite instances and should not be generalized. New-paper publication and originality are not claimed.

## Files

```text
index.html                main landing
research/index.html       research project index
research/*.html           individual research explanations
archive/index.html        curated archive
archive/*.html            downloadable older-work synopses
about/index.html          background
papers/*/main.tex         editable research synopsis sources
papers/*/*.pdf            compiled notes
assets/                   CSS, JS, favicon
build_site.py             deterministic HTML generator
.github/workflows/        GitHub Pages deployment
```

## Next edits before an official public launch

- Review biography / affiliation wording.
- Confirm the names and original report dates with coauthors.
- Add a public contact email and CV if desired.
- Inspect and validate all original historical figure permissions.
- Revisit project claims as the research repositories evolve.