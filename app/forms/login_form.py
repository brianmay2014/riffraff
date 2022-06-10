from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    # if there are no other errors (email field is present and an email), check if email exists
    if  not form.errors:
        user = User.query.filter(User.email == email).first()
        if not user:
            raise ValidationError('Email provided not found.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('The username or password you entered is incorrect.')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired("Email is a required field."), Email("Please enter a valid e-mail address."), user_exists])
    password = StringField('password', validators=[
                           DataRequired("Password is a required field."), password_matches])
