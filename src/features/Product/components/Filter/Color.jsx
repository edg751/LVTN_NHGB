import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

ColorSelector.propTypes = {};

function ColorSelector({ selectedColor, handleChangeColor }) {
  const colors = [
    { id: 1, name: "Đen", colorValue: "black" },
    { id: 2, name: "Trắng", colorValue: "white" },
    { id: 3, name: "Xanh dương", colorValue: "blue" },
    // Thêm các màu khác nếu cần
  ];
  return (
    <div>
      {colors.map((color) => (
        <label key={color.id}>
          <input
            type="radio"
            hidden
            name="color"
            value={color.colorValue}
            checked={selectedColor === color.colorValue}
            onChange={() => handleChangeColor(color.colorValue)}
          />
          <span
            style={{
              backgroundColor: color.colorValue,
              width: "17px",
              height: "17px",
              display: "inline-block",
              verticalAlign: "middle",
              marginRight: "5px",
              border: "1px solid black", // Thêm border
              borderRadius: "50%",
            }}
          ></span>
          <span />
        </label>
      ))}
    </div>
  );
}

export default ColorSelector;
