import styled from "@emotion/styled";
import { Box, Container, Grid, Pagination, Paper } from "@mui/material";
import React from "react";
import ProductSkeletonList from "./ProductSkeletonList";

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

function ListPage(props) {
  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          {/*COLUMN LEFT */}
          <GridLeft item>
            <Paper elevation={0}>
              <div>FILTER LEFT</div>
            </Paper>
          </GridLeft>

          {/*COLUMN RIGHT */}
          <GridRight item>
            <Paper elevation={0}>
              <div>PRODUCT LIST</div>
              <ProductSkeletonList />
            </Paper>
            <PaginationBox>
              <Pagination
                color="primary"
                count="10"
                page="1"
                onChange={null}
              ></Pagination>
            </PaginationBox>
          </GridRight>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
