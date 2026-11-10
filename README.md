# Hugo Wei — selected work

This is the hand-edited static site at https://hugowei.github.io/.

## Navigation

- `index.html`: concise landing page with top navigation for Home, Research, and Tools
- `archive/hawkes.html`: 2024 team work on multivariate Hawkes processes with inhibition
- `archive/big-data.html`: ESCP team work on Big Data and sustainability
- `research/index.html`: four-entry research catalogue, with Physics, LMM, Hawkes, and Big Data
- `research/physics.html`: short physics topics page
- `tools/index.html`: tools catalogue, currently featuring the Polymarket LOB WIP demo
- `about/index.html`: brief background
- `archive/index.html`: compatibility index for older archive links

HTML uses `assets/styles.css` and `assets/compact.css`. GitHub Pages deploys the repository root via `.github/workflows/deploy.yml`.

## Full historical PDFs

The complete original reports are stored in the repository under `papers/hawkes/original-report.pdf` and `papers/big-data/original-report.pdf`. These are the original, unchanged PDF uploads provided by the author. The earlier edited public synopses remain as supplementary documents.

This is collaborative historical work: coauthors are credited on the website and the Big Data report contains named interview material and period-specific figures.

Older Python build tools remain for version history but are **not** needed for this compact edition. Running `build_site.py` or the editorial generators can overwrite the new pages, so do not run them without reconciling their templates.

The detailed speculative physics articles, former interactive lab, and former archival visual explorations have been removed from GitHub Pages. Their commit history remains available.

## November 2026 update

The Research navigation item opens a three-entry catalogue (current physics questions; previous Hawkes and Big Data work). The **complete original report PDFs** are now committed to this GitHub repository, with unchanged bytes from the user-provided original reports:

- `papers/hawkes/original-report.pdf` — 25 pages, CentraleSupélec group report (2024)
- `papers/big-data/original-report.pdf` — 94 pages, ESCP group report

Both the Research catalogue cards and the dedicated report-page PDF buttons link to these local originals on GitHub Pages. The shorter edited synopses remain in the repository as supplementary historical files but are not linked from the active research pages.

**Document context:** The Big Data report contains historical projections and named interviews; readers should interpret its statements in the context of its original research period.

## November 2026 additions

- The main navigation now includes **Tools** immediately after **Research** on all active pages.
- The Tools catalogue features **Polymarket LOB lab**, marked **WIP DEMO**, linked to [the live demo](https://hugowei.github.io/polymarket-lob/) and [the source repository](https://github.com/HugoWEI/polymarket-lob).
- The Research catalogue includes **LIBOR Market Model: calibration & extensions** as the second entry, below the Physics topics and above Hawkes and Big Data.
- The LMM card has separate links to `papers/lmm/presentation.pdf` (54 pages) and `papers/lmm/thesis.pdf` (79 pages). **These PDF links will not resolve until the two files have been uploaded** to those exact paths. A placeholder README exists in `papers/lmm/`. Review institutional and employer publication requirements before making the PDFs public.
