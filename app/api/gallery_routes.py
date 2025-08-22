from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Gallery, Journal, User, Like, Comment
from app.forms import CreateGalleryForm, CreateJournalForm, CreateCommentForm
from app.utils.quran_api import fetch_verse_text

gallery_routes = Blueprint("gallery_routes", __name__)

# 1A. GET a single gallery 
@gallery_routes.route("/<int:galleryId>", methods=['GET'])
@login_required
def get_single_gallery(galleryId):
    gallery = Gallery.query.get(galleryId)

    if not gallery:
        return {'message': "Gallery not found"}, 404

    return gallery.to_dict(), 200

# 1B. GET all galleries of the current user 
@gallery_routes.route('/', methods=['GET']) # full api route - /api/galleries/ 
@login_required
def get_galleries():

    galleries = Gallery.query.filter_by(user_id=current_user.id).all() # get all galleries of the current user by the current_user's id FK in gallery table 

    if not galleries: # if the current user does not have any galleries made yet 
        return { "message": "You have no galleries at the moment"}, 404

    return { "galleries": [gallery.to_dict() for gallery in galleries]}, 200 

# 2. GET all galleries of a user 
@gallery_routes.route('/user/<int:userId>', methods=['GET']) # full api route : '/api/galleries/user/<int:userId>'
@login_required
def get_user_galleries(userId): # we are going to pass in our userId from our api route into our function 

    # check to see if the user exists in the database
    user = User.query.get(userId)
    if not user:
        return { "error": "This user does not exist" }, 404

    galleries = Gallery.query.filter_by(user_id=userId).all() # we create a variable that will filter through our gallery table and getting all galleries owned by user

    if not galleries:
        return { "message": " User has no galleries" }, 404
    
    return { "galleries": [gallery.to_dict() for gallery in galleries] }, 200 # otherwise return successful response which is an array of gallery objects the user owns 


# 3. GET all public journals for a given gallery (their own journal entries)
@gallery_routes.route('/<int:galleryId>/journals', methods=['GET'])
@login_required
def get_gallery_journals(galleryId): 
    gallery = Gallery.query.get(galleryId)

    if not gallery:
        return ({ "error": "This gallery does not exist"}), 404

    # Check if the current user owns this gallery 
    if gallery.user_id == current_user.id:
        # then the owner will see all journals (private and public)
        journals = (Journal.query.filter_by(gallery_id=galleryId).order_by(Journal.created_at.asc()).all()) 
    
    else: # if not the current user then
        # other users can ONLY see public journals
        journals = (Journal.query.filter_by(gallery_id=galleryId, is_private=False).order_by(Journal.created_at.asc()).all())
    
    return { "journals": [journal.to_dict() for journal in journals] }, 200 # return the object of information that we set up in our models for each journal in the list of journals that is provided

# 4. POST a new gallery for a current_user
@gallery_routes.route('/', methods=['POST'])
@login_required
def create_gallery():
    # we create an instance of our CreatGalleryForm()
    form = CreateGalleryForm()
    form['csrf_token'].data = request.cookies['csrf_token'] # this ensures our form is a secured form to prevent cross site request forgery 

    if form.validate_on_submit():
        surah = form.data.get('surah')
        verse = form.data.get('verse')

        # default to None
        arabic_text, english_text = None, None


        # if surah and verse are provided, fetch verse text 
        if surah and verse:
            try: 
                surah = int(surah)
                verse = int(verse)
            except ValueError:
                return {"error": "Surah and verse fields must be integers."}, 400 

            arabic_text, english_text = fetch_verse_text(surah, verse) # we invoke our helper function which will take in the integers of surah and verse numbers 
            if arabic_text is None or english_text is None: # if either of those text fields return null still then we throw an error that the verse could not be extracted 
                return {"error": "Failed to fetch verse text"}, 500

        new_gallery = Gallery(
            title=form.data['title'],
            image=form.data['image'],
            surah=surah,
            verse=verse,
            arabic_text=arabic_text,
            english_text=english_text,
            description=form.data['description'],
            user_id=current_user.id
        )

        db.session.add(new_gallery)
        db.session.commit()
        return new_gallery.to_dict(), 201
    return form.errors, 400

# 5. EDIT a Gallery based on its galleryId 
@gallery_routes.route('/<int:galleryId>', methods=['PUT']) # /api/galleries/<:galleryId>
@login_required
def edit_gallery(galleryId): # we extract our galleryId from our API endpoint 

    gallery_edit = Gallery.query.get(galleryId) # we grab the information of the gallery we want to edit 

    if not gallery_edit:
        return { "error": "This gallery does not exist" }, 404

    # first I want to make sure that the owner of this gallery is the current_user 
    if gallery_edit.user_id != current_user.id: # so if our user_id for that gallery that is going to be edited does NOT equal the current_user's id 
        return { "error": "Unauthorized" }, 403 # cannot make this edit

    # otherwise continue with edit 
    form = CreateGalleryForm(obj=gallery_edit)
    form['csrf_token'].data = request.cookies['csrf_token'] # IMPORTANT LINE OF CODE NEEDED EVERYTIME A FORM IS DECLARED

    if form.validate_on_submit():

        surah = form.data.get('surah')
        verse = form.data.get('verse')

        if surah and verse:
            try: 
                surah = int(surah)
                verse = int(verse)
            except ValueError:
                return {"error": "Surah and verse fields must be integers."}, 400 

            arabic_text, english_text = fetch_verse_text(surah, verse) # we invoke our helper function which will take in the integers of surah and verse numbers 
            if arabic_text is None or english_text is None: # if either of those text fields return null still then we throw an error that the verse could not be extracted 
                return {"error": "Failed to fetch verse text"}, 500

        gallery_edit.title = form.data["title"]
        gallery_edit.image = form.data['image']
        gallery_edit.surah = surah
        gallery_edit.verse = verse
        gallery_edit.arabic_text = arabic_text
        gallery_edit.english_text = english_text
        gallery_edit.description = form.data['description']
        # no need for db.session.add(comment) because we are not creating a new record simply modifying an existing one
        db.session.commit()
        return gallery_edit.to_dict(), 200
    return {'errors': form.errors}, 400 


# 6. DELETE a Gallery and it's related journals 
@gallery_routes.route('/<int:galleryId>', methods=['DELETE'])
@login_required
def delete_gallery(galleryId): # we initiate a function that takes in the galleryId as an argument which it will act upon

    gallery_delete = Gallery.query.get(galleryId) # grab that id and store it in a variable 

    # if the gallery you want to delete does not exist 
    if not gallery_delete:
        return { "error": f"Gallery with the id {galleryId} was not found" }, 404

    # if the logged in user is not authorized to delete the gallery 
    if gallery_delete.user_id != current_user.id: 
        return { "error": "Unauthorized" }, 403
    
    # otherwise delete the gallery and all relevant journals (delete cascade effect)
    db.session.delete(gallery_delete)
    db.session.commit()
    return { "message": "Your gallery was successfully deleted" }, 200 

# -------------------------- POST A JOURNAL FOR A GALLERY -----------------------------#

# 2. POST a journal - this will be in our gallery.py file (/api/gallery/:galleryId/journal) because the create a gallery form will have a create a journal form within it 
@gallery_routes.route('/<int:galleryId>/journal', methods=['POST'])
@login_required
def create_journal(galleryId): # we will pass in the galleryId as an argument so that we can attach the newly created journal to its parent (aka gallery id)
    # First, we will run a check to see if the gallery exists and if the user is the owner of the gallery to create a journal entry 
    gallery = Gallery.query.get(galleryId)
    if not gallery:
        return { "error": "Gallery not found" }, 404
    if gallery.user_id != current_user.id:
        return { "error": "Unauthorized" }, 403 
    
    # next, we create an instance of our form 
    form = CreateJournalForm()
    form['csrf_token'].data = request.cookies['csrf_token'] # IMPORTANT LINE OF CODE NEEDED EVERYTIME A FORM IS DECLARED

    if form.validate_on_submit():
        surah = form.data.get('surah')
        verse = form.data.get('verse')

        # default to None
        arabic_text, english_text = None, None

        # if surah and verse are provided, fetch verse text 
        if surah and verse:
            try: 
                surah = int(surah)
                verse = int(verse)
            except ValueError:
                return {"error": "Surah and verse fields must be integers."}, 400 

            arabic_text, english_text = fetch_verse_text(surah, verse) # we invoke our helper function which will take in the integers of surah and verse numbers 
            if arabic_text is None or english_text is None: # if either of those text fields return null still then we throw an error that the verse could not be extracted 
                return {"error": "Failed to fetch verse text"}, 500

        new_journal = Journal(
            title=form.data['title'],
            image=form.data['image'],
            surah=surah,
            verse=verse,
            arabic_text=arabic_text,
            english_text=english_text,
            description=form.data['description'],
            user_id=current_user.id,
            gallery_id=galleryId, # link journal to its gallery 
            is_private=form.data.get('is_private')
        )

        db.session.add(new_journal)
        db.session.commit()
        return new_journal.to_dict(), 201
    return form.errors, 400

# -------------------------- GET ALL COMMENTS FOR A GALLERY -----------------------------#

# full endpoint : 'api/galleries/<int:galleryId>/journals/<int:journalId>/comments'
# no user auth to view all comments
@gallery_routes.route('/<int:galleryId>/comments', methods=["GET"]) 
def all_comments(galleryId): # we begin a function that will retrieve all comments attached to a gallery by its id 
    """
    View all comments on a gallery
    """
    gallery = Gallery.query.get(galleryId)
    if not gallery:
        return { "error": "Gallery or Journal not found"}, 404
    
    # otherwise take the journalId of that galleryId
    # here we use the SQLAlchemy's filter_by to get all comments by the journalId which should match a id in our post_id column in our comments table
    comments = Comment.query.filter_by(gallery_id=galleryId).order_by(Comment.created_at.desc()).all()

    # Since Flask does not know how to turn Python objects into JSON on its own
    # We use jsonify to convert the python into this universal readable object aka JSON response

    return {'comments': [comment.to_dict() for comment in comments]}, 200 
    # what this now does is it gives us a list (via to_dict) of comments under the key "comments": {{comment1}, {comment2}, {etc}}


# --------------------------- POST A COMMENT ---------------------------------------#

# full endpoint : 'api/galleries/<int:galleryId>/journals/<int:journalId>/comments'
# user must be logged in and authenticated to create a comment on a post
@gallery_routes.route('/<int:galleryId>/comments', methods=['POST']) # creating a url with the method POST to post a comment
@login_required # we require an authenticated user to create a comment
def create_comment(galleryId): # defining our function name which requires a galleryId to be passed in as an argument
    """
    Create a comment on a particular gallery
    """
    # first check to see if the gallery we want to comment on exists 
    gallery = Gallery.query.get(galleryId)
    if not gallery:
        return { "error": "Gallery not found"}, 404

    form = CreateCommentForm()  # we create an instance of CreateCommentForm which represents the data and validation requirements for comment submission

    # include csrf protection
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit(): # if the form is properly submitted and all validations pass then
        new_comment = Comment(  # add it as "new_comment" via a Comment object, filling in the required fields
            comment_body=form.data["comment_body"], # include comment body. [.strip] is a method that removes white spaces in a textbox field so nobody can just tap the spacebar a bunch of times 
            user_id=current_user.id, # associate the comment with the logged-in user
            gallery_id=galleryId,          # associate comment with the correct gallery
        )
        db.session.add(new_comment) # if the comment is valid then add it and commit it
        db.session.commit() # Commit this new comment to the SQLAlchemy database
        return new_comment.to_dict(), 201 # stays within the conditional gives output of new comment with username attached to it
    else:
        return {'errors': form.errors}, 400 # our errors object will output what we specified in our form fields
        # example:
        # {
        #   'comment_body': ["You gotta write a comment to leave a comment!"]
        # }

# -------------------------- GET ALL LIKES FOR A GALLERY -----------------------------#

@gallery_routes.route('/<int:galleryId>/likes', methods=['GET']) # /api/galleries/<int:galleryId>/likes
def get_likes(galleryId):
    likes = Like.query.filter_by(gallery_id=galleryId).join(User).all()
    return {'likes': [like.to_dict() for like in likes]}, 200 # give all information from our dictionary in each like for all likes 

# -------------------------- POST A LIKE FOR A GALLERY -----------------------------#
@gallery_routes.route('/<int:galleryId>/likes', methods=['POST'])
@login_required
def like_gallery(galleryId):
    existing_like = Like.query.filter_by(gallery_id=galleryId, user_id=current_user.id).first()
    #check if a user has liked the gallery yet

    if existing_like:
        # Already liked > remove the like
        db.session.delete(existing_like)
        db.session.commit()
        return {
            "liked": False,
            "gallery_id": galleryId,
            "user": {
                "id": current_user.id,
                "username": current_user.username
            }
        }

    
    #if a gallery hasn't been liked yet, then create the like
    new_like = Like(user_id=current_user.id, gallery_id=galleryId)
    db.session.add(new_like)
    db.session.commit()
    return {
        "liked": True,
        "gallery_id": galleryId, 
        "user": {
            "id": current_user.id,
            "username": current_user.username
        },
        "like_id": new_like.id
    }


# -------------------------- DELETE A LIKE FOR A GALLERY -----------------------------#
@gallery_routes.route('/<int:galleryId>/likes', methods=['DELETE'])
@login_required
def unlike_gallery(galleryId):
    like = Like.query.filter_by(gallery_id=galleryId, user_id=current_user.id).first()
    if not like:
        return {"error": "Like does not exist"}, 404
    db.session.delete(like)
    db.session.commit()
    return {"message": "Like removed"} , 200 