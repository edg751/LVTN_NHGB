import axiosClient from "./axiosClient";
const productApi = {
  getAllProduct(gender) {
    const url = `/api/all_item?gender=${gender}`;
    return axiosClient.get(url);
  },
  getProductDetail(productId) {
    const url = `/api/detail_product?productid=${productId}`;
    return axiosClient.get(url);
  },
};

export default productApi;
