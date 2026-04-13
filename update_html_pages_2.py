import re
import os

html_files = ['agromind.html', 'agrorobotics.html', 'intelligence.html', 'api.html', 'pricing.html', 'contact.html', 'privacy.html', 'terms.html']

for html_file in html_files:
    if not os.path.exists(html_file):
        continue

    with open(html_file, 'r') as f:
        content = f.read()

    # Need to update old logo paths as well (in case there are other variations)
    # E.g. <img src="mylogo.png" alt="AgroGuardAI Logo" class="header__logo-icon" style="height: 32px; width: auto;" />
    # Let's just make sure all logos point to mylogo.png with the correct sizing

    # Let's find any remaining instances of text-only logos and replace them
    # Check for <a href="index.html" class="header__logo">

    old_logo_pattern = r'<a href="index(?:\.html)?" class="header__logo"[^>]*>[\s]*<span class="header__logo-icon">AG</span>[\s]*AgroGuardAI[\s]*</a>'

    new_logo = """<a href="index.html" class="header__logo" style="display:flex; align-items:center; gap:var(--space-2);">
            <img src="mylogo.png" alt="AgroGuardAI Logo" style="height: 32px; width: auto;" />
            <span>AgroGuardAI</span>
          </a>"""

    content = re.sub(old_logo_pattern, new_logo, content)

    old_footer_pattern = r'<a href="index(?:\.html)?" class="header__logo"[^>]*>[\s]*<span class="header__logo-icon">AG</span>[\s]*AgroGuardAI[\s]*</a>'

    # We need to distinguish between header and footer.
    # The header is inside <header class="header">
    # The footer is inside <footer class="footer">

    with open(html_file, 'w') as f:
        f.write(content)

print("Updated HTML files again.")
