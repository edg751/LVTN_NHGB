import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Product from "./Product";
import { Box, Grid, Pagination } from "@mui/material";
import productApi from "api/productApi";
import styled from "@emotion/styled";
import ProductSkeletonList from "../pages/ProductSkeletonList";
const PaginationBox = styled(Box)`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

ProductList.propTypes = {
  data: PropTypes.array,
};
ProductList.defaultProps = {
  data: [],
};
function ProductList({
  filterCategory,
  filterColor,
  filterPrice,
  filterOrderBy,
  filterStyle,
  filterMaterial,
  gender,
  searchValue,
}) {
  console.log("day la search value LIST", searchValue);

  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageCount = Math.ceil(productList.length / 11);
  useEffect(() => {
    (async () => {
      try {
        // const list = await productApi.getAllProduct(
        //   0,
        //   8,
        //   currentPage,
        //   filterCategory,
        //   filterColor,
        //   filterPrice,
        //   filterOrderBy
        // );
        const list = await productApi.getAllProduct(
          gender,
          12,
          currentPage,
          filterCategory,
          filterPrice,
          filterColor,
          filterStyle,
          filterMaterial,
          filterOrderBy,
          searchValue
        );
        // Lấy tất cả những sp và màu sắc và hình ảnh đại diện có số lượng >0

        setProductList(
          list.map((x) => ({
            id: x.id_product,
            name: x.product_name,
            price: x.price,
            color: x.colors_list,
            image: x.images_list,
          }))
        );

        setLoading(false);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, [
    currentPage,
    filterCategory,
    filterColor,
    filterPrice,
    filterOrderBy,
    filterStyle,
    filterMaterial,
    gender,
    searchValue,
  ]);

  const handlePaginationChange = (event, page) => {
    setCurrentPage(page);
  };
  console.log("Tổng trang", pageCount);

  return (
    <Box sx={{ marginBottom: "50px" }}>
      {loading ? (
        <ProductSkeletonList />
      ) : (
        <Grid container>
          {productList.map((product, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              {/* PRODUCT CARD */}
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      )}

      <PaginationBox>
        <Pagination
          color="primary"
          count={pageCount}
          page={currentPage}
          onChange={handlePaginationChange}
        ></Pagination>
      </PaginationBox>
    </Box>
  );
}

export default ProductList;
