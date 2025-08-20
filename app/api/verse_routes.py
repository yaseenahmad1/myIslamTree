from flask import Blueprint, request, jsonify 
from app.utils.quran_api import fetch_verse_text

verse_routes = Blueprint("verse_routes", __name__)

@verse_routes.route("", methods=['GET']) # we create an API route for fetching our verse 
def get_verse(): 
    surah = request.args.get("surah", type=int)
    verse = request.args.get("verse", type=int)

    if not surah or not verse:
        return { "error": "Surah and verse numbers are required" }, 400
    
    arabic_text, english_text = fetch_verse_text(surah, verse)
    if not arabic_text or not english_text:
        return { "error": "Verse not found" }, 404
    
    return jsonify({
        "surah": surah,
        "verse": verse, 
        "arabic_text": arabic_text,
        "english_text": english_text
    })