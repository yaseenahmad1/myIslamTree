from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
    __tablename__ = 'likes'#we can change the name if we need to

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    #ids
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    gallery_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("galleries.id")), nullable=False)

    # Relationships
    user = db.relationship("User", back_populates="likes") # a user can make many likes 
    gallery = db.relationship("Gallery", back_populates="likes") # a gallery can have many likes 

    def to_dict(self):
        return {
            "id": self.id,
            "gallery_id": self.gallery_id,
            "user": {
                "id": self.user_id,                 # when a post is liked I would like the id of the user 
                "username" : self.user.username     # as well as the username to appear along with the like 
            }

        }