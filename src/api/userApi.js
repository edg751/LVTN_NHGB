import axiosClient from "./axiosClient";

const userApi = {
  register(data) {
    const url = "/api/auth/register";
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = "/api/auth/login";
    return axiosClient.post(url, data);
  },
  getAddress(userId) {
    let url = `/api/user/address?user_id=${userId}`;
    return axiosClient.get(url);
  },
};

export default userApi;
