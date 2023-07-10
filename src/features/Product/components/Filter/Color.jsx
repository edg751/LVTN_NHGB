import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

ColorSelector.propTypes = {};

function ColorSelector({ selectedColor, handleChangeColor, color }) {
  return (
    <div>
      {color.map((color, index) => (
        <label key={index}>
          <input
            type="radio"
            hidden
            name="color"
            value={color}
            checked={selectedColor === color}
            onChange={() => handleChangeColor(color)}
          />
          <span
            style={{
              cursor: "pointer",
              backgroundColor: color.color_code,
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
