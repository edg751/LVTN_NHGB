import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
DetailPage.propTypes = {};

function DetailPage(props) {
  const { productId } = useParams();

  return <div>CHI TIẾT SẢN PHẨM {productId}</div>;
}

export default DetailPage;
