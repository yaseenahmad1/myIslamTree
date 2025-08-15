from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .follow import Follow
from .like import Like
from .comment import Comment
from .journal import Journal
from .gallery import Gallery


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    # Relationships
    likes = db.relationship("Like", back_populates="user", cascade="all, delete-orphan") # likes on journals belongs to a user 
    following = db.relationship("Follow", foreign_keys=[Follow.follower_id], back_populates="follower_user", cascade="all, delete-orphan")
    followers = db.relationship("Follow", foreign_keys=[Follow.following_id], back_populates="following_user", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates="user", cascade="all, delete-orphan") # comments on journals belongs to a user 
    journals = db.relationship("Journal", back_populates="user", cascade="all, delete-orphan") # a user can have many journals 
    galleries = db.relationship("Gallery", back_populates="user", cascade="all, delete-orphan") # a user can have many galleries 

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'followers_count': len(self.followers),
            'following_count': len(self.following)
        }
