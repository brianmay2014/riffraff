from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class CommentForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    riff_id = IntegerField('riff_id', validators=[DataRequired()])
    text = StringField('text', validators=[DataRequired()])