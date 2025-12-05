#!/usr/bin/env python3
"""
Simple importer for LinkedIn exported profile HTML.

Usage:
  python3 scripts/import_linkedin.py --input path/to/linkedin_profile.html --output linkedin_data.json

This script attempts to extract common sections: headline, about (summary), experience,
education, and licenses & certifications. It's designed to work against the HTML file you
download from LinkedIn (Settings → Get a copy of your data → Profile / Complete archive).

Notes:
- LinkedIn export formats change over time; this script uses heuristic selectors and may
  need tweaks for your exact HTML structure. If you prefer an API-based import, see
  the README in this folder.
"""
import argparse
import json
from pathlib import Path

from bs4 import BeautifulSoup


def text_of(el):
    return " ".join(el.stripped_strings)


def extract_sections(soup):
    data = {}

    # Try to get profile name and headline
    name = soup.find(lambda t: t.name in ("h1", "h2") and t.get_text(strip=True))
    if name:
        data["name"] = name.get_text(strip=True)

    # Heuristic: look for About / Summary
    about = None
    for h in soup.find_all(["h2", "h3", "h4"]):
        txt = h.get_text(strip=True).lower()
        if "about" in txt or "summary" in txt or "about" == txt:
            # the content may be in the next sibling
            sib = h.find_next_sibling()
            if sib:
                about = text_of(sib)
                break
    if about:
        data["about"] = about

    # Generic section extractor by heading keywords
    sections = {
        "experience": ["experience", "work experience", "professional experience"],
        "education": ["education"],
        "certifications": ["licenses & certifications", "licenses and certifications", "certifications"]
    }

    for key, keywords in sections.items():
        found = []
        for h in soup.find_all(["h2", "h3", "h4"]):
            txt = h.get_text(strip=True).lower()
            if any(k in txt for k in keywords):
                # gather following items until next heading of same level
                node = h.next_sibling
                # accumulate text nodes or list items
                while node and getattr(node, "name", None) not in ("h2", "h3", "h4"):
                    if hasattr(node, "get_text"):
                        # split by lines to get entries
                        block = node.get_text(separator="\n").strip()
                        if block:
                            # split blocks into lines and try to chunk into entries
                            for line in [l.strip() for l in block.split("\n") if l.strip()]:
                                found.append(line)
                    node = node.next_sibling
                break
        if found:
            data[key] = found

    # As a fallback, try to collect any links that look like certificates or pdfs
    certs = []
    for a in soup.find_all("a", href=True):
        href = a["href"]
        txt = a.get_text(strip=True)
        if any(ext in href.lower() for ext in ("certificate", "cert", ".pdf", ".jpg", ".png")) or "cert" in txt.lower():
            certs.append({"text": txt, "href": href})
    if certs and "certifications" not in data:
        data["certifications"] = certs

    return data


def main():
    p = argparse.ArgumentParser(description="Import LinkedIn profile HTML into JSON")
    p.add_argument("--input", "-i", required=True, help="Path to exported LinkedIn profile HTML")
    p.add_argument("--output", "-o", default="linkedin_data.json", help="Output JSON file")
    args = p.parse_args()

    path = Path(args.input)
    if not path.exists():
        print(f"Input file not found: {path}")
        raise SystemExit(1)

    html = path.read_text(encoding="utf-8", errors="ignore")
    soup = BeautifulSoup(html, "lxml")

    data = extract_sections(soup)

    out = Path(args.output)
    out.write_text(json.dumps(data, indent=2, ensure_ascii=False))
    print(f"Wrote {out} with keys: {', '.join(data.keys())}")


if __name__ == "__main__":
    main()
