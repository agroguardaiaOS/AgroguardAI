import re
import os

html_files = ['agromind.html', 'agrorobotics.html', 'intelligence.html', 'api.html', 'pricing.html', 'contact.html', 'privacy.html', 'terms.html']

for html_file in html_files:
    if not os.path.exists(html_file):
        continue

    with open(html_file, 'r') as f:
        content = f.read()

    # 1. Update Header Logo
    header_logo_old = """<a href="index.html" class="header__logo">
        <span class="header__logo-icon">AG</span>
        AgroGuardAI
      </a>"""

    header_logo_old_alternative = """<a href="index.html" class="header__logo">
            <span class="header__logo-icon">AG</span>
            AgroGuardAI
          </a>"""

    header_logo_new = """<a href="index.html" class="header__logo" style="display:flex; align-items:center; gap:var(--space-2);">
        <img src="mylogo.png" alt="AgroGuardAI Logo" style="height: 32px; width: auto;" />
        <span>AgroGuardAI</span>
      </a>"""

    content = content.replace(header_logo_old, header_logo_new)
    content = content.replace(header_logo_old_alternative, header_logo_new)

    # 2. Update Footer Logo
    footer_logo_old = """<a href="index.html" class="header__logo" style="color:var(--color-text-on-dark);margin-bottom:var(--space-2);display:inline-flex;">
            <span class="header__logo-icon">AG</span>
            AgroGuardAI
          </a>"""

    footer_logo_old_alternative = """<a href="index.html" class="header__logo" style="color:white;margin-bottom:var(--space-sm);display:inline-flex;">
            <span class="header__logo-icon">AG</span>
            AgroGuardAI
          </a>"""

    footer_logo_new = """<a href="index.html" class="header__logo" style="color:var(--color-text-on-dark);margin-bottom:var(--space-2);display:inline-flex; align-items:center; gap:var(--space-2);">
            <img src="mylogo.png" alt="AgroGuardAI Logo" style="height: 32px; width: auto; filter: brightness(0) invert(1);" />
            <span>AgroGuardAI</span>
          </a>"""

    content = content.replace(footer_logo_old, footer_logo_new)
    content = content.replace(footer_logo_old_alternative, footer_logo_new)

    with open(html_file, 'w') as f:
        f.write(content)

print("Updated HTML files.")
