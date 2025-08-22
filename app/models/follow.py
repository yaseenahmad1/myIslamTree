from .db import db, environment, SCHEMA, add_prefix_for_prod
from .timestamp_mixin import TimeStampMixin

class Follow(db.Model, TimeStampMixin):
    __tablename__ = "follows"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    following_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    # Relationships
    follower_user = db.relationship("User", foreign_keys=[follower_id], back_populates="following")
    following_user = db.relationship("User", foreign_keys=[following_id], back_populates="followers")

    def to_dict(self):
        return {
            "id": self.id,
            "follower_id": self.follower_id,
            "following_id": self.following_id,
            "follower_username": self.follower_user.username if self.follower_user else None,
            "following_username": self.following_user.username if self.following_user else None,
        }