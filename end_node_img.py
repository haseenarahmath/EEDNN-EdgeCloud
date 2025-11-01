import argparse
import numpy as np
import requests, config, os, json
from requests import HTTPError, ConnectTimeout
from glob import glob
from utils import LoadDataset


def send_img(url, json_data, imgPath):
    try:
        files = [
            ('img', (imgPath, open(imgPath, 'rb'), 'application/octet')),
            ('data', ('data', json.dumps(json_data), 'application/json')), ]
        # print("before")
        response = requests.post(url, files=files, timeout=config.timeout)
        # print("after")
        # print("response1:", response)
        # print(response.json())
        response.raise_for_status()
        # print("response2:", response)
        return response
    except Exception as e:
        raise e


def inferenceEdgeExp(url, json_data, datasetPath):
    dataset_dir_list = os.listdir(datasetPath)
    for j, dir_class in enumerate(dataset_dir_list):
        # print(print("Number of Class: %s" % (j)))
        dir_path = os.path.join(datasetPath, dir_class)

        for i, img in enumerate(os.listdir(dir_path)):
            # print("Image: %s" % (i))
            filePath = os.path.join(datasetPath, dir_class, img)
            send_img(url, json_data, filePath)


def check_sendModelConf():
    print("hello")
    parser = argparse.ArgumentParser(description="Evaluating early-exits DNNs perfomance")

    parser.add_argument('--n_branches', type=int, default=config.nr_max_branches,
                        choices=list(range(config.nr_min_branches, config.nr_max_branches + 1)),
                        help='Number of branches in the early-exit DNNs model (default: %s)' % (config.nr_max_branches))

    parser.add_argument('--dataset_name', type=str, default="caltech256", choices=["caltech256", "cifar10", "cifar100"],
                        help='Dataset name (default: Caltech-256)')

    args = parser.parse_args()
    print("++++++++++++++++++++++++++++++++++", args)
    nr_branches_model = args.n_branches
    print("kkk", nr_branches_model)
    imgs_files_list = list(glob(os.path.join(config.dataset_path, "*")))
    p_tar_list = [0.7, 0.75, 0.8, 0.85, 0.9]

    # for nr_branches_model in nr_branches_model_list:
    # This line defines the number of side branches processed at the cloud
    nr_branch_edge = np.arange(3, nr_branches_model + 1)

    url = config.urlConfModelEdge
    dataset_name = args.dataset_name
    data_dict = {"nr_branches_model": nr_branches_model, "dataset_name": dataset_name}

    try:
        print(url)
        r = requests.post(url, json=data_dict, timeout=30)
        r.raise_for_status()

    except HTTPError as http_err:
        raise SystemExit(http_err)

    except ConnectTimeout as timeout_err:
        print("Timeout error: ", timeout_err)


def check_sendModelConf_post():
    print("hello")
    parser = argparse.ArgumentParser(description="Evaluating early-exits DNNs perfomance")

    parser.add_argument('--n_branches', type=int, default=config.nr_max_branches,
                        choices=list(range(config.nr_min_branches, config.nr_max_branches + 1)),
                        help='Number of branches in the early-exit DNNs model (default: %s)' % (config.nr_max_branches))

    parser.add_argument('--dataset_name', type=str, default="caltech256", choices=["caltech256", "cifar10", "cifar100"],
                        help='Dataset name (default: Caltech-256)')

    # args = parser.parse_args()
    # print("++++++++++++++++++++++++++++++++++",args)
    nr_branches_model = 5
    print("kkk", nr_branches_model)
    imgs_files_list = list(glob(os.path.join(config.dataset_path, "*")))
    p_tar_list = [0.7, 0.75, 0.8, 0.85, 0.9]

    # for nr_branches_model in nr_branches_model_list:
    # This line defines the number of side branches processed at the cloud
    nr_branch_edge = np.arange(3, nr_branches_model + 1)

    url = config.urlConfModelEdge
    dataset_name = "caltech256"
    data_dict = {"nr_branches_model": nr_branches_model, "dataset_name": dataset_name}

    try:
        print(url)
        r = requests.post(url, json=data_dict, timeout=30)
        r.raise_for_status()

    except HTTPError as http_err:
        raise SystemExit(http_err)

    except ConnectTimeout as timeout_err:
        print("Timeout error: ", timeout_err)


def check_inferenceEdgeExp(url, json_data, datasetPath):
    dataset_dir_list = os.listdir(datasetPath)
    # check_sendModelConf()
    check_sendModelConf_post()
    print("++++++++++++++++++++++++++++++++++++++++++++++++")
    for j, dir_class in enumerate(dataset_dir_list):
        print(print("Number of Class: %s" % (j)))
        dir_path = os.path.join(datasetPath, dir_class)
        for i, img in enumerate(os.listdir(dir_path)):
            print("Image: %s" % (i))
            filePath = os.path.join(datasetPath, dir_class, img)
            filePath = "/home/haseena/early_exit_dnn_analysis-master/datasets/index2.jpg"
            print("filePath:", filePath)
            send_img(url, json_data, filePath)
            break
        break


def check_inference_edge(p_tar=0.8, nr_branch_edge=5):
    url = "%s/api/edge/edgeInference" % (config.URL_EDGE)
    json_data = {"p_tar": p_tar, "nr_branch_edge": nr_branch_edge}
    input_dim = 300
    batch_size_test = 1
    normalization = False
    dataset_path = config.dataset_path
    # dataset = LoadDataset(input_dim, batch_size_test, normalization=normalization)
    # test_loader = dataset.caltech(config.dataset_path)
    check_inferenceEdgeExp(url, json_data, dataset_path)
    print("endddd")
    return "hello"


def main():
    # url = "%s/api/edge/image_inference" % (config.URL_EDGE)
    url = "%s/api/edge/edgeInference" % (config.URL_EDGE)
    p_tar = 0.8  # example to test
    #json_data = {"p_tar": p_tar}
    json_data = {"p_tar": 0.7, "nr_branch_edge":2}
    input_dim = 300
    batch_size_test = 1
    normalization = False
    dataset_path = config.dataset_path
    # dataset = LoadDataset(input_dim, batch_size_test, normalization=normalization)
    # test_loader = dataset.caltech(config.dataset_path)
    inferenceEdgeExp(url, json_data, dataset_path)


if __name__ == "__main__":
    check_sendModelConf()
    main()
    # check_inference_edge()
