import axiosClient from "./axiosClient";
const categoryApi = {
  getAllCategory(gender) {
    const url = `/api/category?gender=${gender}`;
    return axiosClient.get(url);
  },
  getAllMaterial(gender) {
    const url = `/api/material?gender=${gender}`;
    return axiosClient.get(url);
  },
  getAllColor(gender) {
    const url = `/api/color?gender=${gender}`;
    return axiosClient.get(url);
  },
  getAllStyle(gender) {
    const url = `/api/style?gender=${gender}`;
    return axiosClient.get(url);
  },
};

export default categoryApi;
