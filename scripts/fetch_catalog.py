"""
Script to fetch and save course catalogs for multiple semesters and departments.

This script:
1. Loads the department mapping from `src/data/departments.json`.
2. Iterates over the last 5 calendar years (including the current year).
3. Iterates over semester codes:
   - '0': Annual
   - '1': Autumn (first semester)
   - '2': Spring (second semester) (NOT SCRAPPED ON THIS SCRIPT, BUT CAN BE POSSIBLE TO ADD)
   - '3': Summer (NOT SCRAPPED ON THIS SCRIPT, BUT CAN BE POSSIBLE TO ADD)
4. Uses UCampusScraper to scrape course data for each (year + semester) and department.
5. Saves the results as JSON files in `src/data/catalog/` named `{YEAR}{SEM}_catalog.json`.
"""

import json
import os
from datetime import date

from ucampus_scraper import UCampusScraper

# --- CONFIGURATION ---
BASE_DIR           = os.path.dirname(__file__)
DATA_DIR           = os.path.join(BASE_DIR, '..', 'src', 'data')
DEPARTMENTS_PATH   = os.path.join(DATA_DIR, 'departments.json')
CATALOG_DIR        = os.path.join(DATA_DIR, 'catalog')

# Last 5 calendar years (including current year)
current_year = date.today().year
YEARS        = list(range(current_year - 4, current_year + 1))  # e.g. [2020, 2021, 2022, 2023, 2024]

# Semester codes:
#   '0' = Annual (NOT SCRAPPED ON THIS SCRIPT, BUT CAN BE POSSIBLE TO ADD)
#   '1' = Autumn (first semester)
#   '2' = Spring (second semester)
#   '3' = Summer (NOT SCRAPPED ON THIS SCRIPT, BUT CAN BE POSSIBLE TO ADD)
SEMESTER_CODES = ['1', '2']

def load_departments() -> dict:
    """
    Load the department mapping from JSON.

    Returns:
        A dict: { dept_code (str): dept_name (str) }.
    """
    with open(DEPARTMENTS_PATH, encoding='utf-8') as f:
        return json.load(f)

def ensure_directories():
    """
    Ensure that the output directory for catalog JSON files exists.
    """
    os.makedirs(CATALOG_DIR, exist_ok=True)

def run_scraping():
    """
    Execute the scraping pipeline for each semester and department,
    then save the results to JSON files.
    """
    ensure_directories()
    departments = load_departments()
    scraper     = UCampusScraper(cookies=None, headers=None)

    for year in YEARS:
        for sem in SEMESTER_CODES:
            semester = f"{year}{sem}"
            output   = {}

            print(f"→ Scraping semester {semester}...")

            for dept_code, dept_name in departments.items():
                # Scrape the catalog for this semester and department
                catalog = scraper.scrape(semester=semester, dept=dept_code, force='0')
                output[dept_code] = {
                    "department": dept_name,
                    "courses":    catalog
                }

            # Save to JSON
            out_path = os.path.join(CATALOG_DIR, f"{semester}_catalog.json")
            with open(out_path, 'w', encoding='utf-8') as f:
                json.dump(output, f, ensure_ascii=False, indent=2)

            print(f"  ✔ Saved: {out_path}\n")

if __name__ == "__main__":
    run_scraping()
