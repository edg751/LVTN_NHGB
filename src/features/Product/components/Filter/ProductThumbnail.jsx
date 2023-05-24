import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

ProductThumbnail.propTypes = {};
const StyledImg = styled.img`
  border-radius: 5px;
  margin: 5px;
`;
function ProductThumbnail(props) {
  return (
    <Box>
      <StyledImg
        src="https://bizweb.dktcdn.net/100/438/408/products/tsm5231-den-4.jpg?v=1652520442737"
        alt=""
        width="48%"
      />
      <StyledImg
        src="https://bizweb.dktcdn.net/100/438/408/products/tsm5231-den-1.jpg?v=1652520442737"
        alt=""
        width="48%"
      />
      <StyledImg
        src="https://bizweb.dktcdn.net/100/438/408/products/tsm5231-den-2.jpg?v=1652520442737"
        alt=""
        width="48%"
      />
      <StyledImg
        src="https://bizweb.dktcdn.net/100/438/408/products/tsm5231-den-3.jpg?v=1652520442737"
        alt=""
        width="48%"
      />
      <StyledImg
        src="https://bizweb.dktcdn.net/100/438/408/products/tsm5231-den-5.jpg?v=1652520442737"
        alt=""
        width="48%"
      />
      <StyledImg
        src="https://bizweb.dktcdn.net/100/438/408/products/tsm5231-den-6.jpg?v=1652520442737"
        alt=""
        width="48%"
      />
    </Box>
  );
}

export default ProductThumbnail;
