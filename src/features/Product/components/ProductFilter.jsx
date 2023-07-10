import React from "react";
import PropTypes from "prop-types";
import { Box, Paper } from "@mui/material";
import FilterByCategory from "./Filter/FilterByCategory";
import styled from "@emotion/styled";
import FilterByStyle from "./Filter/FilterByStyle";
import FilterByMaterial from "./Filter/FilterByMaterial";
import FilterByPrice from "./Filter/FilterByPrice";
import FilterByColor from "./Filter/FilterByColor";

ProductFilter.propTypes = {};
const StyledPaper = styled(Paper)``;
function ProductFilter({
  handleCategoryChange,
  handleColorChange,
  handlePriceChange,
  handleStyleChange,
  handleMaterialChange,
}) {
  const handleValueStyle = (value) => {
    console.log("STYLE", value);
    handleStyleChange(value);
  };
  const handleValueMaterial = (value) => {
    handleMaterialChange(value);
  };

  const handleValueCategory = (value) => {
    handleCategoryChange(value);
  };
  const handleValueColor = (value) => {
    handleColorChange(value);
  };
  const handleValuePrice = (value) => {
    handlePriceChange(value);
  };
  return (
    <Box>
      <Paper elevation={0}>
        <FilterByCategory handleValueCategory={handleValueCategory} />
      </Paper>

      <StyledPaper elevation={0}>
        <FilterByPrice handleValuePrice={handleValuePrice} />
      </StyledPaper>

      <StyledPaper elevation={0}>
        <FilterByColor handleValueColor={handleValueColor} />
      </StyledPaper>
      <StyledPaper elevation={0}>
        <FilterByStyle handleValueStyle={handleValueStyle}></FilterByStyle>
      </StyledPaper>

      <StyledPaper elevation={0}>
        <FilterByMaterial
          handleValueMaterial={handleValueMaterial}
        ></FilterByMaterial>
      </StyledPaper>
    </Box>
  );
}

export default ProductFilter;
