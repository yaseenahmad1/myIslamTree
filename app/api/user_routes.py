from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Follow

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# ----------------------------
# POST route: current user follows another user
# /api/users/<userId>/follow
# ----------------------------

@user_routes.route('/<int:user_id>/follow', methods=['POST'])
@login_required
def follow_user(user_id):
    if current_user.id == user_id:
        return jsonify({"message": "You cannot follow yourself"}), 400

    existing_follow = Follow.query.filter_by(
        follower_id=current_user.id, following_id=user_id
    ).first()

    if existing_follow:
        return jsonify({"message": "You are already following this user"}), 400

    new_follow = Follow(follower_id=current_user.id, following_id=user_id)
    db.session.add(new_follow)
    db.session.commit()

    return jsonify({
        "message": "You are now following this user!",
        "follower_id": current_user.id,
        "following_id": user_id
    }), 201


# ----------------------------
# DELETE route: current user unfollows another user
# /api/users/<userId>/unfollow
# ----------------------------

@user_routes.route('/<int:user_id>/unfollow', methods=['DELETE'])
@login_required
def unfollow_user(user_id):
    follow = Follow.query.filter_by(
        follower_id=current_user.id, following_id=user_id
    ).first()

    if not follow:
        return jsonify({"message": "You are not following this user"}), 404

    db.session.delete(follow)
    db.session.commit()

    return jsonify({
        "message": "Successfully unfollowed this user",
        "follower_id": current_user.id,
        "following_id": user_id
    }), 200


# ----------------------------
# GET route: list of users current user is following
# /api/users/<userId>/following
# ----------------------------

@user_routes.route('/<int:user_id>/following', methods=['GET'])
@login_required
def get_following(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    following = (
        db.session.query(User)
        .join(Follow, User.id == Follow.following_id)
        .filter(Follow.follower_id == user_id)
        .all()
    )

    return jsonify([
        {"id": u.id, "username": u.username} for u in following
    ]), 200


# ----------------------------
# GET route: list of users who follow current user
# /api/users/<userId>/followers
# ----------------------------

@user_routes.route('/<int:user_id>/followers', methods=['GET'])
@login_required
def get_followers(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    followers = (
        db.session.query(User)
        .join(Follow, User.id == Follow.follower_id)
        .filter(Follow.following_id == user_id)
        .all()
    )

    return jsonify([
        {"id": u.id, "username": u.username} for u in followers
    ]), 200