# THIRD PARTY API QURAN FETCH 'app/utils/quran_api.py'
import requests # a popular Python library used to make HTTP requests installed using `pip install requests` allowing you to user requests.get() to fetch data from URLs

def fetch_verse_text(surah:int, verse:int):
    """
    Fetch Arabic and English (Saheeh International) verse text from Al-Quran Cloud API.

    Returns a tuple: (arabic_text, english_text)
    """

    url = f"https://api.alquran.cloud/v1/ayah/{surah}:{verse}/editions/quran-uthmani,en.sahih"

    # grab that surah and verse number from our url and store it in our response variable 
    response = requests.get(url)
    # if we do not get back a 200 success then throw an error 
    if response.status_code != 200: 
        return { "error": "Could not find verse"}, 404 
    
    # otherwise store the response in json format in a data variable
    data = response.json() 

    # the response has a 'data' array with two items: Arabic first, then English
    arabic_text = None
    english_text = None

    for edition in data['data']:
        if edition['edition']['identifier'] == 'quran-uthmani':
            arabic_text = edition['text']
        elif edition['edition']['identifier'] == 'en.sahih':
            english_text = edition['text']
    
    return arabic_text, english_text