/* If an original team PDF is uploaded later, replace the edited synopsis link automatically.
   Until then, every visible PDF button points to an existing, accurately labeled file. */
document.querySelectorAll('a[data-original-pdf]').forEach(async (link) => {
  try {
    const r = await fetch(link.dataset.originalPdf, {method:'HEAD', cache:'no-store'});
    if (r.ok && (r.headers.get('content-type') || '').toLowerCase().includes('pdf')) {
      link.href = link.dataset.originalPdf;
      const status = link.parentElement.querySelector('.pdf-status');
      if (status) status.textContent = 'Original collaborative report · PDF (historical document)';
    }
  } catch (_) { /* synopsis remains the active fallback */ }
});
