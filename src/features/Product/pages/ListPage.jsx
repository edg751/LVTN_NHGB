import styled from "@emotion/styled";
import { Box, Container, Grid, Pagination, Paper } from "@mui/material";
import React, { useState } from "react";
import ProductSkeletonList from "./ProductSkeletonList";
import ProductFilter from "../components/ProductFilter";
import FilterByViewer from "../components/Filter/FilterByViewer";
import ProductList from "../components/ProductList";
import { useParams } from "react-router-dom";

ListPage.propTypes = {};

const GridLeft = styled(Grid)`
  width: 250px;
`;
const GridRight = styled(Grid)`
  flex: 1 1 0;
`;

const StyledContainer = styled(Container)`
  margin-top: 30px;
`;

function ListPage(props) {
  // const [Filter, setFilter] = useState({
  //   _page: 1,
  //   _limit: 12,
  //   _sort: "salePrice:ASC",
  //   "category.id": 1,
  // });
  const { gender } = useParams();
  console.log("gender", gender);
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterColor, setFilterColor] = useState([]);
  const [filterPrice, setFilterPrice] = useState([]);
  const [filterOrderBy, setFilterOrderBy] = useState([]);
  const [filterStyle, setFilterStyle] = useState([]);
  const [filterMaterial, setFilterMaterial] = useState([]);

  const handleCategoryChange = (value) => {
    setFilterCategory(value);
    console.log("DAY LA value CATE", value);
  };
  const handleColorChange = (value) => {
    setFilterColor(value);
    console.log("DAY LA value color", value);
  };
  const handlePriceChange = (value) => {
    setFilterPrice(value);
    console.log("DAY LA value gia", value);
  };
  const handleOrderByChange = (value) => {
    console.log(value);
    setFilterOrderBy(value);
    console.log("DAY LA value order", value);
  };
  const handleStyleChange = (value) => {
    console.log(value);
    setFilterStyle(value);
    console.log("DAY LA value style", value);
  };
  const handleMaterialChange = (value) => {
    console.log(value);
    setFilterMaterial(value);
    console.log("DAY LA value vat lieu", value);
  };

  return (
    <StyledContainer>
      <Container>
        <Grid container spacing={1}>
          {/*COLUMN LEFT */}
          <GridLeft item sx={{ marginBottom: "50px" }}>
            <ProductFilter
              handleCategoryChange={handleCategoryChange}
              handleColorChange={handleColorChange}
              handlePriceChange={handlePriceChange}
              handleStyleChange={handleStyleChange}
              handleMaterialChange={handleMaterialChange}
            ></ProductFilter>
          </GridLeft>

          {/*COLUMN RIGHT */}
          <GridRight item>
            <Paper elevation={0}>
              <FilterByViewer handleOrderByChange={handleOrderByChange} />

              <ProductList
                filterCategory={filterCategory}
                filterColor={filterColor}
                filterPrice={filterPrice}
                filterOrderBy={filterOrderBy}
                filterMaterial={filterMaterial}
                filterStyle={filterStyle}
                gender={gender}
              />
            </Paper>
          </GridRight>
        </Grid>
      </Container>
    </StyledContainer>
  );
}

export default ListPage;
