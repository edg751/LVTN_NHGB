import axiosClient from "./axiosClient";
const adminApi = {
  getOrderListWait(filter, filter2) {
    let url = `/api/admin/order_wait`;
    if (filter.length > 0) {
      url += `?filter_order=${filter}`;
    }
    if (filter2) {
      url += `?filter_order2=${filter2}`;
    }
    console.log(filter2);
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
