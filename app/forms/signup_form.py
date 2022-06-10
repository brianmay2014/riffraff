from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def username_length(form, field):
    # Checking if username is already in use
    username = field.data
    if len(username) < 4 or len(username) > 16:
        raise ValidationError('Username must be between 4 and 16 characters.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired("Username is a required field."), username_exists, username_length])
    email = StringField('email', validators=[DataRequired("Email is a required field."), Email("Please enter a valid e-mail address."), user_exists])
    password = StringField('password', validators=[DataRequired("Password is a required field.")])
