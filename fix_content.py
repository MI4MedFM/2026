import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Remove the MICCAI meta section
text = re.sub(r'<section class="section miccai-section" id="miccai">.*?</section>\n\n    <section class="section" id="pillars">', 
              r'<section class="section" id="pillars">', text, flags=re.DOTALL)

# 2. Update Pillars
text = text.replace('<h2>Four core pillars explain what attendees will actually get</h2>', '<h2>Four core pillars of MI4MedFM</h2>')
text = text.replace('<p>\n            The workshop is presented through a small number of concrete pillars so visitors quickly understand the scientific value without reading the full proposal.\n          </p>',
                    '<p>\n            Our scientific agenda is structured around four interlocking goals that translate mechanistic interpretability into robust clinical practice.\n          </p>')

# 3. Update Topics
text = text.replace('<h2>Representative directions in scope</h2>', '<h2>Topics of Interest</h2>')
text = text.replace('<p>\n            The content is trimmed to the main themes visitors need to understand quickly, while still reflecting the workshop’s technical depth.\n          </p>',
                    '<p>\n            We welcome submissions across a wide range of themes bridging foundation model interpretability with safety and deployment.\n          </p>')

# 4. Update Program
text = text.replace('<h2>A compact half-day workshop with clear flow</h2>', '<h2>Workshop Program</h2>')
text = text.replace('<p>\n            The structure is designed to feel energetic and discussion-driven: keynote depth, paper exposure, poster interaction, and focused closing synthesis.\n          </p>',
                    '<p>\n            The half-day schedule features an invited keynote, oral presentations, dynamic poster sessions, and community discussions.\n          </p>')

# 5. Update Speakers
text = text.replace('<h2>Invited speaker</h2>', '<h2>Keynote Speaker</h2>')
text = text.replace('<p>A centered single-speaker layout keeps the section balanced and visually clean.</p>',
                    '<p>We are honored to feature leading experts in trustworthy and transparent clinical AI.</p>')
text = text.replace('The speaker section is kept concise and visually weighted toward credibility, expertise, and fit with the workshop’s focus on robustness, fairness, uncertainty, and clinical reliability.',
                    'His pioneering research bridges deep learning robustness with ethical clinical translation, establishing critical benchmarks for fairness and certainty in medical deployments.')

# 6. Update Organizers
text = text.replace('<h2>Faculty and researcher team with strong UAE presence</h2>', '<h2>Organizing Committee</h2>')
text = text.replace('<p>\n            The organizer presentation is simplified for the website: a strong faculty base plus early-career researchers, with local MICCAI relevance clearly visible.\n          </p>',
                    '<p>\n            Our international committee unites expertise in medical image analysis, foundation models, and trustworthy artificial intelligence.\n          </p>')

# 7. Update Submission
text = text.replace('<h2>Clear, concise submission and review overview</h2>', '<h2>Call for Papers</h2>')
text = text.replace('<p>\n            The website keeps only the details visitors need quickly: contribution types, review standards, and what accepted authors can expect.\n          </p>',
                    '<p>\n            We invite submissions across two tracks. All accepted papers will be presented, with top-tier submissions selected for oral presentation.\n          </p>')

# 8. Remove the CTA ready to publish section
text = re.sub(r'<section class="section cta-section">.*?</section>\n  </main>', '</main>', text, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Increase sizes of teaser scene elements
css = css.replace('.teaser-scene {\n  display: grid;\n  grid-template-columns: auto minmax(70px, 1fr) auto minmax(70px, 1fr) auto;\n  align-items: center;\n  gap: 0.9rem;\n  padding: 2rem 0.3rem 1.8rem;\n}',
""".teaser-scene {
  display: grid;
  grid-template-columns: auto minmax(80px, 1fr) auto minmax(80px, 1fr) auto;
  align-items: center;
  gap: 1.5rem;
  padding: 3.5rem 0.8rem 3rem;
}""")

css = css.replace('.node {\n  width: 112px;\n  min-height: 112px;', '.node {\n  width: 136px;\n  min-height: 136px;')
css = css.replace('.node {\n  width: 136px;\n  min-height: 136px;\n  border-radius: 24px;\n  background: rgba(255, 255, 255, 0.96);\n  border: 1px solid rgba(15, 23, 42, 0.08);\n  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.06);\n  display: grid;\n  place-items: center;\n  padding: 1rem;\n  text-align: center;\n  font-size: 0.84rem;\n',
                  '.node {\n  width: 136px;\n  min-height: 136px;\n  border-radius: 24px;\n  background: rgba(255, 255, 255, 0.96);\n  border: 1px solid rgba(15, 23, 42, 0.08);\n  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.06);\n  display: grid;\n  place-items: center;\n  padding: 1.25rem;\n  text-align: center;\n  font-size: 0.96rem;\n')

css = css.replace('.node-icon {\n  width: 34px;\n  height: 34px;', '.node-icon {\n  width: 44px;\n  height: 44px;')

css = css.replace('.model-shell {\n  width: 150px;\n  min-height: 176px;\n  padding: 1.2rem 1rem;', '.model-shell {\n  width: 195px;\n  min-height: 228px;\n  padding: 1.6rem 1.25rem;')

css = css.replace('.model-head {\n  text-align: center;\n  color: #fff;\n  font-size: 0.96rem;\n', '.model-head {\n  text-align: center;\n  color: #fff;\n  font-size: 1.15rem;\n')

css = css.replace('.lens {\n  position: absolute;\n  right: -0.8rem;\n  top: -0.6rem;\n  width: 78px;\n  height: 78px;\n}', '.lens {\n  position: absolute;\n  right: -1.2rem;\n  top: -1.2rem;\n  width: 100px;\n  height: 100px;\n}')

css = css.replace('.lens-ring {\n  width: 52px;\n  height: 52px;', '.lens-ring {\n  width: 70px;\n  height: 70px;')

css = css.replace('.lens-handle {\n  position: absolute;\n  width: 26px;\n  height: 7px;', '.lens-handle {\n  position: absolute;\n  width: 36px;\n  height: 9px;')

css = css.replace('.model-layer {\n  height: 10px;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.18);\n  margin: 0.5rem 0;', '.model-layer {\n  height: 13px;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.18);\n  margin: 0.8rem 0;')

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

