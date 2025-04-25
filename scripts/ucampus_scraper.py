import requests
from bs4 import BeautifulSoup

class UCampusScraper:
    """
    Scraper for the UCampus course catalog (FCFM).
    Extracts for each course its code, name, and unique list of instructors.
    """

    def __init__(self, cookies: dict = None, headers: dict = None):
        # Base URL for the UCampus catalog endpoint
        self.base_url = 'https://ucampus.uchile.cl/m/fcfm_catalogo/'
        self.cookies = cookies or {}
        self.headers = headers or {}

    def fetch_page(self, semester: str, dept: str, force: str = '0') -> str:
        """
        Downloads the HTML page for the specified semester and department.
        """
        params = {
            'semestre': semester,
            'depto':   dept,
            'force':   force,
        }
        response = requests.get(
            self.base_url,
            params=params,
            cookies=self.cookies,
            headers=self.headers
        )
        response.raise_for_status()
        return response.text

    def parse(self, html: str) -> dict:
        """
        Parses the HTML and returns a dictionary with each course's information:
        {
          'CC1002': {
            'name': 'Introduction to Programming',
            'professors': ['Juan Álvarez R.', 'Valentin Muñoz Apablaza', ...]
          },
          ...
        }
        """
        soup = BeautifulSoup(html, 'html.parser')
        courses = {}

        # Iterate over each course container
        for course_block in soup.select('div.ramo'):
            # Extract course code and name
            metadata = course_block.find('div', class_='objeto')
            code = metadata.find('h2').get_text(strip=True)
            name = metadata.find('h1').get_text(strip=True)

            # Collect unique instructor names
            instructors = set()
            for ul in course_block.select('ul.profes'):
                for li in ul.find_all('li'):
                    header = li.find('h1')
                    if header:
                        instructors.add(header.get_text(strip=True))

            courses[code] = {
                'name': name,
                'professors': sorted(instructors)
            }

        return courses

    def scrape(self, semester: str, dept: str, force: str = '0') -> dict:
        """
        Full scraping process: downloads the page and parses its content.
        """
        html = self.fetch_page(semester, dept, force)
        return self.parse(html)

