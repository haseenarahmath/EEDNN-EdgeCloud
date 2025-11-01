import sys
import time
import appEdge.assignment.utility as util


def find_partition_point(N, Es, Ed):
    min_lat = sys.maxsize
    partition = 0
    for p in range(N + 1):
        server_lat = 0
        device_lat = 0
        for j in range(p):
            # print("s:",j)
            server_lat = server_lat + Es[j]
        for j in range(p, N):
            device_lat = device_lat + Ed[j]

        output_b = util.get_output_size_by_bandwidth(p, N)
        lat = util.calculate_latency(server_lat, device_lat, util.get_input_size_by_bandwidth(p), output_b)
        print("partition:", p + 1, "lat:", lat)
        if min_lat > lat:
            min_lat = lat
            partition = p
    return partition, min_lat


def find_exit_partition_point(LATENCY):
    Es = []
    Ed = []
    for i in range(util.EXIT_POINTS - 1, 0, -1):  # for i = M, ··· , 1 do
        N = util.NO_OF_LAYERS[i]  # Select the branch of i-th exit point
        print("Exit Point: ", i + 1)
        Es = []
        Ed = []
        for j in range(N):  # for j =1, ··· ,Ni do
            layer = util.LAYERS[i][j]
            Es.append(util.PREDICTION_MODEL_SERVER.get(layer))  # ESj ← fedge(Lj)
            Ed.append(util.PREDICTION_MODEL_DEVICE.get(layer))  # EDj ← fdevice(Lj)
        partition, latency = find_partition_point(N, Es, Ed)
        if util.is_lat_meet_requirement(latency,LATENCY):
            return i, partition, latency
    return None, None, None  # can not meet the latency requirement


def runtime_optimizer(lat):
    start = time.process_time()
    util.initialize_parameters()
    exit_point, partition_point, lat = find_exit_partition_point(eval(lat))
    for i in range(10000):
        i
    t = (time.process_time() - start) * 1000
    if exit_point is not None:

        print("Optimal exit_point:", exit_point + 1, " partition_point:", partition_point + 1, " latency:", lat)
        return exit_point + 1, partition_point + 1, lat, t
    else:
        print("No Optimal point for the given latency")
        return None,None,None,t




#start = time.process_time()
#runtime_optimizer()
#print("executed in ", (time.process_time() - start) * 1000, " milli seconds")
