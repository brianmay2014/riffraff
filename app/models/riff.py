from ..models.db import db, auto_str
from datetime import datetime

@auto_str
class Riff(db.Model):
    __tablename__ = 'riffs'

    id = db.Column(db.Integer, primary_key=True)
    link = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    note = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # relationships
    #belongs to one
    user = db.relationship("User", back_populates="riffs", lazy='joined')
    
    # has many
    comments = db.relationship("Comment", back_populates='riff', cascade='all, delete-orphan', lazy='joined')
    # likes = 

    # many to many
    # tags = 


    def to_dict(self):
        return {
            'id': self.id,
            'link': self.link,
            'title': self.title,
            'user_id': self.user_id,
            'note': self.note,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'comment_ids': [comment.id for comment in self.comments],
            'author_username': self.user.username,
            'author_img': self.user.pic_url,
            # 'comments': self.comments,
        }

    @staticmethod
    def seed(riff_data):
        riff = Riff()
        riff.link = riff_data.get("link")
        riff.title = riff_data.get("title")
        riff.user_id = riff_data.get("user_id")
        riff.note = riff_data.get("note")
        riff.created_at = riff_data.get("created_at")
        riff.updated_at = riff_data.get("updated_at")
        
        return riff
