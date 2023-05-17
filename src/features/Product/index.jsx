import React from "react";
import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import ListPage from "./pages/ListPage";
import { useLocation } from "react-router-dom";
ProductFeature.propTypes = {};

function ProductFeature(props) {
  const location = useLocation();
  const { pathname } = location;
  return (
    <Box pt={4}>
      <Routes>
        <Route path={pathname} element={<ListPage />} />
      </Routes>
    </Box>
  );
}

export default ProductFeature;
