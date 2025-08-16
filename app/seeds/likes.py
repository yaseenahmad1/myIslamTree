from app.models import db, Like, User, Gallery, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():
    likes = [
        Like(user_id=1, gallery_id=1),
        Like(user_id=2, gallery_id=1),
        Like(user_id=3, gallery_id=2),
        Like(user_id=4, gallery_id=2),
        Like(user_id=2, gallery_id=3),
        Like(user_id=5, gallery_id=3),
        Like(user_id=1, gallery_id=4),
        Like(user_id=3, gallery_id=4),
        Like(user_id=4, gallery_id=5),
        Like(user_id=5, gallery_id=5),
        Like(user_id=1, gallery_id=6),
        Like(user_id=2, gallery_id=6),
        Like(user_id=3, gallery_id=7),
        Like(user_id=4, gallery_id=7),
    ]

    for like in likes:
        db.session.add(like)
    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))
    db.session.commit()
