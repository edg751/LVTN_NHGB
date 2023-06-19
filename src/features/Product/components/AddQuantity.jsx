import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import styled from "@emotion/styled";

AddQuantity.propTypes = {};

const StyledTextField = styled(TextField)`
  margin-top: 30px;
  margin-left: 10px;
  display: flex;
  width: 100px;
`;

function AddQuantity({ handleQuantityChange }) {
  const [value, setValue] = useState(1);

  const handleInputChange = (event) => {
    let inputValue = event.target.value;
    // Kiểm tra giá trị nhập vào
    if (inputValue === "" || parseFloat(inputValue) <= 0) {
      // Nếu giá trị là rỗng hoặc số âm, gán giá trị là 1
      setValue(1);
    } else if (parseFloat(inputValue) > 999) {
      // Nếu giá trị lớn hơn 999, gán giá trị là 999
      setValue(999);
    } else {
      // Giá trị hợp lệ, gán giá trị mới
      setValue(inputValue);
      handleQuantityChange(inputValue);
    }
  };
  return (
    <div>
      <StyledTextField
        id="outlined-number"
        label="Số lượng"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: 1,
          max: 999,
        }}
        value={value === null ? "" : value}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default AddQuantity;
