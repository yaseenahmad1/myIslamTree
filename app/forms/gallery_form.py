from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Journal 

class CreateGalleryForm(FlaskForm):
    title = StringField('What is the theme of this gallery?', validators=[DataRequired(message="You must provide a title for your gallery.")])
    image = TextAreaField('Add an image that best represents your journal entry!', validators=[DataRequired(message="Please provide an image URL.")])
    surah = IntegerField('Surah Number')
    verse = IntegerField('Verse Number')
    description = TextAreaField('My reflections...', validators=[DataRequired(message="Your gallery description cannot be empty.")])