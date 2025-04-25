from ucampus_scraper import UCampusScraper

def get_course_catalog(
    semester: str = "20242",
    dept: str     = "5",
    force: str    = "0",
    cookies: dict = None,
    headers: dict = None
) -> dict:
    """
    Returns the course catalog for a given semester and department,
    as a dict { course_code: { name, professors } }.
    """
    scraper = UCampusScraper(cookies=cookies, headers=headers)
    return scraper.scrape(semester, dept, force)

catalog = get_course_catalog(semester="20242", dept="5")
print(catalog["CC1002"]["professors"])
