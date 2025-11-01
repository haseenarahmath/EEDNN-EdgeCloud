import os

DIR_NAME = os.path.dirname(__file__)

DEBUG = True

# Edge URL Configuration 
HOST_EDGE = "localhost" #"146.164.69.144"
#HOST_EDGE = "192.168.0.20"
PORT_EDGE = 5000 #5001
URL_EDGE = "http://%s:%s"%(HOST_EDGE, PORT_EDGE)
#URL_EDGE="http://54.89.214.107"
URL_EDGE_DNN_INFERENCE = "%s/api/edge/edgeInference"%(URL_EDGE)
urlConfModelEdge = "%s/api/edge/modelConfiguration"%(URL_EDGE)
UPLOAD_FOLDER=os.path.join(DIR_NAME, "datasets", "uploaded/")


# Cloud URL Configuration 
HOST_CLOUD = "localhost" #"146.164.69.144"
#HOST_CLOUD = "192.168.0.20"
PORT_CLOUD = 3001
URL_CLOUD = "http://%s:%s"%(HOST_CLOUD, PORT_CLOUD)
URL_CLOUD_DNN_INFERENCE = "%s/api/cloud/cloudInference"%(URL_CLOUD)
urlConfModelCloud = "%s/api/cloud/modelConfiguration"%(URL_CLOUD)
urlOnlyCloudProcessing = "%s/api/cloud/onlyCloudProcessing"%(URL_CLOUD)

#Dataset Path
dataset_path = os.path.join(DIR_NAME, "datasets", "test_dataset_caltech256")

#Model Path
model_path = os.path.join(DIR_NAME, "appEdge", "api", "services", "models", "pristine_model_b_mobilenet_caltech.pth")
edge_model_path = os.path.join(DIR_NAME, "appEdge", "api", "services", "models")
cloud_model_path = os.path.join(DIR_NAME, "appCloud", "api", "services", "models")

#classification_text
classification_path = os.path.join(DIR_NAME, "appEdge", "frontEnd","classification_text.csv")
analysis_file_path =  "inference_time.csv"
datasets_supported = {"caltech256": "Caltech-256", "cifar10": "CIFAR-10", "cifar100": "CIFAR-100"}
models_supported = {"mobilenet": "MobileNetV2","resnet50":"ResNet50","vgg16":"VGG16","denseNet": "DenseNet","efficientNet":"EfficientNet","alexnet": "AlexNet"}
thresholds_supported  = [0.7, 0.75, 0.8, 0.85, 0.9]
branches_supported  = [2, 3, 4, 5]
branches_supported_training  = [0,1,2, 3, 4, 5,6,7,8,9,10]
training_type_supported={1:"Base Model",2:"Joint Training",3:"Layered Training",4:"Separate Training"}
epochs_supported=[20,30,40,50,60,70,80,90,100]
BRANCHES_PER_MODEL={"mobilenet":4,"resnet50":6,"vgg16":4,"denseNet": 10,"efficientNet":8,"alexnet": 5}
#width, height dimensions of the input image
resize_shape = 330


# timeout parameter
timeout = 5

#path of the interence time results
RESULTS_INFERENCE_TIME_EDGE = os.path.join(DIR_NAME, "appEdge", "api", "services", "results")
temp_edge_path = os.path.join(DIR_NAME, "appEdge", "api", "services", "temperature")
temp_cloud_path = os.path.join(DIR_NAME, "appCloud", "api", "services", "temperature")
result_cloud_inference_time = os.path.join(DIR_NAME, "results", "only_cloud_inference_time.csv")


# Settings to load B-Mobilenet model
n_classes = 258                   # number of classes in the dataset
exit_type = ""                  # type of exit
pretrained = False                #always false
distribution = "linear"
exit_type = "bnpool"
input_dim = 300
input_shape = (3, input_dim, input_dim)
nr_max_branches = 5
nr_min_branches = 2
model_name = "mobilenet"
dataset_name = "caltech256"
nr_branch_model = 5

model_path_edge_final = os.path.join(DIR_NAME, "appEdge", "api", "services", "models", 
	"mobilenet_%s_2_branches_%s.pth"%(dataset_name, nr_branch_model))

disabled_branches = [1, 2]
