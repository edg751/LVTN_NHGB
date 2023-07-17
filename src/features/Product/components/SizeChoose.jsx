import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import axiosClient from "api/axiosClient";

const StyledBox = styled(Box)`
  text-align: left;
  margin-left: 10px;
  margin-top: 10px;
`;

const StyledColorBox = styled.span`
  margin-top: 10px;
  width: 30px;
  height: 30px;
  border: 1px black solid;
  display: inline-block;
  vertical-align: "middle";
  text-align: center;
  margin-right: 8px;
  box-sizing: border-box;
  cursor: pointer;
`;

SizeChoose.propTypes = {};
function SizeChoose({ selectedSize, handleChangeSize, product }) {
  const location = useLocation();
  const idProduct = location.pathname.split("/").pop();
  const [sizeList, setSizeList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await axiosClient(
          `/api/product/size_item?productid=${idProduct}`
        );

        setSizeList(
          list.map((x) => ({
            size_id: x.size_id,
            size_name: x.size_name,
          }))
        );
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);
  return (
    <StyledBox>
      <Typography>Kích thước :</Typography>
      {sizeList.map((size, index) => (
        <label key={index}>
          <input
            type="radio"
            hidden
            name="size"
            value={size.size_name}
            checked={selectedSize === size}
            onChange={() => handleChangeSize(size)}
            // disabled={size.quantitySize <= 0}
          />
          <StyledColorBox
            style={{
              lineHeight: "25px",
              fontWeight: 600,
              borderRadius: "2px",
              backgroundColor: selectedSize === size ? "#fcaf17" : "white",
              color: selectedSize === size ? "white" : "black",
              opacity: size <= 0 ? "0.3" : "1",
            }}
          >
            {size.size_name}
          </StyledColorBox>
        </label>
      ))}
    </StyledBox>
  );
}

export default SizeChoose;
