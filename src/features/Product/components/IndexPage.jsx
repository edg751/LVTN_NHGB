import React from "react";
import PropTypes from "prop-types";
import HotProducts from "./HotProducts";
import { Box } from "@mui/material";
import NewProducts from "./NewProducts";

IndexPage.propTypes = {};

function IndexPage(props) {
  return (
    <Box
      sx={{
        width: "1200px",
        minHeight: "600px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "50px",
        marginBottom: "60px",
      }}
    >
      <HotProducts />
      <NewProducts />
    </Box>
  );
}

export default IndexPage;
