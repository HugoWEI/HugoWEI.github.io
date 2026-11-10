# Hugo Wei — selected work

This is the hand-edited static site at https://hugowei.github.io/.

## Navigation

- `index.html`: concise landing page
- `archive/hawkes.html`: 2024 team work on multivariate Hawkes processes with inhibition
- `archive/big-data.html`: ESCP team work on Big Data and sustainability
- `research/index.html`: one-page physics teaser, without speculative project/paper claims
- `about/index.html`: brief background
- `archive/index.html`: compatibility index for older archive links

HTML uses `assets/styles.css` and `assets/compact.css`. GitHub Pages deploys the repository root via `.github/workflows/deploy.yml`.

## Full historical PDFs

The GitHub API text-edit workflow cannot attach arbitrary local binary PDFs. The existing **revised public synopses** remain in the repository and are currently linked as fallbacks:

- `papers/hawkes/hawkes-research-synopsis.pdf`
- `papers/big-data/big-data-research-synopsis.pdf`

To publish the original uploaded team reports, add the original files without alteration at:

- `papers/hawkes/original-report.pdf`
- `papers/big-data/original-report.pdf`

The visible PDF buttons automatically switch to the originals after both paths independently become available; no HTML edit is required. Before publicly posting the 94-page Big Data original, check that all coauthors and identified interview participants agree to its dissemination. Historical estimates and statements should not be mistaken for contemporary findings.

Older Python build tools remain for version history but are **not** needed for this compact edition. Running `build_site.py` or the editorial generators can overwrite the new pages, so do not run them without reconciling their templates.

The detailed speculative physics articles, former interactive lab, and former archival visual explorations have been removed from GitHub Pages. Their commit history remains available.
