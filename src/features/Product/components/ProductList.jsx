import React from "react";
import PropTypes from "prop-types";

import Product from "./Product";
import { Box, Grid } from "@mui/material";

ProductList.propTypes = {
  data: PropTypes.array,
};
ProductList.defaultProps = {
  data: [],
};
function ProductList(props) {
  const data = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
    { id: 4, name: "Product 1", price: 10 },
    { id: 5, name: "Product 2", price: 20 },
    { id: 6, name: "Product 3", price: 30 },
    { id: 7, name: "Product 1", price: 10 },
    { id: 8, name: "Product 2", price: 20 },
    { id: 9, name: "Product 3", price: 30 },
    { id: 10, name: "Product 1", price: 10 },
    { id: 11, name: "Product 2", price: 20 },
    { id: 12, name: "Product 3", price: 30 },
    // Thêm các đối tượng sản phẩm khác vào đây nếu cần
  ];

  return (
    <Box>
      <Grid container>
        {data.map((product, index) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            {/* PRODUCT CARD */}
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;
