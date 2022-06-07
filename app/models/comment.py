from ..models.db import db, auto_str
from datetime import datetime

@auto_str
class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    riff_id = db.Column(db.Integer, db.ForeignKey("riffs.id"), nullable=False)
    text = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # relationships
    #belongs to one
    user = db.relationship("User", back_populates="comments", lazy='joined')
    riff = db.relationship("Riff", back_populates="comments", lazy='joined')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'riff_id': self.riff_id,
            'text': self.text,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    @staticmethod
    def seed(comment_data):
        comment = Comment()
        comment.user_id = comment_data.get("user_id")
        comment.riff_id = comment_data.get("riff_id")
        comment.text = comment_data.get("text")
        comment.created_at = comment_data.get("created_at")
        comment.updated_at = comment_data.get("updated_at")
        
        return comment
