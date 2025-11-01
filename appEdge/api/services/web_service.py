import torch
from flask import url_for, jsonify

import config
from appEdge.api.services import edgeProcessing
from appEdge.api.services.edgeProcessing import model
from end_node_img import send_img, check_sendModelConf_post
import linecache

def check_inference_edge_web(file_path, p_tar=0.8, nr_branch_edge=5):
    check_sendModelConf_post()
    url = "%s/api/edge/edgeInference" % (config.URL_EDGE)
    json_data = {"p_tar": p_tar, "nr_branch_edge": nr_branch_edge}
    input_dim = 300
    batch_size_test = 1
    normalization = False
    x = send_img(url, json_data, file_path)
    return x
def check_sendModelConf_post_aws(nr_branches_model,dataset_name):
    model.nr_branches_model = nr_branches_model
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model.update_load_model(device,dataset_name)
    model.load_temperature()
    #return jsonify({"status": "ok"}), 200


def check_inference_edge_web_aws(file_path, p_tar=0.8, nr_branch_edge=5):
    dataset_name = "caltech256"
    nr_branches_model = 5
    print("check_inference_edge_web_aws")
    check_sendModelConf_post_aws(nr_branches_model,dataset_name)
    json_data = {"p_tar": p_tar, "nr_branch_edge": nr_branch_edge}
    input_dim = 300
    batch_size_test = 1
    normalization = False
    fileImg = open(file_path, 'rb')
    result = edgeProcessing.edgeInference(fileImg, json_data["p_tar"], json_data["nr_branch_edge"])
    return result


def get_catogory(lst):
    cat = []
    if lst:
        for x in lst:
            c = linecache.getline(config.classification_path, x + 1).strip()
            if c:
                cat.append(c.split(",")[1])
    return cat


def get_experiment_data(dataset, model, threshold, branch):
    print(threshold, branch)
    threshold = '0.1' if (threshold is None or threshold == '-1' or branch is None or branch == '-1') else threshold
    branch = '1' if (branch is None or branch == '-1' or threshold == '0.1') else branch
    print(threshold, branch)
    threshold = threshold.split(".")[1]
    path = "inference_time" + "_" + threshold + "_" + branch + ".csv"
    print(path)
    # path="inference_time_back.csv"
    return path

def get_experiment_data_training(dataset, model, epochs, branch):
    #print(threshold, branch)
    #threshold = '0.1' if (threshold is None or threshold == '-1' or branch is None or branch == '-1') else threshold
    #branch = '1' if (branch is None or branch == '-1' or threshold == '0.1') else branch
    #print(threshold, branch)
    #threshold = threshold.split(".")[1]
    path = "training" + "_" + model + "_" + dataset + ".csv"
    print(path)
    # path="inference_time_back.csv"
    return path
