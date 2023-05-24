import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
const StyledTypographyName = styled(Typography)`
  font-size: 23px;
  text-align: left;
  margin-top: 20px;
`;
ProductInfo.propTypes = {};

function ProductInfo(props) {
  return (
    <Box>
      <StyledTypographyName>
        {"Áo T-Shirt Nam Cotton USA Phiên Bản Premium"}
      </StyledTypographyName>
    </Box>
  );
}

export default ProductInfo;
