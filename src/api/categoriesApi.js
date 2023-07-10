import axiosClient from "./axiosClient";
const categoryApi = {
  getAllCategory(gender) {
    let url = `/api/list/categories`;
    if (gender) {
      url = `/api/list/categories?gender=${gender}`;
    }
    return axiosClient.get(url);
  },
  getDetailCategory(categoryId) {
    let url = `/api/admin/detail_category?category_id=${categoryId}`;
    return axiosClient.get(url);
  },
  getAllCategoryAdmin() {
    let url = `/api/admin/get_all_category`;
    return axiosClient.get(url);
  },
  getAllMaterial(gender) {
    let url = `/api/list/materials`;
    if (gender) {
      url = `/api/list/materials?gender=${gender}`;
    }
    return axiosClient.get(url);
  },
  getDetailMaterial(materialId) {
    let url = `/api/admin/detail_material?material_id=${materialId}`;
    return axiosClient.get(url);
  },
  getAllMaterialAdmin() {
    let url = `/api/admin/get_all_material`;
    return axiosClient.get(url);
  },
  getAllColor(gender) {
    let url = `/api/list/colors`;

    if (gender) {
      url = `/api/list/colors?gender=${gender}`;
    }
    return axiosClient.get(url);
  },
  getAllStyle(gender) {
    let url = `/api/list/styles`;
    if (gender) {
      url = `/api/list/styles?gender=${gender}`;
    }
    return axiosClient.get(url);
  },
  getDetailStyle(styleId) {
    let url = `/api/admin/detail_style?style_id=${styleId}`;
    return axiosClient.get(url);
  },
  getAllStyleAdmin() {
    let url = `/api/admin/get_all_style`;
    return axiosClient.get(url);
  },
  getAllSize() {
    let url = `/api/list/size`;
    return axiosClient.get(url);
  },
  getAllColorAdmin() {
    let url = `/api/admin/get_all_color`;
    return axiosClient.get(url);
  },
  getDetailColor(colorId) {
    let url = `/api/admin/detail_color?color_id=${colorId}`;
    return axiosClient.get(url);
  },
};

export default categoryApi;
