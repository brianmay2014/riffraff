from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class RiffForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    link = StringField('link', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    note = StringField('note')