import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

ProductThumbnail.propTypes = {};
const StyledImg = styled.img`
  border-radius: 5px;
  margin: 5px;
`;
function ProductThumbnail({ product }) {
  console.log("hinh:", product[0].images);
  return (
    <Box>
      {product[0].images.map((image, index) => (
        <StyledImg key={index} src={image.image_link} alt="" width="48%" />
      ))}
    </Box>
  );
}

export default ProductThumbnail;
