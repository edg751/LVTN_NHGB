import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";

FilterByCategory.propTypes = {};

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
          <Typography variant="body2">Thời trang</Typography>
        </li>
        <li>
          <Typography variant="body2">Phụ kiện</Typography>
        </li>{" "}
        <li>
          <Typography variant="body2">Thời trang</Typography>
        </li>
        <li>
          <Typography variant="body2">Phụ kiện</Typography>
        </li>
      </StyledUl>
    </StyledBox>
  );
}

export default FilterByCategory;
