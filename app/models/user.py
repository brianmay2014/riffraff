from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    pic_url = db.Column(db.String(255))
    bio = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # relationships
    # has many
    riffs = db.relationship("Riff", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")
    # likes = db.relationship("Like", back_populates="user")


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
            'pic_url': self.pic_url,
            'bio': self.bio
        }
    
    # @staticmethod
    # def seed(user_data):
    #     user = User()
    #     user.email = user_data.get("email")
    #     user.username = user_data.get("username")
    #     user.hashed_password = user_data.get("hashed_password")
    #     user.pic_url = user_data.get("pic_url")
    #     user.bio = user_data.get("bio")
    #     user.created_at = user_data.get("created_at")
    #     user.updated_at = user_data.get("updated_at")

    #     return user