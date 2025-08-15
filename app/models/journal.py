from .db import db, environment, SCHEMA, add_prefix_for_prod
from .timestamp_mixin import TimeStampMixin

class Journal(db.Model, TimeStampMixin):
    __tablename__ = 'journals'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(250), nullable=False)
    surah = db.Column(db.Integer, nullable=False) # selection required (whole point of the "reflection" part)
    verse = db.Column(db.Integer, nullable=False) # selection required (whole point of the "reflection" part)
    arabic_text = db.Column(db.String, nullable=False) # when user selects a chapter and verse number from third party API, the Arabic text will be stored in this column
    english_text = db.Column(db.String, nullable=False) # when user selects a chapter and verse number from third party API, the English text will be stored in this column
    description = db.Column(db.String(), nullable=False) # no limit to characters and must be filled 
    is_private = db.Column(db.Boolean(), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))) # not sure if this is a column built in or as a relationship (imaginary column)
    gallery_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("galleries.id")))

    # Relationships
    user = db.relationship("User", back_populates = "journals") # do we need a delete on cascade here? no because deleting a journal should not delete user on cascade 
    gallery = db.relationship("Gallery", back_populates="journals") # many journal belong to one gallery 

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'image': self.image,
            'surah': self.surah,
            'verse': self.verse,
            'arabic_text': self.arabic_text,
            'english_text': self.english_text,
            'description': self.description
        }