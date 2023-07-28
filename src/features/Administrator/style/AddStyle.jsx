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

const AddStyle = () => {
  const [styleName, setStyleName] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setStyleName(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosClient.post("/api/admin/add_style", {
        style_name: styleName,
      });
      console.log(response.data); // Log the response data if needed
      setStyleName(""); // Clear the input field
      navigate("/admin/styleList");
    } catch (error) {
      console.error(error); // Handle error if needed
    }
  };

  return (
    <FormContainer>
      <StyledForm>
        <Typography variant="h5" sx={{ marginBottom: "20px" }}>
          THÊM PHONG CÁCH
        </Typography>
        <InputField
          label="Tên phong cách"
          value={styleName}
          onChange={handleInputChange}
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

export default AddStyle;
