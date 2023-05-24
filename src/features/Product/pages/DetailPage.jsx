import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Box, Container, Grid, Paper } from "@mui/material";
import styled from "@emotion/styled";
import ProductThumbnail from "../components/Filter/ProductThumbnail";
import ProductInfo from "../components/ProductInfo";
DetailPage.propTypes = {};
const StyledGridLeft = styled(Grid)`
  width: 700px;
  padding: 14px;
`;
const StyledGridRight = styled(Grid)`
  padding: "14px";
  flex: 1 1 0;
`;

function DetailPage(props) {
  const { productId } = useParams();

  return (
    <div>
      CHI TIẾT SẢN PHẨM {productId}
      <Box>
        <Container>
          <Paper elevation={0}>
            <Grid container>
              {/* LEFT */}
              <StyledGridLeft item>
                <ProductThumbnail product={null} />
              </StyledGridLeft>
              {/* RIGHT */}
              <StyledGridRight item>
                <ProductInfo product={null} />
                {/*                <AddToCardForm onSubmit={handleAddToCartSubmit} /> */}
              </StyledGridRight>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </div>
  );
}

export default DetailPage;
