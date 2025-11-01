EXIT_POINTS = 0  # M number of exit points in the DNN model
NO_OF_LAYERS = []  # the number of layers in the branch of exit pint i {Ni|i =1, ··· ,M}:22, 20, 19, 16 and 12
LAYERS = []  # layers in the branch of exit point i {Lj|j =1, ··· ,Ni}
LAYER_WISE_OUTPUT_SIZE = []  # layer-wise output data size in the branch of exit point i {Dj|j =1, ··· ,Ni}:
PREDICTION_MODEL_DEVICE = {}  # f(Lj): the prediction model that returns the j-th layer’s latency
PREDICTION_MODEL_SERVER = {}  # f(Lj): the prediction model that returns the j-th layer’s latency
CURRENT_BANDWIDTH = 0  # B: current available bandwidth
INPUT_SIZE = 0  # Input: input data size
INPUT_BY_BANDWIDTH = 0
FILE_NAME = "./appEdge/assignment/dnn_parameters.txt"


def initialize_parameters():
    global EXIT_POINTS, NO_OF_LAYERS, LAYERS, LAYER_WISE_OUTPUT_SIZE, PREDICTION_MODEL_DEVICE, PREDICTION_MODEL_SERVER, \
        CURRENT_BANDWIDTH, INPUT_SIZE,INPUT_BY_BANDWIDTH
    lines = read_file()
    EXIT_POINTS = get_value(lines[0])
    NO_OF_LAYERS = get_value(lines[1])
    LAYERS = get_value(lines[2])
    LAYER_WISE_OUTPUT_SIZE = get_value(lines[3])
    PREDICTION_MODEL_DEVICE = get_value(lines[4])
    PREDICTION_MODEL_SERVER = get_value(lines[5])
    CURRENT_BANDWIDTH = get_value(lines[6])
    INPUT_SIZE = get_value(lines[7])

    INPUT_BY_BANDWIDTH = INPUT_SIZE / CURRENT_BANDWIDTH


def calculate_latency(server_lat, device_lat, input_b, output_b):
    return server_lat + device_lat + input_b + output_b


# p==1 ESp =0,Dp−1/B =0,Input/B =0)p==Ni EDp =0,Dp−1/B =0)
def get_output_size_by_bandwidth(p, N, layer=None):
    if p == 0 or p == N:
        return 0
    return LAYER_WISE_OUTPUT_SIZE[layer if layer is not None else p] / CURRENT_BANDWIDTH


def get_input_size_by_bandwidth(p):
    if p == 0:
        return 0
    return INPUT_BY_BANDWIDTH


def is_lat_meet_requirement(lat,LATENCY):
    if lat <= LATENCY:
        return True
    return False


def get_value(val_):
    return eval(val_.strip().split("=")[1])


def read_file():
    with open(FILE_NAME) as fp:
        return fp.readlines()
