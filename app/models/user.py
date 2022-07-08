from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

followers = db.Table(
    'followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('followed_id', db.Integer, db.ForeignKey('users.id'))
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    pic_url = db.Column(db.String(255), default='https://riff-raff.s3.us-west-1.amazonaws.com/defaultuserimage.png')
    bio = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # relationships
    # has many
    riffs = db.relationship("Riff", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")
    # likes = db.relationship("Like", back_populates="user")

    #follow
    followed = db.relationship(
        "User",
        secondary=followers,
        primaryjoin=(followers.c.follower_id == id),
        secondaryjoin=(followers.c.followed_id == id),
        backref=db.backref('followers', lazy='dynamic'), lazy='dynamic'
        )


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


    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)
    
    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)

    def is_following(self, user):
        return self.followed.filter(followers.c.followed_id == user.id).count() > 0
        
    
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
