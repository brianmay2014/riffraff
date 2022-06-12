from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def text_length(form, field):
    # Checking if username is already in use
    text = field.data
    if len(text) > 255:
        raise ValidationError('Comment needs to be less than 255 characters.')

class CommentForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    riff_id = IntegerField('riff_id', validators=[DataRequired()])
    text = StringField('text', validators=[DataRequired("Comment is a required field."), text_length])