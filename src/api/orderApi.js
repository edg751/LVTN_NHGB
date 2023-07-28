import axiosClient from "./axiosClient";

const orderApi = {
  getDeliveryList(filter) {
    let url = "/api/admin/delivery_list";

    url += `?filter=${filter}`;
    console.log(url);
    return axiosClient.get(url);
  },
  getDeliveryStatus(delivery_id) {
    const url = `/api/admin/delivery_status?delivery_id=${delivery_id}`;
    return axiosClient.get(url);
  },
};

export default orderApi;
