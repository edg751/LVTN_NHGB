import axiosClient from "./axiosClient";
const productApi = {
  getAllProduct(
    gender,
    pageSize,
    page,
    categories,
    price,
    colors,
    styles,
    materials,
    orderBy,
    searchValue
  ) {
    let url = `/api/list/products?gender=${gender}&pageSize=${pageSize}&page=${page}`;

    if (categories && categories.length > 0) {
      const categoryString = categories.join("&category=");
      url += `&category=${categoryString}`;
    }

    if (price && price.length > 0) {
      url += `&price=${price}`;
    }

    if (colors && colors.length > 0) {
      const colorsString = colors.join("&color=");
      url += `&color=${colorsString}`;
    }

    if (materials && materials.length > 0) {
      const materialsString = materials.join("&material=");
      url += `&material=${materialsString}`;
    }

    if (styles && styles.length > 0) {
      const stylesString = styles.join("&style=");
      url += `&style=${stylesString}`;
    }

    if (searchValue) {
      url += `&search=${searchValue}`;
    }

    if (orderBy && orderBy.length > 0) {
      url += `&orderby=${orderBy}`;
    }
    console.log("URL la day", url);
    return axiosClient.get(url);
  },

  getProductDetail(productId, color) {
    let url = `/api/detailt/product?productid=${productId}`;
    if (color) {
      url += `&color=${color}`;
    }
    return axiosClient.get(url);
  },

  getProductDetailUpdate(productId) {
    let url = `/api/admin/detail_update?productid=${productId}`;
    return axiosClient.get(url);
  },

  getProductListAdmin() {
    const url = `/api/admin/products`;
    return axiosClient.get(url);
  },
  getProductDetailAdmin(productid) {
    const url = `/api/admin/product_detail?productid=${productid}`;
    return axiosClient.get(url);
  },
  getProductLinkAdmin(productid) {
    const url = `/api/admin/product_link_image?productid=${productid}`;
    return axiosClient.get(url);
  },
  getStatusFavorite(productid, userid) {
    const url = `/api/getFavorite?productid=${productid}&userid=${userid}`;
    return axiosClient.get(url);
  },
  getStatusReview(productid, userid) {
    const url = `/api/getReview?productid=${productid}&userid=${userid}`;
    console.log(`url`, url);
    return axiosClient.get(url);
  },
  getReviewList(productid) {
    const url = `/api/getComment?productid=${productid}`;
    return axiosClient.get(url);
  },
};

export default productApi;
