import axiosClient from "./axiosClient";

const orderApi = {
  getDeliveryList() {
    const url = "/api/admin/delivery_list";
    return axiosClient.get(url);
  },
  getDeliveryStatus(delivery_id) {
    const url = `/api/admin/delivery_status?delivery_id=${delivery_id}`;
    return axiosClient.get(url);
  },
};

export default orderApi;
