"""Enrich public research portfolio with mathematical explanations and archival interactives.
Run after build_site.py. All historical election graphics use aggregate public sources.
"""
from pathlib import Path
from bs4 import BeautifulSoup

MATH = {
    'magic-gate-bounds': r'''<p class="teaching-lead">A quantum computer is built from elementary operations called <em>gates</em>. Clifford gates are efficient to simulate classically; adding non-Clifford gates such as the <strong>T gate</strong> provides a resource known as <strong>magic</strong>. A CNOT gate entangles two qubits and its physical cost constrains which circuits we can implement.</p>
<div class="teaching-steps"><div><span>01</span><h3>Measure magic</h3><p>For each two-qubit Pauli string \(P\in\{I,X,Y,Z\}^{\otimes2}\), compute its expectation in the state \(\lvert\psi\rangle\). The Pauli fourth moment and second stabilizer Rényi entropy are</p><div class="math-display">\[R(\psi)=\sum_{P\in\mathcal P_2}\langle\psi\lvert P\rvert\psi\rangle^4,\qquad M_2(\psi)=-\log_2\!\left(\frac{R(\psi)}{4}\right).\]</div><p>A smaller fourth moment corresponds to more stabilizer Rényi magic.</p></div>
<div><span>02</span><h3>Fix the input</h3><p>Unlike bounds for arbitrary inputs, this experiment fixes a one-parameter family of entangled states that already contain magic:</p><div class="math-display">\[\lvert\psi_s\rangle=\frac{1}{\sqrt{s^2+8s+79}}\begin{pmatrix}-1+3i\\-7-i\\-1+i\\-1+(4+s)i\end{pmatrix},\quad -\tfrac18\le s\le\tfrac14.\]</div><p>The allowed circuits have at most three T gates, arbitrary local Clifford gates, and a restricted number of physical CNOT gates.</p></div>
<div><span>03</span><h3>Compare attainable optima</h3><p>Write \(R_1(s)\) for the best fourth moment with at most one CNOT and \(R_2(s)\) for the best with at most two. The exact calculations in the source repository give</p><div class="math-display">\[R_1(s)=\frac{P_1(s)}{N(s)^4},\quad R_2(s)=\frac{P_\star(s)}{16N(s)^4},\quad N(s)=s^2+8s+79.\]</div><div class="math-display">\[\Delta M_2(s)=\log_2\frac{R_1(s)}{R_2(s)}>0.\]</div><p>The full polynomial coefficients and finite dominance certificate are documented in the repository, rather than hidden behind the plot.</p></div></div>
<div class="teaching-conclusion"><strong>What is established?</strong> A model-specific exact finite computer-assisted certificate across the stated family. It is not yet a peer-reviewed or literature-confirmed novel theorem. <a href="lab.html#magic">Adjust the state parameter in the interactive graph →</a></div>''',
    'entanglement-revivals':r'''<p class="teaching-lead">Imagine launching a disturbance along a finite quantum chain. Its components travel, scatter, reflect at the ends, and eventually interfere again. A <strong>revival</strong> occurs when a quantum-information observable rises after its initial relaxation.</p><div class="teaching-steps"><div><span>01</span><h3>Define the observable</h3><p>For a bipartition with reduced state \(\rho_A(t)\), the modular capacity measures fluctuations of the entanglement Hamiltonian \(K_A=-\log\rho_A\):</p><div class="math-display">\[C_A(t)=\operatorname{Tr}\!\left(\rho_AK_A^2\right)-\left[\operatorname{Tr}\!\left(\rho_AK_A\right)\right]^2.\]</div></div><div><span>02</span><h3>Predict a return wave</h3><p>A leading approximation combines coherent propagation with an Airy description near a return wavefront. For a Gaussian-smoothed observable \(\bar C_A(t)\), the predicted first peak satisfies</p><div class="math-display">\[\left.\frac{\mathrm d\bar C_A^{\mathrm{Airy}}}{\mathrm dt}\right|_{t=t_\star}=0.\]</div></div><div><span>03</span><h3>Check it independently</h3><p>A separate higher-order two-site Volterra solver supplies a validation witness. Reported peak windows are conditional on the exact evaluation of ordinary floating-point inputs—not formal outward-rounded interval certificates.</p><div class="math-display">\[t_\star\in\big[t_{\mathrm{Airy}}-r,\;t_{\mathrm{Airy}}+r\big].\]</div></div></div><div class="teaching-conclusion"><strong>Scope:</strong> two defect orientations, a specified finite system and smoothing rule. <a href="lab.html#revival">Explore the two measured peak locations →</a></div>''',
    'sds-qes-backreaction':r'''<p class="teaching-lead">Schwarzschild–de Sitter spacetime contains two horizons: one around a black hole and another associated with positive cosmological constant. Its geometry is a starting point, but identifying a quantum extremal surface also requires a specified matter state and radiation subsystem.</p><div class="teaching-steps"><div><span>01</span><h3>The classical horizons</h3><p>Set \(G=1\) in the interactive baseline. The black-hole and cosmological horizons are positive roots of</p><div class="math-display">\[f(r)=1-\frac{2GM}{r}-\frac{\Lambda r^2}{3},\qquad f(r_b)=f(r_c)=0.\]</div></div><div><span>02</span><h3>What a QES would require</h3><p>A quantum extremal surface is a stationary point of generalized entropy, consisting of a gravitational area contribution plus the entropy of quantum matter:</p><div class="math-display">\[S_{\mathrm{gen}}(q)=\frac{\operatorname{Area}(q)}{4G_N}+S_{\mathrm{matter}}(R\cup I_q),\qquad \nabla_qS_{\mathrm{gen}}=0.\]</div></div><div><span>03</span><h3>The current verified benchmark</h3><p>For the classical geometry, the integrated thermodynamic entropy proxy is</p><div class="math-display">\[S_{\mathrm{proxy}}(M)=S_b(M)+S_c(M)-S_b(M_0)-S_c(M_0),\qquad S_{b,c}=\frac{\pi r_{b,c}^2}{G}.\]</div><p>The proxy crossing shown in the lab is <strong>not</strong> a fine-grained Page transition, and no physical backreacted QES displacement has been established.</p></div></div><div class="teaching-conclusion">The research task is to define a consistent radiation entropy, calculate both null extremality conditions and establish which saddles dominate. <a href="lab.html#sds">Explore the horizon baseline →</a></div>''',
    'nonmarkovian-neural-dynamics':r'''<p class="teaching-lead">A quantum system is <strong>non-Markovian</strong> when the environment retains memory: the future cannot be predicted from the current reduced state alone without additional information. Neural solvers try to approximate these histories efficiently.</p><div class="teaching-steps"><div><span>01</span><h3>A model of memory</h3><p>A schematic linear memory equation illustrates how the past continuously influences the present:</p><div class="math-display">\[\dot x(t)=Ax(t)+\int_0^tK(t-s)x(s)\,\mathrm ds.\]</div></div><div><span>02</span><h3>Why residuals matter</h3><p>A learned trajectory \(\hat x\) has residual \(r(t)\). For a linear terminal observable, a corresponding adjoint \(z(t)\) can weight the importance of error at different times:</p><div class="math-display">\[\delta J\;\approx\;\int_0^Tz(t)^\top r(t)\,\mathrm dt.\]</div><p>This is a schematic sensitivity relation, not yet a validated improvement for the interacting quantum benchmark.</p></div><div><span>03</span><h3>Show the failed comparison</h3><p>The tested adjoint-weighted loss performed worse on global population RMSE in all four reported seeds of a separate zero-temperature qubit example. Negative evidence matters because an objective function must match the observable we actually want to predict.</p></div></div><div class="teaching-conclusion"><a href="lab.html#neural">Compare all four training seeds →</a> and inspect the original benchmark before interpreting the result.</div>'''
}

CAMPAIGN=r'''<section class="case-hero"><div class="container">
<a class="back-link" href="index.html">← Earlier research</a><p class="tiny-label">BIG DATA / AI / POLITICAL ORGANIZATION · 2016</p>
<h1>How data became <em>a campaign's listening system.</em></h1>
<p class="case-deck">In 2016, En Marche used statistical data to organize a national door-to-door listening effort, and semantic-analysis software to interpret thousands of responses. Explore the documented pipeline behind the Grande Marche.</p>
<p class="source-distinction"><strong>Historical scope:</strong> the original collaborative ESCP paper discusses political Big Data and its ethical questions. This interactive case study adds external reporting on the Grande Marche. It explains <strong>how the tools were used</strong>, not whether they determined the 2017 election.</p>
</div></section>
<section class="case-section"><div class="container">
<div class="case-heading"><span class="tiny-label">01 / THREE CONNECTED TECHNOLOGIES</span><h2>Statistics. Fieldwork. <em>Language AI.</em></h2><p>The innovation was not a magic prediction engine. It was a workflow that linked publicly available geographical statistics, volunteers using mobile forms, and software analyzing large amounts of text.</p></div>
<div class="case-methods">
<div class="case-method"><span class="tiny-label">GEOGRAPHICAL ANALYTICS</span><h3>Liegey Muller Pons</h3><p>LMP combined aggregate <strong>INSEE sociodemographic information</strong> with historical polling-station results to choose where the Grande Marche would conduct interviews. This describes planning, not individual voter prediction. <a href="https://www.leparisien.fr/politique/dans-les-coulisses-de-la-grande-marche-de-macron-21-05-2016-5816587.php" target="_blank" rel="noopener">Contemporary report ↗</a></p></div>
<div class="case-method"><span class="tiny-label">MOBILE FIELD COLLECTION</span><h3>Door-to-door interviews</h3><p>Volunteers asked open-ended questions and recorded responses through an application. Reporting distinguishes <strong>roughly 25,000 completed questionnaires</strong> from the larger claim of 100,000 conversations. <a href="https://www.lemonde.fr/les-decodeurs/article/2016/10/07/emmanuel-macron-la-grande-marche-et-ses-chiffres-flous_5009682_4355770.html" target="_blank" rel="noopener">Methodology review ↗</a></p></div>
<div class="case-method"><span class="tiny-label">SEMANTIC ANALYSIS</span><h3>Proxem</h3><p>Proxem analyzed reported survey text—<strong>about 1.5 million words</strong>—to organize themes, compare contextual associations, and produce a diagnostic. Its founder described a <strong>deep-learning-based approach</strong>; details of its model and accuracy were not independently verified here. <a href="https://www.lemondeinformatique.fr/actualites/lire-presidentielle-2017%EF%BF%BD-l-utilisation-des-data-au-coeur-de-la-campagne-68002.html" target="_blank" rel="noopener">Industry interview ↗</a></p></div>
</div>
</div></section>
<section class="case-section case-alt"><div class="container">
<div class="case-heading"><span class="tiny-label">02 / ANIMATED EXPLANATION</span><h2>Follow the <em>information flow.</em></h2><p>Move through the documented steps, from aggregated datasets to a published diagnosis. The animated diagram is <strong>schematic</strong>: it does not depict the campaign's internal databases or private interview records.</p></div>
<div class="campaign-stage"><div class="case-controls"><button aria-label="Previous workflow stage" class="case-button" id="case-prev" type="button">← Previous</button><span aria-live="polite" id="case-step-number" role="status">Step 1 / 6</span><button class="case-button" id="case-next" type="button">Next step →</button><button aria-pressed="false" class="case-button" id="case-play" type="button">Play sequence ▷</button></div>
<svg aria-label="Animated diagram of the Grande Marche data analytics process" id="campaign-flow" role="img" viewBox="0 0 800 270"></svg>
<div class="case-stage-copy"><span class="tiny-label" id="case-date">SPRING 2016</span><h3 id="case-title">Aggregate data</h3><p id="case-body">Existing information was brought together to plan the research exercise.</p><p class="case-ref-note" id="case-reference">Source: Le Parisien</p></div></div>
<div class="case-evidence"><div><strong>~5,000</strong><span>Volunteers reported by Carnegie Endowment for the Grande Marche</span></div><div><strong>~25,000</strong><span>Substantive interviews / completed questionnaire records reported by external accounts</span></div><div><strong>~1.5m</strong><span>Words reportedly processed by Proxem's semantic-analysis system</span></div></div>
<p class="data-pipeline-note">These are reported approximate figures from different accounts—not independent measurements of the AI model's accuracy or its electoral impact.</p>
</div></section>
<section class="case-section"><div class="container"><div class="case-heading"><span class="tiny-label">03 / AN EXAMPLE OF SEMANTIC ANALYSIS</span><h2>The same subject, <em>a different context.</em></h2><p>One illustration described by Proxem's founder concerns how respondents discussed nuclear energy. Try the two contexts to see the qualitative pattern he reported.</p></div>
<div class="context-demo"><span class="tiny-label">REPORTED CORPUS OBSERVATION · NOT AN AI MODEL RUNNING ON THIS SITE</span><div class="case-controls" role="group" aria-label="Choose context for reported nuclear energy example"><button class="case-button is-active" id="context-economy" type="button" aria-pressed="true">Nuclear energy + economy</button><button class="case-button" id="context-environment" type="button" aria-pressed="false">Nuclear energy + environment</button></div>
<div class="context-demo-output" aria-live="polite"><strong id="context-heading">More positive association reported</strong><p id="context-description">According to the Proxem founder's account, mentioning nuclear energy in an economic context tended to be associated with more favorable responses.</p></div>
<p class="small-note">This is a qualitative summary of the vendor's reported finding, not an estimated sentiment score, population-wide statistic, or suggested campaign message. Source: <a href="https://www.lemondeinformatique.fr/actualites/lire-presidentielle-2017%EF%BF%BD-l-utilisation-des-data-au-coeur-de-la-campagne-68002.html" rel="noopener" target="_blank">Le Monde Informatique (2017)</a>.</p>
</div>
<div class="case-balance"><div><h3>What the tools plausibly enabled</h3><p>Geographical planning could coordinate volunteer fieldwork. Structured questionnaires and text processing could make many comments easier to review, search, and summarize. These are the documented operational roles of the systems.</p></div><div><h3>What we cannot infer</h3><p>These reports do not show that the campaign's analytics were necessary or sufficient for Macron's election, or establish a measurable change in votes caused by AI. The sampling method and representativeness of collected feedback also matter.</p></div></div>
</div></section>
<section class="case-section case-alt"><div class="container"><div class="case-heading"><span class="tiny-label">04 / SOURCES & ORIGINAL WORK</span><h2>Examine the <em>evidence.</em></h2><p>This retrospective supplements the earlier collaborative ESCP paper. It does not retroactively attribute all the findings here to that original research.</p></div>
<div class="case-sources"><a href="https://www.leparisien.fr/politique/dans-les-coulisses-de-la-grande-marche-de-macron-21-05-2016-5816587.php" target="_blank" rel="noopener">Le Parisien · field-planning software ↗</a><a href="https://www.lemonde.fr/les-decodeurs/article/2016/10/07/emmanuel-macron-la-grande-marche-et-ses-chiffres-flous_5009682_4355770.html" target="_blank" rel="noopener">Le Monde · numbers and methodology ↗</a><a href="https://www.lemondeinformatique.fr/actualites/lire-presidentielle-2017%EF%BF%BD-l-utilisation-des-data-au-coeur-de-la-campagne-68002.html" target="_blank" rel="noopener">Le Monde Informatique · Proxem semantic analysis ↗</a><a href="https://carnegieendowment.org/research/2018/04/en-marche-from-a-movement-to-a-government?lang=en" target="_blank" rel="noopener">Carnegie · campaign retrospective ↗</a><a href="https://lesenjeux.univ-grenoble-alpes.fr/2018/dossier/03-une-economie-de-la-promesse-mythes-et-croyances-pour-vendre-du-big-data-electoral/" target="_blank" rel="noopener">Université Grenoble Alpes · academic critique ↗</a><a href="big-data.html">The original ESCP research and revised paper ↗</a></div>
</div></section>'''

HAWKES=r'''<section class="case-hero"><div class="container"><a class="back-link" href="index.html">← Earlier research</a><p class="tiny-label">STOCHASTIC PROCESSES / AN INTERACTIVE INTRODUCTION</p><h1>When an event <em>silences another.</em></h1><p class="case-deck">A Hawkes process models the timing of events whose occurrence changes the probability of future events. Positive interactions excite activity; negative interactions inhibit it.</p><p class="source-distinction">This is an <strong>illustrative two-event-type model</strong>, not a fit to the empirical market data of the original 2024 CentraleSupélec team report.</p></div></section>
<section class="case-section"><div class="container"><div class="case-heading"><span class="tiny-label">01 / BUILD THE INTENSITY</span><h2>The mathematics <em>behind the plot.</em></h2><p>An event intensity is the conditional expected rate of new events per unit time, given all past events. For an inhibitory Hawkes model it must stay nonnegative.</p></div><div class="math-display">\[\lambda_i(t)=\left[\mu_i+\sum_{j=1}^d\sum_{t_{jk}<t}\alpha_{ij}e^{-\beta_{ij}(t-t_{jk})}\right]_+,\qquad[x]_+=\max(x,0).\]</div><p>Here \(\mu_i>0\) is baseline intensity, \(\alpha_{ij}\) is the effect of an event of type \(j\) on type \(i\), and \(\beta_{ij}>0\) is its decay rate. Negative \(\alpha_{ij}\) models inhibition. The event times in this explorer are fixed, deliberately synthetic times; the graph is not a simulated market price.</p><div class="hawkes-board"><div class="lab-toolbar"><div class="lab-control"><label for="hawkes-alpha">Inhibitory coupling \(\alpha_{12}\): <output id="hawkes-alpha-out">−0.80</output></label><input id="hawkes-alpha" type="range" min="-1.8" max="0" step="0.05" value="-0.8"/></div><div class="lab-control"><label for="hawkes-beta">Decay \(\beta\): <output id="hawkes-beta-out">1.00</output></label><input id="hawkes-beta" type="range" min="0.25" max="3.0" step="0.05" value="1"/></div></div><svg id="hawkes-plot" viewBox="0 0 800 315" role="img" aria-label="Illustrative Hawkes conditional intensity after positive and inhibitory events"></svg><div class="lab-legend"><span><b></b> Conditional intensity</span><span><b class="orange"></b> Type 1: excitation</span><span><b class="dash"></b> Type 2: inhibition</span></div></div><div class="case-questions"><div><span class="tiny-label">02 / LEARNING THE PARAMETERS</span><h2>From events <em>to likelihood.</em></h2></div><div><p>Observed event times can be used to fit the parameters by maximizing the point-process log likelihood, which balances the intensity at observed events against the integrated intensity over the whole observation window:</p><div class="math-display">\[\ell(\theta)=\sum_{i=1}^d\left(\sum_{k:t_{ik}\le T}\log\lambda_i(t_{ik})-\int_0^T\lambda_i(t)\,\mathrm dt\right).\]</div><p>The original group research investigated parameter estimation, validation, and the identifiability of decay coefficients. Rapidly decaying interactions can be difficult to estimate when data are sparse or the likelihood surface is flat.</p></div></div><div class="case-sources"><a href="hawkes.html">Download revised research synopsis and LaTeX ↗</a></div></div></section>'''

STEPS=[
 ('APRIL 2016','A new movement','Emmanuel Macron launches En Marche. The subsequent “Grande Marche” is planned as a national listening exercise.','Carnegie; Le Temps'),
 ('MAY–SUMMER 2016','Target field locations','A campaign consultancy uses aggregate historical electoral and sociodemographic data to help organize neighborhood outreach.','Le Parisien, 21 May 2016'),
 ('SUMMER 2016','Listen at the door','Thousands of volunteers conduct conversations and collect completed questionnaires. The figures for discussions and forms should not be confused.','Le Monde, 7 October 2016; Carnegie'),
 ('AUTUMN 2016','Analyze the responses','Interview text is processed with semantic analysis; the campaign presents a diagnosis of reported concerns.','Le Monde, 7 October 2016; Carnegie'),
 ('2017 CAMPAIGN','Mobilize and communicate','Campaign teams combine volunteers, online engagement and field organizing. Analytical tools are only one part of a wider political effort.','University of Grenoble academic analysis'),
 ('APRIL–MAY 2017','Votes, not a causal proof','Macron receives 24.01% of valid votes in the first round and 66.10% in the second. Those results alone cannot attribute his election to data analytics.','French Ministry of the Interior'),
]


def fragment(markup):
    return BeautifulSoup(markup, 'html.parser')


def enhance(root:Path):
    # Convert every schematic formula into properly delimitated display-mode TeX.
    formulas={
     'magic-gate-bounds':r'\lvert\psi_s\rangle=\frac{(-1+3i,\,-7-i,\,-1+i,\,-1+(4+s)i)^\top}{\sqrt{s^2+8s+79}}',
     'entanglement-revivals':r'\tau_W(k)=\frac{\partial\delta(k)}{\partial\omega(k)}',
     'sds-qes-backreaction':r'q_1=-\left[\nabla^2 S_0(q_0)\right]^{-1}\nabla S_1(q_0)',
     'nonmarkovian-neural-dynamics':r'\delta J\approx\int_0^T z(t)^\top r(t)\,\mathrm dt'
    }
    for page in root.rglob('*.html'):
        soup=BeautifulSoup(page.read_text(encoding='utf-8'), 'html.parser')
        # Add a single site-wide rendering library to every page.
        if not soup.find('script',src=lambda x:x and 'tex-chtml' in x):
            setup=soup.new_tag('script');setup.string=r'window.MathJax={tex:{inlineMath:[["\\(","\\)"]],displayMath:[["\\[","\\]"]]},options:{skipHtmlTags:["script","noscript","style","textarea","pre","code"]}};'
            soup.head.append(setup)
            script=soup.new_tag('script',src='https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js');script['async']='';soup.head.append(script)
        if not soup.find('link',href=lambda x:x and x.endswith('editorial.css')):
            pref='../' if page.parent!=root else ''
            css=soup.new_tag('link',rel='stylesheet',href=pref+'assets/editorial.css');soup.head.append(css)
        if page.name=='lab.html':
            for block in soup.select('.lab-math'):
                text=block.get_text(' ',strip=True)
                # Replace cramped hand-typed formula cards by curated symbolic TeX content.
                key=block.find_previous('section',id=True)
                anchor=key.get('id') if key else ''
                replacements={
                    'magic':r'\[R(\psi)=\sum_{P\in\mathcal P_2}\langle P\rangle_\psi^4,\qquad M_2=-\log_2(R/4).\]\[N(s)=s^2+8s+79,\quad R_2(s)=\frac{P_\star(s)}{16N(s)^4},\quad R_1(s)=\frac{P_1(s)}{N(s)^4}.\]\[\Delta M_2(s)=\log_2\frac{R_1(s)}{R_2(s)}.\]',
                    'revival':r'\[t_\star\in[t_{\mathrm{Airy}}-r,\;t_{\mathrm{Airy}}+r],\qquad (r_1,r_2)\approx(0.0042463,\;0.0105652).\]',
                    'sds':r'\[f(r)=1-\frac{2GM}{r}-\frac{\Lambda r^2}{3},\quad f(r_{b,c})=0.\]\[S_{b,c}=\frac{\pi r_{b,c}^2}{G},\quad S_{\mathrm{proxy}}=S_b(M)+S_c(M)-S_b(M_0)-S_c(M_0).\]',
                    'neural':r'\[\operatorname{RMSE}=\sqrt{\frac1n\sum_{k=1}^n\bigl(\hat y_k-y_k\bigr)^2}.\]'
                }
                if anchor in replacements:
                    block.clear();block.append(replacements[anchor]);block['class']=['math-display']
            # Make each module connect clearly to explanatory article.
            for anchor,slug in [('magic','magic-gate-bounds'),('revival','entanglement-revivals'),('sds','sds-qes-backreaction'),('neural','nonmarkovian-neural-dynamics')]:
                section=soup.find('section',id=anchor)
                if section:
                    lead=fragment(f'<p class="lab-learn-link">New to this topic? <a href="{slug}.html">Read the guided explanation before using the chart →</a></p>')
                    section.find(class_='lab-section-head').insert_after(lead)
        elif page.parent.name=='research' and page.name not in ('index.html','lab.html'):
            slug=page.stem
            shell=soup.select_one('.equation-shell > div')
            if shell and slug in formulas: shell.clear();shell.append(r'\['+formulas[slug]+r'\]');shell['class']=['math-display']
            article=soup.select_one('article.article-main')
            if article and slug in MATH:
                tutorial=soup.new_tag('section');tutorial['class']='teaching-module';tutorial['aria-label']='Guided scientific introduction'
                tutorial.append(fragment(f'<div class="teaching-head"><span class="tiny-label">START HERE / AN EXPLANATION</span><h2>From first principles <em>to the research question.</em></h2></div>'+MATH[slug]))
                lead=article.select_one('.lead-paragraph');lead.insert_after(tutorial)
        if page.name=='index.html' and page.parent==root:
            # Preserve ongoing research first; historical research immediately follows.
            arch=soup.select_one('section.archive-teaser');current=soup.select_one('section.section:has(.projects-grid)')
            if arch and current:
                arch.extract();current.insert_after(arch)
                h=arch.select_one('.section-heading .eyebrow span');
                if h: h.string='02 / EARLIER RESEARCH'
                current_h=current.select_one('.section-heading .eyebrow span')
                if current_h:current_h.string='01 / CURRENT RESEARCH'
                cards=arch.select('.archive-card .more')
                if cards:
                    cards[0].string='Explore Hawkes interactions →';cards[1].string='Explore election case study →'
                interp=fragment('''<div class="container archive-highlights"><a href="archive/hawkes-explorer.html"><span>INTERACTIVE MATHEMATICS</span><strong>Inhibition in market event streams</strong><small>Vary event responses and kernel decay ↗</small></a><a href="archive/campaign.html"><span>ANIMATED HISTORICAL CASE STUDY</span><strong>Macron, En Marche &amp; political data in 2017</strong><small>Step through data collection and language AI ↗</small></a></div>''')
                arch.append(interp)
                desc=arch.select_one('.section-heading')
                if desc:desc.append(fragment('<p>Earlier collaborative research is featured alongside current work: explore the mechanisms, inspect original figures, and download revised LaTeX research notes.</p>'))
        if page.name=='index.html' and page.parent.name=='archive':
            container=soup.select_one('.archive-list')
            if container:
                container.insert(0,fragment('''<div class="archive-explorer-links"><a href="hawkes-explorer.html"><span>01 · STOCHASTIC PROCESSES</span><strong>See inhibition emerge</strong><small>Interactive signed Hawkes intensity →</small></a><a href="campaign.html"><span>02 · DATA &amp; DEMOCRACY</span><strong>Follow the 2016–17 election data story</strong><small>Animated fieldwork and language-analysis workflow →</small></a></div>'''))
        if page.name in ('hawkes.html','big-data.html') and page.parent.name=='archive':
            anchor=soup.select_one('.archive-detail-grid')
            if anchor:
                dest='hawkes-explorer.html' if page.stem=='hawkes' else 'campaign.html'
                label='Explore the inhibitory process' if page.stem=='hawkes' else 'Explore En Marche’s data and AI workflow'
                anchor.insert_before(fragment(f'<div class="container heritage-callout"><div><span class="tiny-label">ANIMATION / EARLIER RESEARCH</span><h2>{label}.</h2><p>A guided, interactive explanation linked to the original team research.</p></div><a class="btn btn-primary" href="{dest}">Explore the case ↗</a></div>'))
        page.write_text(str(soup),encoding='utf-8')
    for path,markup,title,description in [
      ('archive/campaign.html',CAMPAIGN,'Data and democracy: the 2016 Grande Marche','Historical field research, aggregate analytics and semantic AI during the 2016 Grande Marche.'),
      ('archive/hawkes-explorer.html',HAWKES,'An interactive introduction to inhibitory Hawkes processes','Understand self-excitation, inhibition and exponential decay through a mathematical explorer.')
    ]:
        rootpage=BeautifulSoup((root/'archive/index.html').read_text(), 'html.parser')
        rootpage.title.string=title+' — Hugo Wei'
        meta=rootpage.find('meta',attrs={'name':'description'});
        if meta:meta['content']=description
        main=rootpage.find('main',id='main');main.clear();main.append(fragment(markup))
        rootpage.head.append(fragment('<script src="../assets/editorial.js" defer></script>'))
        (root/path).write_text(str(rootpage),encoding='utf-8')

if __name__=='__main__':enhance(Path(__file__).resolve().parent)
