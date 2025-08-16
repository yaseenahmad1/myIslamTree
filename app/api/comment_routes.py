from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Gallery, Journal, User, Comment
from app.forms import CreateGalleryForm, CreateJournalForm, CreateCommentForm

comment_routes = Blueprint("comment_routes", __name__)

# ---------------------------- EDIT A COMMENT ------------------------------------------# 

# full endpoint : 'api/comments/<int:commentId>'
# user must be logged in and authenticated
@comment_routes.route('/<int:commentId>', methods=["PUT"])
@login_required # user must be logged in
def edit_comment(commentId): # we create a function which will allow us to edit an existing comment so we will need the postId and now the commentId because we need to know which comment is being edited on what post
# login_user(user)
# user must be owner of that comment to edit it

    comment = Comment.query.get(commentId) # we fetch the comment by its commentId (aka primary key(id))

    if not comment:
        return { 'message': 'Comment not found'}, 404 # in case a comment is deleted and is removed from database

    # Same Mah-Jong tile matching logic here: 

# if current user does not equal the user id in comment table, return an error
    if current_user.id != comment.user_id: # current user must be matching with the foreign key id associated with that comment 
# The current_user.id must match the user_id foreign key on the comment — meaning the user currently logged in must be the same user who originally wrote the comment.
        return {'message': 'Unauthorized'}, 403

# FORM VALIDATION
# we create an instance of the CreateCommentForm as an option to edit it
    form = CreateCommentForm(obj=comment) # pre-fills your form with the existing data when editing 

    # include csrf protection
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        comment.comment_body=form.data["comment_body"]
        # no need for db.session.add(comment) because we are not creating a new record simply modifying an existing one
        db.session.commit()
        return comment.to_dict(), 200
    else:
        return {'errors': form.errors}, 400 
    
# --------------------------- DELETE A COMMENT ---------------------------------------#

# now we have to delete a comment so we establish our route
# same as edit route essentially because we need a postid and commentid
# full API route with Blueprints is /api/comments/commentId
@comment_routes.route('/<int:commentId>', methods=['DELETE'])
@login_required # user must be logged in to perform this CRUD operation
def delete_comment(commentId): # pass in our integers from our endpoint into our delete_comment function to ensure a valid deletion

    comment = Comment.query.get(commentId) # again, we fetch that integer from our endpoint from our table

    # if that id number does not exist in our database or if the commentId is not associated with that postId then throw an error
    if not comment:
        return { 'message': 'Comment not found on this post'}, 404

    # if that comment does not belong to the current user then do not allow action 
    if comment.user_id != current_user.id and comment.gallery.user_id != current_user.id: 
        return { 'message': 'You are not authorized to delete this comment.'}
    
    db.session.delete(comment) # this is like our .destroy in Express with Javascript
    db.session.commit() # commit this action 

    return { 'message': 'Comment successfully deleted'}, 200 # return a 200 status code with a success response