from .db import db

likes = db.Table( "likes",
    db.Column("user_id", db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column("riff_id", db.Integer, db.ForeignKey('riffs.id'), primary_key=True),
    )