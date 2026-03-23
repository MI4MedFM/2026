import re

with open('index.html', 'r') as f:
    html = f.read()

# 1. Remove the DEI section entirely
# It looks like: <section class="section muted-section" id="dei"> ... </section>
# And also the link in the nav bar: <a href="#dei">DEI</a>
html = re.sub(r'<a href="#dei">DEI</a>', '', html)

# The DEI section is between section community and FAQ. Let's do a reliable replace.
html = re.sub(r'<section class="section muted-section" id="dei">.*?</section>\n\n    <section class="section faq-section" id="faq">', r'<section class="section faq-section" id="faq">', html, flags=re.DOTALL)

# Let's ensure top-tier mechanistic interpretability language
# The current text is quite good but maybe we can make sure terms like Sparse Autoencoders (SAEs), Activation Patching, Circuit Discovery are prominent.
# They are already in the topics: "Sparse feature discovery", "Circuits and shortcut learning", "Faithfulness and clinical meaning"
# Let's refine the "Why MI4MedFM matters" slightly to be punchier.
html = html.replace('MI4MedFM focuses on <strong>mechanistic interpretability</strong>: principled analysis of internal model representations and computations that can explain behavior, reveal failure modes, and support targeted interventions.',
'MI4MedFM focuses on <strong>mechanistic interpretability</strong>—reverse-engineering the underlying algorithms learned by models. By emphasizing rigorous internal analysis via techniques like sparse autoencoders (SAEs), circuit discovery, and activation patching, we aim to transform black-box medical foundation models into robust, auditable clinical systems.')

html = html.replace('A practical roadmap for interpretability methods that are auditable, actionable, and clinically meaningful.',
'A robust roadmap advancing state-of-the-art mechanistic methods (SAEs, circuits, steering) tailored for high-stakes, multimodal clinical environments.')

with open('index.html', 'w') as f:
    f.write(html)
