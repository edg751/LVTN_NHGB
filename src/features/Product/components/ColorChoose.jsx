import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import axiosClient from "api/axiosClient";
import { useLocation } from "react-router-dom";

const StyledBox = styled(Box)`
  text-align: left;
  margin-left: 10px;
  margin-top: 10px;
`;

const StyledColorBox = styled.span`
  margin-top: 10px;

  width: 30px;
  height: 30px;
  display: inline-block;
  vertical-align: "middle";
  margin-right: 8px;
  box-sizing: border-box;
  cursor: pointer;
`;
ColorChoose.propTypes = {};
function ColorChoose({ selectedColor, handleChangeColor, product }) {
  const location = useLocation();
  const idProduct = location.pathname.split("/").pop();
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await axiosClient(
          `/api/product/color_item?productid=${idProduct}`
        );

        setColorList(
          list.map((x) => ({
            color_id: x.color_id,
            color_name: x.color_name,
            color_code: x.color_code,
          }))
        );
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);

  return (
    <StyledBox>
      <Typography>Màu sắc :</Typography>
      {colorList.map((color, index) => (
        <label key={index}>
          <input
            type="radio"
            hidden
            name="color"
            value={color.color_name}
            checked={selectedColor === color}
            onChange={() => handleChangeColor(color)}
          />
          <StyledColorBox
            style={{
              borderRadius: "2px",
              backgroundColor: color.color_code,
              border:
                selectedColor === color
                  ? "3px solid #fcaf17"
                  : "1px solid black",
            }}
          ></StyledColorBox>
        </label>
      ))}
    </StyledBox>
  );
}

export default ColorChoose;
