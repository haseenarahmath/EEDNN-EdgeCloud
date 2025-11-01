from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired


class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Remember Me')
    submit = SubmitField('Sign In')


class DnnForm(FlaskForm):
    dataset = StringField('Dataset')  # , validators=[DataRequired()])
    model = StringField('Model')  # TextAreaField('About me', validators=[Length(min=0, max=140)])
    chart_type = StringField('chart_type')
    threshold = StringField('Threshold')  # , validators=[DataRequired()])
    branches = StringField('Branches')  # TextAreaField('About me', validators=[Length(min=0, max=140)])

    submit = SubmitField('Submit')


class ImageRecForm(FlaskForm):
    threshold = StringField('Threshold')  # , validators=[DataRequired()])
    branches = StringField('Branches')  # TextAreaField('About me', validators=[Length(min=0, max=140)])
    submit = SubmitField('Submit')


class PartitionForm(FlaskForm):
    latency = StringField('Latency')  # , validators=[DataRequired()])
    alg_type = StringField('alg_type')  # TextAreaField('About me', validators=[Length(min=0, max=140)])
    submit = SubmitField('Submit')


class DnnTrainingForm(FlaskForm):
    dataset = StringField('Dataset')  # , validators=[DataRequired()])
    model = StringField('Model')  # TextAreaField('About me', validators=[Length(min=0, max=140)])
    training_type = StringField('Training_type')
    branches = StringField('Branches')
    epochs=StringField('Epochs')
    chart_type = StringField('chart_type')
    submit = SubmitField('Submit')