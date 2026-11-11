import json
import os
import urllib.request
import subprocess

os.makedirs('public/images/events', exist_ok=True)

with open('public/assets/aistudio/dataset_abc_2026-11-11_19-34-39-319_4596e66a.json') as f:
    posts = json.load(f)

# Map target filename to shortcode & image index preference
targets = {
    'badge_ceremony_grand.jpg': ('DA-6BKZTU1d', 0),
    'badge_ceremony_2026.jpg': ('Dd6uFAqn7S2', 0),
    'abhyas_aptitude.jpg': ('DdTdx2lnw7y', 0),
    'abhyas_machine_test.jpg': ('Dd_YCmFH2-P', 0),
    'abhyas_communication.jpg': ('DeZST7Wj0GG', 0),
    'research_paper_lecture.jpg': ('DeHPhFSH02P', 0),
    'hcl_celebration.jpg': ('DeZNiX1v9PE', 0),
    'ingenuity_techtrek.jpg': ('DAxeGQDzjS2', 0),
    'ingenuity_roborumble.jpg': ('DAxSxxLTrTT', 0),
    'ingenuity_ai_architect.jpg': ('DAxU_ZSTdbu', 0),
    'ingenuity_innovatex.jpg': ('DAxcWZWzzC6', 0),
    'ingenuity_sports.jpg': ('DAxbMDHzvQG', 0),
    'ingenuity_cultural.jpg': ('DAxaCXATbdF', 0),
    'ingenuity_dance.jpg': ('DAxafwhz6rz', 0),
    'diwali_dandiya_gala.jpg': ('DfM_UB-sPCb', 0),
    'codeathon_hackverse.jpg': ('C14pnvqvgBO', 0)
}

posts_by_code = {p.get('shortCode'): p for p in posts}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for filename, (code, idx) in targets.items():
    post = posts_by_code.get(code)
    if not post:
        print(f"Post {code} not found")
        continue
    
    url = None
    child_posts = post.get('childPosts') or []
    images = post.get('images') or []
    
    if child_posts and len(child_posts) > idx:
        url = child_posts[idx].get('displayUrl')
    elif images and len(images) > idx:
        url = images[idx]
    
    if not url:
        url = post.get('displayUrl')

    if not url:
        print(f"No URL for {code} -> {filename}")
        continue
    
    dest_path = os.path.join('public/images/events', filename)
    temp_path = os.path.join('public/images/events', 'temp_' + filename)
    print(f"Downloading {code} -> {filename} ...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            content = resp.read()
            with open(temp_path, 'wb') as out_f:
                out_f.write(content)
        # Convert/resize with imagemagick to standard clean jpg
        cmd = f"convert '{temp_path}' -auto-orient -resize '1000x1000>' -quality 88 '{dest_path}' && rm -f '{temp_path}'"
        subprocess.run(cmd, shell=True, check=True)
        print(f"Successfully processed {dest_path}")
    except Exception as e:
        print(f"Error downloading {filename}: {e}")
        if os.path.exists(temp_path):
            os.rename(temp_path, dest_path)

print("All event downloads complete!")
