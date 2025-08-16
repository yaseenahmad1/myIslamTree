from app.models import db, Follow, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_follow():
    follows = [
        # Demo follows everyone else
        Follow(follower_id=1, following_id=2),
        Follow(follower_id=1, following_id=3),
        Follow(follower_id=1, following_id=4),
        Follow(follower_id=1, following_id=5),

        # Everyone follows Demo
        Follow(follower_id=2, following_id=1),
        Follow(follower_id=3, following_id=1),
        Follow(follower_id=4, following_id=1),
        Follow(follower_id=5, following_id=1)
    ]

    for follow in follows:
        db.session.add(follow)

    db.session.commit()

def undo_follow():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM follows"))

    db.session.commit()