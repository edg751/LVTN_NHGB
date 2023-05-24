import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";

FilterByCategory.propTypes = {};

const StyledTypography = styled(Typography)`
  font-size: 15px;
`;

const StyledUl = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;

  & > li {
    margin-top: 8px;
    transition: all 0.25s;

    &:hover {
      cursor: pointer;
      color: #27006f;
      background-color: #fae1ae;
      border-radius: 5px;
    }
  }
`;

const StyledBox = styled(Box)`
  padding: 16px;
`;
function FilterByCategory(props) {
  return (
    <StyledBox>
      <Typography variant="subtitle2">LOẠI SẢN PHẨM</Typography>
      <StyledUl>
        <li>
          <StyledTypography variant="body2">Thời trang</StyledTypography>
        </li>
        <li>
          <StyledTypography variant="body2">Phụ kiện</StyledTypography>
        </li>{" "}
        <li>
          <StyledTypography variant="body2">Thời trang</StyledTypography>
        </li>
        <li>
          <StyledTypography variant="body2">Phụ kiện</StyledTypography>
        </li>
      </StyledUl>
    </StyledBox>
  );
}

export default FilterByCategory;
