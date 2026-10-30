# Hugo Wei — Research Portfolio

A responsive, accessible, no-build static research website with eleven pages, a four-module interactive research lab, four active research articles, and two public editorial research synopses (PDF + LaTeX + original diagrams).

## Preview locally

Open `index.html` directly in a browser, or run:

```bash
python -m http.server 8000
```

Visit `http://localhost:8000/`.

No runtime dependencies or build step. Content and generated markup are held in `build_site.py` and `build_lab.py`. Styling and interactions live in `assets/`, with a separate `lab.js` and `lab.css` to keep the scientific explorers independent. To regenerate pages:

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

## Interactive research lab

`research/lab.html` links four evidence-scoped displays directly to dated, reproducible source notebooks:

1. **Magic (exact polynomial):** the plot is a browser evaluation of the degree-8 rational optimal branches in `quantum-magic-gate-bounds/notes/three_t_exact_branch_and_correlation_tube.md`. The interval is s in [-1/8, 1/4]. Novelty is not established.
2. **Revivals (conditional numerical result):** the two time locations and enclosures come verbatim from `quantum-entanglement-revivals/research/phase-revivals/certificate/FINAL_RESULTS.json`. Bounds rely on ordinary floating-point inputs; this is not a machine-certified interval theorem.
3. **SdS (thermodynamic baseline):** instant classical SdS horizon roots and `S_proxy(M) = S_b(M)+S_c(M)-S_b(M0)-S_c(M0)` are evaluated in JavaScript with G=1, Λ=3e−6. The crossing is only a proxy, not a QES or fine-grained Page transition. At M0=100 the baseline crossing mass is 83.0330759993.
4. **Neural dynamics (negative control):** the four seeds and both error measurements come from `nonmarkovian-neural-dynamics/results/2026-10-29-seed-robustness.md`. The tested weighting made global population RMSE worse in all four seeds.

For technical reproducibility, refer to each linked repository. The graphs are not live server-side simulations and are not presented as new discoveries.

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
research/*.html           individual explanations and interactive lab
archive/index.html        curated archive
archive/*.html            downloadable older-work synopses
about/index.html          background
papers/*/main.tex         editable research synopsis sources
papers/*/*.pdf            compiled notes
assets/                   CSS, JS, favicon
build_site.py + build_lab.py   deterministic HTML generators
.github/workflows/        GitHub Pages deployment
```

## Next edits before an official public launch

- Review biography / affiliation wording.
- Confirm the names and original report dates with coauthors.
- Add a public contact email and CV if desired.
- Inspect and validate all original historical figure permissions.
- Revisit project claims as the research repositories evolve.


## Version 3: mathematical explanations and interactive early research

- Guided first-principles introductions on all four current research pages, with displayed LaTeX formula source.
- Mathematical expressions pre-rendered as **inline accessible MathJax SVG at build time**, so the pages do not depend on a browser-downloaded renderer. The originating TeX is retained in `data-latex` attributes and in `build_editorial.py`.
- Earlier research now appears prominently on the homepage, with interactive Hawkes inhibition and an animated, sourced *Grande Marche* 2016–17 historical case study.
- Political visualization uses only aggregate published results; it distinguishes the original ESCP report, historical reporting and election outcomes and does not assert that analytics caused the election. See [source methodology](docs/historical-election-sources.md).

### Rebuild all pages

Install Node.js and Python 3 with BeautifulSoup, then run:

```sh
npm install
python -m pip install beautifulsoup4
python build_site.py
python qa_site.py
```

`math_render.cjs` uses `mathjax-full` 3.2.2 (pinned in `package.json`) to pre-render all TeX, while `build_editorial.py` creates guided explanations and archival case-study pages. The deployment itself is static and needs no server-side runtime.

Rebuilds require permission to publish only scientifically validated descriptions, and historical report downloads remain carefully distinguished from the original team PDFs pending review.
