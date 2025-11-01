from flask import Blueprint, g, render_template, request, jsonify, session, redirect, url_for, current_app as app,flash
import json, os, time, sys, config, torch, requests
from .services import edgeProcessing
from .services.edgeProcessing import model
from ..frontEnd.form import DnnForm

api = Blueprint("api", __name__, url_prefix="/api")


@api.route("/edge/modelConfiguration", methods=["POST"])
def edgeModelConfiguration():
	data = request.json
	data={}
	data["nr_branches_model"]=5
	data["dataset_name"]="caltech256"
	model.nr_branches_model = data["nr_branches_model"]
	device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
	model.update_load_model(device, data["dataset_name"])
	model.load_temperature()
	return jsonify({"status": "ok"}), 200

# Define url for the user send the image
@api.route('/edge/edgeInference', methods=["POST"])
def edge_inference():
	"""
	This function receives an image from user or client with smartphone at the edge device into smart sity context
	"""
	fileImg = request.files['img']

	json_data = json.load(request.files['data'])
	#print(json_data)
	#This functions process the DNN inference
	result = edgeProcessing.edgeInference(fileImg, json_data["p_tar"], json_data["nr_branch_edge"])

	print("result:",result)
	if (result["status"] ==  "ok"):
		return jsonify(result), 200

	else:
		return jsonify(result), 500


@api.route('/edge/testJson', methods=["POST"])
def edge_test_json():
	"""
	This function tests the server to receive a simple json post request.
	"""	

	post_data = request.json

	result = {"status": "ok"}

	if (result["status"] ==  "ok"):
		return jsonify(result), 200

	else:
		return jsonify(result), 500

@api.route('/dnn', methods=['GET', 'POST'])
def dnn():
	form = DnnForm()
	if form.validate_on_submit():
		latency = form.latency.data
		bandwidth = form.bandwidth.data
		print("latency:", latency, " bandwidth:", bandwidth)
		flash('Processing....')
		return redirect(url_for('dnn'))
	elif request.method == 'GET':
		form.latency.data = 123
		form.bandwidth.data = 234
	return render_template('dnn.html', title='Early Exit DNN Analysis',form=form)
