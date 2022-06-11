from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def title_length(form, field):
    # Checking if username is already in use
    title = field.data
    if len(title) > 100:
        raise ValidationError('The riff title needs to be less than 100 characters.')

def note_length(form, field):
    # Checking if username is already in use
    note = field.data
    if len(note) > 255:
        raise ValidationError('The riff note needs to be less than 255 characters.')

class RiffForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    link = StringField('link', validators=[DataRequired("Link is a required field.")])
    title = StringField('title', validators=[DataRequired("Title is a required field"), title_length])
    note = StringField('note', validators=[note_length])