LinkedIn import helper
======================

This folder contains a small script to parse an exported LinkedIn profile HTML and
produce a JSON file with extracted sections (headline, about, experience, education,
certifications).

How to use
----------

1. Export your LinkedIn data (recommended):
   - Go to LinkedIn → Settings & Privacy → Data privacy → Get a copy of your data.
   - Choose "Profile" or request the full archive and download the HTML profile file.

2. Place the exported HTML file somewhere in the workspace, for example:

   /workspaces/CV/linkedin_profile.html

3. Install requirements and run the script:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r scripts/requirements.txt
python3 scripts/import_linkedin.py -i linkedin_profile.html -o linkedin_data.json
```

4. The script writes `linkedin_data.json` with the extracted fields. Review the output
   and let me know if you'd like me to automatically merge specific fields (e.g., add
   certifications into the `index.html` certificates section).

Notes
-----
- The LinkedIn HTML export format can vary; if the script misses fields, attach the
  exported HTML and I can adapt the parser quickly.
- If you'd rather authorize an app to read your LinkedIn profile, that's possible but
  requires creating a LinkedIn developer app and handling OAuth; the LinkedIn API also
  restricts access to some profile fields for most apps.
