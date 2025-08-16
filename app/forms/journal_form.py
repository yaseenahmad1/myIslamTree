from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Journal 

class CreateJournalForm(FlaskForm):
    title = StringField('What is the title of this journal entry?', validators=[DataRequired(message="You must provide a title for your journal.")])
    image = TextAreaField('Add an image that best represents your journal entry!', validators=[DataRequired(message="Please provide an image URL.")])
    surah = IntegerField('Please select a Surah', validators=[DataRequired(message="A Surah number is required")])
    verse = IntegerField('Please select the verse you would like to reflect on!', validators=[DataRequired("A verse number is required")])
    description = TextAreaField('Write your thoughts here...', validators=[DataRequired(message="Your journal entry cannot be empty.")])
    is_private = BooleanField() # defaults to public if not selected 