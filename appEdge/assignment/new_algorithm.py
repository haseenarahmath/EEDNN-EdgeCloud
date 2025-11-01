import sys
import time
import appEdge.assignment.utility as util


def find_latency(i, p, layer, N, branch, d):  # 0,
    i_b = util.get_input_size_by_bandwidth(p)
    o_b = util.get_output_size_by_bandwidth(p, N, layer)
    if p == 0:  # all layers execute in the device
        lat_d = sum(util.PREDICTION_MODEL_DEVICE.get(a) for a in branch)
        return [0, lat_d, util.calculate_latency(0, lat_d, i_b, o_b)]
    elif p == N:  # all layers execute in the server
        # lat_s = sum(utility.PREDICTION_MODEL_SERVER.get(a) for a in branch)
        lat_s = d[(i, p - 1)][0] + util.PREDICTION_MODEL_SERVER.get(branch[p - 1])
        return [lat_s, 0, util.calculate_latency(lat_s, 0, i_b, o_b)]
    else:
        pre_layer = branch[p - 1]
        lat_s = d[(i, p - 1)][0] + util.PREDICTION_MODEL_SERVER.get(pre_layer)
        lat_d = d[(i, p - 1)][1] - util.PREDICTION_MODEL_DEVICE.get(pre_layer)
        return [lat_s, lat_d, util.calculate_latency(lat_s, lat_d, i_b, o_b)]


def find_exit_partition_point(LAT):
    d = {}
    min_lat = sys.maxsize
    for i in range(util.EXIT_POINTS - 1, 0, -1):  # for i = M, ··· , 1 do
        branch = util.LAYERS[i]
        print("Exit Point: ", i + 1)
        for p, j in enumerate(branch + [-99]):
            d[(i, p)] = find_latency(i, p, j, util.NO_OF_LAYERS[i], branch, d)
            # print("partition:", p + 1, "lat:", d[(i, p)][2],"server_lat:",d[(i, p)][0]," device_lat:",d[(i, p)][1])
            print("partition:", p + 1, "lat:", d[(i, p)][2])
            if min_lat > d[(i, p)][2]:
                min_lat = d[(i, p)][2]
                partition = p
        if util.is_lat_meet_requirement(min_lat,LAT):
            return i, partition, min_lat
    return None, None, None  # can not meet the latency requirement


def runtime_optimizer(LAT):
    start = time.process_time()
    util.initialize_parameters()
    exit_point, partition_point, lat = find_exit_partition_point(eval(LAT))
    t = (time.process_time() - start) * 1000
    if exit_point is not None:
        print("Optimal exit_point:", exit_point + 1, " partition_point:", partition_point + 1, " latency:", lat)
        return exit_point + 1, partition_point + 1, lat, t
    else:
        print("No Optimal point for the given latency")
        return None, None, None, t

#start = time.process_time()
#runtime_optimizer()
#print("executed in ", (time.process_time() - start) * 1000, " milli seconds")
