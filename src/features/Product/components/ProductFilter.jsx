import React from "react";
import PropTypes from "prop-types";
import { Box, Paper } from "@mui/material";
import FilterByCategory from "./Filter/FilterByCategory";
import FilterByPrice from "./Filter/FilterByPrice";
import styled from "@emotion/styled";

ProductFilter.propTypes = {};
const StyledPaper = styled(Paper)``;
function ProductFilter(props) {
  const { filters, onChange } = props;

  const handleFilterChange = (newCategoryId) => {};

  const handlePriceChange = (values) => {};
  return (
    <Box>
      <Paper elevation={0}>
        <FilterByCategory onChange={handleFilterChange} />
      </Paper>
      <StyledPaper elevation={0}>
        <FilterByPrice onChange={handlePriceChange} />
      </StyledPaper>
    </Box>
  );
}

export default ProductFilter;
