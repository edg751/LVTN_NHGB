import styled from "@emotion/styled";
import { Box, Container, Grid, Pagination, Paper } from "@mui/material";
import React, { useState } from "react";
import ProductSkeletonList from "./ProductSkeletonList";
import ProductFilter from "../components/ProductFilter";
import FilterByViewer from "../components/Filter/FilterByViewer";
import ProductList from "../components/ProductList";

ListPage.propTypes = {};

const GridLeft = styled(Grid)`
  width: 250px;
`;
const GridRight = styled(Grid)`
  flex: 1 1 0;
`;

const PaginationBox = styled(Box)`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const StyledContainer = styled(Container)`
  margin-top: 30px;
`;

function ListPage(props) {
  const [Filter, setFilter] = useState({
    _page: 1,
    _limit: 12,
    _sort: "salePrice:ASC",
    "category.id": 1,
  });

  const handleFilterChange = (newFilter) => {};

  return (
    <StyledContainer>
      <Container>
        <Grid container spacing={1}>
          {/*COLUMN LEFT */}
          <GridLeft item>
            <ProductFilter
              filters={Filter}
              onChange={handleFilterChange}
            ></ProductFilter>
          </GridLeft>

          {/*COLUMN RIGHT */}
          <GridRight item>
            <Paper elevation={0}>
              <FilterByViewer />
              {/* <ProductSkeletonList /> */}
              <ProductList />
            </Paper>
            <PaginationBox>
              <Pagination
                color="primary"
                count={Filter._limit}
                page={Filter._page}
                onChange={null}
              ></Pagination>
            </PaginationBox>
          </GridRight>
        </Grid>
      </Container>
    </StyledContainer>
  );
}

export default ListPage;
