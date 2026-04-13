import re

with open('styles.css', 'r') as f:
    content = f.read()

# Update Font
content = content.replace(
    "--font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;",
    "--font-family-base: 'Inter', system-ui, -apple-system, sans-serif;"
)

# Update Colors to AgTech Palette
colors_to_replace = {
    "--color-primary-500: #4caf50; /* Forest Green */": "--color-primary-500: #10B981; /* Emerald */",
    "--color-primary-600: #43a047;": "--color-primary-600: #059669;",
    "--color-primary-700: #388e3c;": "--color-primary-700: #047857;",
    "--color-primary-800: #2e7d32;": "--color-primary-800: #065F46;",
    "--color-primary-900: #1b5e20;": "--color-primary-900: #064E3B;",
    "--color-neutral-800: #212529;": "--color-neutral-800: #1E293B; /* Deep Slate */",
    "--color-neutral-900: #0a1a0a; /* Near Black */": "--color-neutral-900: #0F172A; /* Deep Navy/Slate */",
    "--color-background-dark: var(--color-neutral-900);": "--color-background-dark: #0B1121;",
    "--color-secondary-500: #00bcd4; /* Tech Blue */": "--color-secondary-500: #0EA5E9; /* Modern Tech Blue */",
    "--color-link: var(--color-primary-600);": "--color-link: var(--color-primary-500);",
    "--color-link-hover: var(--color-primary-800);": "--color-link-hover: var(--color-primary-600);"
}

for old, new in colors_to_replace.items():
    content = content.replace(old, new)

# Update Component styles (Cards, Buttons)
card_styles_old = """  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: transform var(--transition-base), box-shadow var(--transition-base);"""

card_styles_new = """  background: var(--color-background);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast);"""

content = content.replace(card_styles_old, card_styles_new)

card_hover_old = """  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);"""

card_hover_new = """  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: rgba(16, 185, 129, 0.2);"""

content = content.replace(card_hover_old, card_hover_new)

btn_primary_old = """  background: var(--color-primary-500);
  color: var(--color-text-on-primary);"""

btn_primary_new = """  background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-600) 100%);
  color: var(--color-text-on-primary);
  box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3), 0 2px 4px -1px rgba(16, 185, 129, 0.1);"""

content = content.replace(btn_primary_old, btn_primary_new)

btn_primary_hover_old = """  background: var(--color-primary-600);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);"""

btn_primary_hover_new = """  background: linear-gradient(135deg, var(--color-primary-400) 0%, var(--color-primary-500) 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 8px -1px rgba(16, 185, 129, 0.4), 0 4px 6px -1px rgba(16, 185, 129, 0.2);"""

content = content.replace(btn_primary_hover_old, btn_primary_hover_new)

header_old = """  background: rgba(255, 255, 255, 0.95);"""
header_new = """  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0,0,0,0.05);"""
content = content.replace(header_old, header_new)

with open('styles.css', 'w') as f:
    f.write(content)
