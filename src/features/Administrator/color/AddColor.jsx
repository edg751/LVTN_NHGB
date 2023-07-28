import React, { useState } from "react";

import axios from "axios";
import styled from "@emotion/styled";
import { Button, TextField, Typography } from "@mui/material";
import axiosClient from "api/axiosClient";
import { useNavigate } from "react-router-dom";

const FormContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
});

const InputField = styled(TextField)({
  marginBottom: "16px",
});

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const AddColor = () => {
  const [colorName, setColorName] = useState("");
  const [colorCode, setColorCode] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setColorName(event.target.value);
  };
  const handleInputChange2 = (event) => {
    setColorCode(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosClient.post("/api/admin/add_color", {
        color_name: colorName,
        color_code: colorCode,
      });
      console.log(response.data); // Log the response data if needed
      setColorName(""); // Clear the input field
      navigate("/admin/colorList");
    } catch (error) {
      console.error(error); // Handle error if needed
    }
  };

  return (
    <FormContainer>
      <StyledForm>
        <Typography variant="h5" sx={{ marginBottom: "20px" }}>
          THÊM MÀU
        </Typography>

        <InputField
          label="Tên màu"
          value={colorName}
          onChange={handleInputChange}
        />

        <InputField
          label="Mã màu"
          value={colorCode}
          onChange={handleInputChange2}
        />

        <ButtonContainer>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Thêm
          </Button>
        </ButtonContainer>
      </StyledForm>
    </FormContainer>
  );
};

export default AddColor;
