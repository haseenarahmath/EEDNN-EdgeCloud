
from werkzeug.utils import secure_filename
import config
from appEdge import app
from flask import render_template, flash, redirect, url_for, request, send_from_directory

from appEdge.api.services.web_service import check_inference_edge_web, get_catogory, get_experiment_data,get_experiment_data_training,check_inference_edge_web_aws
from appEdge.frontEnd.form import LoginForm, DnnForm, ImageRecForm, PartitionForm, DnnTrainingForm
from flask_login import current_user, login_user, logout_user, login_required
from urllib.parse import urlparse

from appEdge.frontEnd.models import User
from appEdge.assignment import algorithm
from appEdge.assignment import new_algorithm
from end_node_img import check_inference_edge, send_img


@app.route('/')
@app.route('/index')
@login_required
def index():
    user = {'username': 'Haseena'}
    return render_template("index.html", title='Home Page', user=user)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():

        '''flash('Login requested for user {}, remember_me={}'.format(
            form.username.data, form.remember_me.data))'''
        user = User()
        print("heloo:", form.password.data)
        print(user.check_password(form.password.data))
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))

        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or urlparse(next_page).netloc != '':
            next_page = url_for('index')
        return redirect(next_page)
    return render_template('login.html', title='Sign In', form=form)


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))


@app.route('/image_rec', methods=['GET', 'POST'])
@login_required
def image_rec():
    form = ImageRecForm()
    if form.validate_on_submit():
        threshold = form.threshold.data
        branch = form.branches.data
        print("threshold:", threshold, " branch:", branch)
        # flash('Processing....')
        f = request.files['file']
        if f.filename == "":
            flash('Please Upload Image')
            return redirect(url_for('image_rec'))
        path = config.UPLOAD_FOLDER + secure_filename(f.filename)
        f.save(path)
        #aws
        #x = check_inference_edge_web_aws(path, float(threshold), int(branch))
        #commented local
        x = check_inference_edge_web(path, float(threshold), int(branch))
        x = x.json()
        categories = get_catogory(x["class_list"])
        x["categories"] = categories
        x["threshold"] = threshold
        x["branch"] = branch
        form.threshold.data = threshold
        form.branches.data = branch
        return render_template('image_rec.html', title='Image Recognition',
                               form=form, threshold=config.thresholds_supported, branches=config.branches_supported, result=x)

    elif request.method == 'GET':
        # form.latency.data = 123
        # form.bandwidth.data = 234
        return render_template('image_rec.html', title='Image Recognition',
                           form=form, threshold=config.thresholds_supported, branches=config.branches_supported)


@app.route('/dnn', methods=['GET', 'POST'])
@login_required
def dnn():
    form = DnnForm()
    if form.validate_on_submit():
        dataset = form.dataset.data
        model = form.model.data
        form_values = {"dataset": dataset, "model": model, "chart_type": form.chart_type.data,
                       "threshold": form.threshold.data, "branch": form.branches.data}
        print(form_values)
        path = get_experiment_data(dataset, model,form.threshold.data,form.branches.data)
        return render_template('dnn.html', title='DNN Processing',
                               form=form, datasets=[config.datasets_supported], models=[config.models_supported],
                               path=path,
                               thresholds=config.thresholds_supported, branches=config.branches_supported,
                               form_values=form_values)
    elif request.method == 'GET':
        form.dataset.data = "caltech256"
        form.model.data = "mobilenet"
    return render_template('dnn.html', title='Analysis',
                           form=form, datasets=[config.datasets_supported], models=[config.models_supported],
                           thresholds=config.thresholds_supported, branches=config.branches_supported)


@app.route('/assignment')
@login_required
def assignment():
    return render_template("assignment.html", title='Assignment')



@app.route('/partition', methods=['GET', 'POST'])
@login_required
def partition():
    form = PartitionForm()
    if form.validate_on_submit():
        latency = form.latency.data
        alg_type = form.alg_type.data
        print("latency:", latency, " alg_type:", alg_type)
        if alg_type == 'a2':
            x,p,l,i=new_algorithm.runtime_optimizer(latency)
        else:
            x, p, l, i = algorithm.runtime_optimizer(latency)
        print(x)
        return render_template('partition.html', title='Assignment',
                               form=form,exit_p=x,partition=p,latency=l,inf=i,result=True)

    elif request.method == 'GET':
        return render_template('partition.html', title='Assignment',
                           form=form)


@app.route('/training', methods=['GET', 'POST'])
@login_required
def training():
    form = DnnTrainingForm()
    if form.validate_on_submit():
        dataset = form.dataset.data
        model = form.model.data
        form.branches.data=form.branches.data if form.branches.data is not None else -1
        form.training_type.data = form.training_type.data if form.training_type.data is not None else -1
        form_values = {"dataset": dataset, "model": model, "chart_type": form.chart_type.data,
                       "training_type": form.training_type.data, "epochs": form.epochs.data,"branch": form.branches.data}
        print(form_values)
        path = get_experiment_data_training(dataset, model,form.epochs.data,form.branches.data)
        return render_template('training_dnn.html', title='DNN Processing',
                               form=form, datasets=[config.datasets_supported], models=[config.models_supported],
                               path=path,
                               training_type=[config.training_type_supported],
                               training_type_x=list(config.training_type_supported.keys()), epochs=config.epochs_supported,
                               form_values=form_values,branches=config.branches_supported_training,BRANCHES_PER_MODEL=config.BRANCHES_PER_MODEL)
    elif request.method == 'GET':
        form.dataset.data = "cifar10"
        form.model.data = "mobilenet"
    return render_template('training_dnn.html', title='Training Analysis',
                           form=form, datasets=[config.datasets_supported], models=[config.models_supported],
                           training_type=[config.training_type_supported], epochs=config.epochs_supported,branches=config.branches_supported_training,BRANCHES_PER_MODEL=config.BRANCHES_PER_MODEL)

