import requests
import re
import json
import os
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from typing import Dict, List, Any, Optional, Tuple


class CareerScraper:
    """Class responsible for scraping a single career program's curriculum."""
    
    def __init__(self, url: str, start_semester: int = 1):
        """Initialize with the URL to scrape.
        
        Args:
            url: The URL of the career program page
            start_semester: The semester to start collecting from (default: 1)
        """
        self.url = url
        self.slug = self._extract_slug_from_url()
        self.start_semester = start_semester
    
    def _extract_slug_from_url(self) -> str:
        """Extract the career identifier (slug) from the URL."""
        slug = urlparse(self.url).path.rstrip('/').split('/')[-1]
        
        # Special case for geofisicoa -> geofisica
        if slug == "geofisicoa":
            return "geofisica"
            
        return slug
    
    def _roman_to_int(self, roman: str) -> int:
        """Convert Roman numeral to integer."""
        values = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
        result = 0
        prev = 0
        
        for char in reversed(roman.upper()):
            if char not in values:
                return 0
            current = values[char]
            if current < prev:
                result -= current
            else:
                result += current
            prev = current
                
        return result
    
    def scrape(self) -> Dict[str, List[Dict[str, str]]]:
        """Scrape the career curriculum from the URL.
        
        Returns:
            A dictionary mapping semester names to lists of courses
        """
        resp = requests.get(self.url)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, 'html.parser')

        semestres = {}
        current = None

        for tr in soup.select('tr'):
            clases = tr.get('class') or []
            cells = tr.find_all(['td', 'th'])

            # Header row: detect 'celda-encabezado1' and at least 2 cells
            if 'celda-encabezado1' in clases and len(cells) >= 2:
                sem_tag = cells[1].find('strong') or cells[1].find('p')
                texto = sem_tag.get_text(strip=True) if sem_tag else cells[1].get_text(strip=True)
                m = re.search(r'SEMESTRE\s+([IVX]+)', texto, re.IGNORECASE)
                if m:
                    romano = m.group(1)
                    semester_num = self._roman_to_int(romano)
                    
                    # Skip semesters before start_semester
                    if semester_num < self.start_semester:
                        current = None
                        continue
                        
                    key = f"Semestre {romano}"
                    semestres[key] = []
                    current = key

            # Data row: if there's an active semester, save the courses
            elif current:
                tds = tr.find_all('td')
                if len(tds) >= 2:
                    code = tds[0].get_text(strip=True)
                    title = tds[1].get_text(strip=True)
                    semestres[current].append({
                        'code': code,
                        'title': title
                    })

        return semestres


class ScraperManager:
    """Class to manage the scraping of multiple career programs."""
    
    URLS = [
        "https://ingenieria.uchile.cl/carreras/4980/astronomia",
        "https://ingenieria.uchile.cl/carreras/8450/fisica",
        "https://ingenieria.uchile.cl/carreras/4982/geofisicoa",
        "https://ingenieria.uchile.cl/carreras/4979/geologia",
        "https://ingenieria.uchile.cl/carreras/4970/ingenieria-civil-en-biotecnologia",
        "https://ingenieria.uchile.cl/carreras/4971/ingenieria-civil-en-computacion",
        "https://ingenieria.uchile.cl/carreras/4972/ingenieria-civil-electrica",
        "https://ingenieria.uchile.cl/carreras/4973/ingenieria-civil-industrial",
        "https://ingenieria.uchile.cl/carreras/4974/ingenieria-civil-matematica",
        "https://ingenieria.uchile.cl/carreras/4976/ingenieria-civil-mecanica",
        "https://ingenieria.uchile.cl/carreras/4977/ingenieria-civil-de-minas",
        "https://ingenieria.uchile.cl/carreras/4978/ingenieria-civil-quimica",
    ]
    
    def __init__(self, output_file: str = 'src/data/careers/career_programs.json'):
        """Initialize the manager.
        
        Args:
            output_file: Path to the JSON file where results will be saved
        """
        self.output_file = output_file
        self.results: Dict[str, Any] = {}
        self.plan_comun: Dict[str, List[Dict[str, str]]] = {}
    
    def _scrape_plan_comun(self) -> None:
        """Scrape the first 4 semesters (Plan Común) from the first URL."""
        if not self.URLS:
            return
            
        print("→ scraping Plan Común")
        scraper = CareerScraper(self.URLS[0], start_semester=1)
        self.plan_comun = scraper.scrape()
        
        # Keep only first 4 semesters
        keys_to_keep = [f"Semestre {num}" for num in ['I', 'II', 'III', 'IV']]
        self.plan_comun = {k: self.plan_comun[k] for k in keys_to_keep if k in self.plan_comun}
        
        # Add Plan Común to results
        self.results["plan_comun"] = self.plan_comun
    
    def run(self) -> None:
        """Run the scraping process for all careers."""
        # First, scrape the Plan Común
        self._scrape_plan_comun()
        
        # Then scrape each career, starting from semester 5
        for url in self.URLS:
            scraper = CareerScraper(url, start_semester=5)
            slug = scraper.slug
            print(f"→ scraping {slug} (specific courses)")
            career_curriculum = scraper.scrape()
            
            if career_curriculum:  # Only add if there are specific semesters
                self.results[slug] = career_curriculum
        
        self._save_results()
    
    def _save_results(self) -> None:
        """Save the results to a JSON file."""
        # Ensure directory exists
        os.makedirs(os.path.dirname(self.output_file), exist_ok=True)
        
        with open(self.output_file, 'w', encoding='utf-8') as f:
            json.dump(self.results, f, ensure_ascii=False, indent=2)
        print(f"JSON generated: {self.output_file}")


def main():
    """Main entry point for the script."""
    manager = ScraperManager()
    manager.run()


if __name__ == '__main__':
    main()
