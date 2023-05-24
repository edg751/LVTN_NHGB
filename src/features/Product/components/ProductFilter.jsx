import React from "react";
import PropTypes from "prop-types";
import { Box, Paper } from "@mui/material";
import FilterByCategory from "./Filter/FilterByCategory";
import FilterByPrice from "./Filter/FilterByColor";
import styled from "@emotion/styled";
import FilterByColor from "./Filter/FilterByPrice";
import FilterByStyle from "./Filter/FilterByStyle";
import FilterByMaterial from "./Filter/FilterByMaterial";

ProductFilter.propTypes = {};
const StyledPaper = styled(Paper)``;
function ProductFilter(props) {
  const { filters, onChange } = props;

  const handleFilterChange = (newCategoryId) => {};

  const handlePriceChange = (values) => {};
  const handleColorChange = (values) => {};
  const handleStyleChange = (values) => {};
  const handleMaterialChange = (values) => {};

  return (
    <Box>
      <Paper elevation={0}>
        <FilterByCategory onChange={handleFilterChange} />
      </Paper>
      <StyledPaper elevation={0}>
        <FilterByPrice onChange={handlePriceChange} />
      </StyledPaper>
      <StyledPaper elevation={0}>
        <FilterByColor onChange={handleColorChange} />
      </StyledPaper>
      <StyledPaper elevation={0}>
        <FilterByStyle onChange={handleStyleChange}></FilterByStyle>
      </StyledPaper>

      <StyledPaper elevation={s0}>
        <FilterByMaterial onChange={handleMaterialChange}></FilterByMaterial>
      </StyledPaper>
    </Box>
  );
}

export default ProductFilter;
