import axiosClient from "./axiosClient";
const adminApi = {
  getOrderListWait() {
    const url = `/api/admin/order_wait`;
    return axiosClient.get(url);
  },
  gerOderDetail(oderid) {
    const url = `/api/admin/order_detail?orderid=${oderid}`;
    return axiosClient.get(url);
  },

  getOderInfo(orderid) {
    const url = `/api/admin/order_info?orderid=${orderid}`;
    return axiosClient.get(url);
  },
};

export default adminApi;
