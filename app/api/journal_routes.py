from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Gallery, Journal, User
from app.forms import CreateJournalForm
from app.utils.quran_api import fetch_verse_text

journal_routes = Blueprint("journal_routes", __name__)

# 1. GET only private journals for a current user (for a myPrivateJournals page)
@journal_routes.route('/private', methods=['GET']) # because this can only be retrieved once a journal entry exists, it will be in our journals.py file with prefix (api/journals/private)
@login_required                         # must be logged in and authorized 
def get_private_journals():   # we create a function called 'get_private_journals' that does not take in an id as an argument because we want to fetch all ids that are set to private 
    # so in order to fetch those private entries we need to scan our database and pull each journalId out that has the is_private column boolean set to true
    private_journals = (
        Journal.query
        .filter_by(user_id=current_user.id, is_private=True)
        .order_by(Journal.created_at.desc()) # prefer to have the latest journal entries at the top of the page and the oldest ones at the bottom
        .all() # this variable will store the query that will "get all" journals that belong to the current user AND are private
    )
    
    # return the response objects of each journal that are private 
    return {
        "private_journals": [journal.to_dict() for journal in private_journals]
    }, 200  


# 3A. PUT  /api/journals/:journalId (for this, let's say I have a list of journals in a speical div set up and display likes commments icons to the side of the div can i have a lock icon that taps into the is_private column for a quick change in the backend when using a thunk?)
@journal_routes.route('/<int:journalId>', methods=['PUT'])
@login_required
def edit_journal(journalId):
    journal_edit = Journal.query.get(journalId)

    if not journal_edit: 
        return { "error": "This journal entry does not exist" }, 404
    
    if journal_edit.user_id != current_user.id: 
        return { "error": "Unauthorized" }, 403
    
    form = CreateJournalForm(obj=journal_edit)
    form['csrf_token'].data = request.cookies['csrf_token'] # IMPORTANT LINE OF CODE NEEDED EVERYTIME A FORM IS DECLARED

    if form.validate_on_submit():

        surah = form.data.get('surah')
        verse = form.data.get('verse')


        if surah and verse:
            try: 
                surah = int(surah)
                verse = int(verse)
                arabic_text, english_text = fetch_verse_text(surah, verse)
            except ValueError:
                return {"error": "Surah and verse fields must be integers."}, 400 

            arabic_text, english_text = fetch_verse_text(surah, verse) # we invoke our helper function which will take in the integers of surah and verse numbers 
            if arabic_text is None or english_text is None: # if either of those text fields return null still then we throw an error that the verse could not be extracted 
                return {"error": "Failed to fetch verse text"}, 500
        
        journal_edit.title = form.data['title']
        journal_edit.image = form.data['image']
        journal_edit.surah = surah
        journal_edit.verse = verse
        journal_edit.arabic_text = arabic_text
        journal_edit.english_text = english_text
        journal_edit.description = form.data['description']
        journal_edit.is_private = form.data['is_private']
        # no need for db.session.add(comment) because we are not creating a new record simply modifying an existing one
        db.session.commit()
        return journal_edit.to_dict(), 200
    return {'errors': form.errors}, 400 

# 3B. PATCH /api/journals/:journalId with { is_private: true/false } 
@journal_routes.route('/<int:journalId>', methods=['PATCH'])
@login_required
def toggle_journal_privacy(journalId): # we create a function by passing the journalId as an argument 
    journal = Journal.query.get(journalId) # we store that id in a variable to save it to use later 
    if not journal:                         # if that journal id does not exist we return our first obvious error 
        return ({"error": "Journal not found"}), 404
    
    # Only the owner can toggle privacy 
    if journal.user_id != current_user.id:  # now if the journal's user_id (our foreign key pointing to our users table) does not match the currently logged in user's id 
        return ({"error": "Unauthorized"}), 403     # return an unauthorized checkpoint meaning you can not make this change 
    
    data = request.get_json()                # we create a variable that stores the data into an object format of our journalId and all of it's components in key value pairs 
    if 'is_private' not in data:            # and if the key (aka column) is not discovered in our table 
        return ({ "error": "Missing 'is_private' field"}), 400  # we returrn another obvious error 
    
    is_private_value = data['is_private']      # if our is_private column exists, the entire object will be passed on to the data variable and we set another variable to store the [is_private value] by chaining it to data so it can tap into the key and extract that value
    if not isinstance(is_private_value, bool): # if the nature of the edit was not a boolean by some chance we would return a message 
        return ({ "error": "'is_private' must be a boolean"}), 400 # stating that it must be either trur or false (can't be a string, int, etc)
    
    journal.is_private = is_private_value       # if it is an instance of a boolean (either true or false) then we can continue to set our is_private column attached to that specific journalId to the is_private_value that has been altered in our frontend side
    db.session.commit() # whatever that change or selection was we commit that to the database (this is essentially the same logic for POST a journal and EDIT a journal minor difference being instead of going into one column we access and allow changes to all columns)

    return ({                                  # the successful response after ensuring all those checks have been made would be the object response body to look like this    
        "id": journal.id,                       # the journalId that was of interest and authorization 
        "is_private": journal.is_private        # the altered stored value in the is_private column
    }), 200                                    # with a success status (our thunk will play a role in dispatchign this without the hard refresh on the page)

# 4. DELETE a journal 
@journal_routes.route('/<int:journalId>', methods=['DELETE'])
@login_required
def delete_journal(journalId):

    journal_delete = Journal.query.get(journalId)

    # if the journal we wish to delete does not exist 
    if not journal_delete:
        return { "error": f"Journal with id {journalId} was not found" }, 404
    
    # if the logged in user is not authorized to delete this journal 
    if journal_delete.user_id != current_user.id: 
        return { "error": "Unauthorized" }, 403
    
    # otherwise continue with deletion
    db.session.delete(journal_delete)
    db.session.commit()
    return { "message": "Your journal was successfully deleted" }, 200 