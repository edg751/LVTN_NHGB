import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Product from "./Product";
import { Box, Grid } from "@mui/material";
import productApi from "api/productApi";

ProductList.propTypes = {
  data: PropTypes.array,
};
ProductList.defaultProps = {
  data: [],
};
function ProductList(props) {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const list = await productApi.getAllProduct(0);
        setProductList(
          list.data.map((x) => ({
            id: x.product_id,
            name: x.product_name,
            price: x.price,
            color: x.color,
            image: x.image,
          }))
        );
        console.log(list);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);

  return (
    <Box>
      <Grid container>
        {productList.map((product, index) => (
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
