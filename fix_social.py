import os

target_dir = r"c:\Users\lassa\Desktop\opensyntax\opensyntax-academy"

files_to_update = [
    "CHANGELOG.md",
    "CONTRIBUTING.md",
    "README.md",
    "app/bugs/page.tsx",
    "app/changelog/page.tsx",
    "app/contributing/page.tsx",
    "app/privacy/page.tsx",
    "app/status/page.tsx",
    "app/terms/page.tsx",
    "components/SEO/JsonLd.tsx",
    "components/community-cta.tsx",
    "components/courses-catalog.tsx",
    "components/footer.tsx",
    "components/hero.tsx",
    "components/navbar.tsx",
    "components/prompts.tsx",
    "components/interactive-terminal.tsx"
]

replacements = [
    ("https://discord.gg/66GA8MNPeB", "https://www.instagram.com/http.sejed.official/"),
    ("discord.gg/66GA8MNPeB", "@http.sejed.official"),
    ("Community Discord", "Community Instagram"),
    ("Discord community server", "Instagram page"),
    ("Discord Server", "Instagram Profile"),
    ("Discord server", "Instagram profile"),
    ("Join the Discord", "Follow on Instagram"),
    ("Join our Discord server", "Follow our Instagram profile"),
    ("Discord popup", "Instagram popup"),
    ("Discord Popup", "Instagram Popup"),
    ("Wanna discord this?", "Connect on Instagram?"),
    ("Request on Discord", "Request on Instagram"),
    ("hover:border-discord hover:text-discord", "hover:border-pink-500 hover:text-pink-500"),
    ("Discord community", "Instagram community"),
    ("Discord Community", "Instagram Community")
]

for rel_path in files_to_update:
    path = os.path.join(target_dir, rel_path)
    if not os.path.exists(path):
        print(f"File not found: {path}")
        continue
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
        
    original = content
    for old, new in replacements:
        content = content.replace(old, new)
        
    # In case there's lingering specific discord community text
    if rel_path == "README.md":
        content = content.replace("logo=discord", "logo=instagram")
        content = content.replace("badge/Discord", "badge/Instagram")
        content = content.replace("5865F2", "E4405F") # discord color -> instagram pink
        
    if rel_path == "components/prompts.tsx":
        content = content.replace("type PromptType = \"discord\"", "type PromptType = \"instagram\"")
        content = content.replace("id: \"discord\"", "id: \"instagram\"")
        content = content.replace("pick: PromptType = \"discord\"", "pick: PromptType = \"instagram\"")
        content = content.replace("pick = \"discord\"", "pick = \"instagram\"")
        content = content.replace("let pick: PromptType = \"instagram\"", "let pick: PromptType = \"instagram\"")

    if rel_path == "app/privacy/page.tsx":
        content = content.replace("Discord's", "Instagram's")
        content = content.replace("discord.com/privacy", "privacycenter.instagram.com/policy/")
        content = content.replace("contact us via Discord", "contact us via Instagram")

    if rel_path == "app/terms/page.tsx":
        content = content.replace("Discord's Terms of Service", "Instagram's Terms of Service")
        
    if content != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {rel_path}")
    else:
        print(f"No changes in {rel_path}")
