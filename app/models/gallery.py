from .db import db, environment, SCHEMA, add_prefix_for_prod
from .timestamp_mixin import TimeStampMixin

class Gallery(db.Model, TimeStampMixin):
    __tablename__ = 'galleries'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(250), nullable=False)
    surah = db.Column(db.Integer, nullable=True) # they don't need to use Surah number in the gallery form but will in the journal form 
    verse = db.Column(db.Integer, nullable=True) # they don't need to use Surah number in the gallery form but will in the journal form 
    arabic_text = db.Column(db.String, nullable=True) # if user selects a chapter and verse number from third party API, the Arabic text will be stored in this column
    english_text = db.Column(db.String, nullable=True) # if user selects a chapter and verse number from third party API, the English text will be stored in this column
    description = db.Column(db.String(), nullable=False) # no limit to characters and must be filled 
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))) # not sure if this is a column built in or as a relationship (imaginary column)

    # Relationships
    user = db.relationship("User", back_populates = "galleries") # a user can have many galleries 
    journals = db.relationship("Journal", back_populates="gallery", cascade="all, delete-orphan") # if a gallery is deleted it's associated journals are deleted on cascade
    comments = db.relationship("Comment", back_populates="gallery", cascade="all, delete-orphan") # a gallery can have many comments 
    likes = db.relationship("Like", back_populates="gallery", cascade="all, delete-orphan") # a gallery can have many likes

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
            'description': self.description,
            'num_of_comments': len(self.comments),  # dynamically count comments
            'num_of_likes': len(self.likes),        # dynamically count likes
        }