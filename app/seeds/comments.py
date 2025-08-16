from app.models import db, Comment, User, Gallery, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    comments = [
        Comment(user_id=1, gallery_id=1, comment_body="Amazing gallery! Really enjoyed this."),
        Comment(user_id=2, gallery_id=1, comment_body="Beautiful images!"),
        Comment(user_id=3, gallery_id=2, comment_body="This is very inspiring."),
        Comment(user_id=4, gallery_id=2, comment_body="Love the composition!"),
        Comment(user_id=2, gallery_id=3, comment_body="Fascinating details."),
        Comment(user_id=5, gallery_id=3, comment_body="Wonderful work!"),
        Comment(user_id=1, gallery_id=4, comment_body="Such a unique perspective."),
        Comment(user_id=3, gallery_id=4, comment_body="Truly beautiful."),
        Comment(user_id=4, gallery_id=5, comment_body="This speaks to me."),
        Comment(user_id=5, gallery_id=5, comment_body="Incredible colors and textures."),
    ]

    for comment in comments:
        db.session.add(comment)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
    db.session.commit()
