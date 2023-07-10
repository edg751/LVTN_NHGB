import React, { useState } from "react";

import axios from "axios";
import styled from "@emotion/styled";
import { Button, TextField, Typography } from "@mui/material";
import axiosClient from "api/axiosClient";

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

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");

  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosClient.post("/api/admin/add_category", {
        category_name: categoryName,
      });
      console.log(response.data); // Log the response data if needed
      setCategoryName(""); // Clear the input field
    } catch (error) {
      console.error(error); // Handle error if needed
    }
  };

  return (
    <FormContainer>
      <StyledForm>
        <Typography variant="h5" sx={{ marginBottom: "20px" }}>
          THÊM LOẠI SẢN PHẨM
        </Typography>
        <InputField
          label="Tên loại sản phẩm"
          value={categoryName}
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

export default AddCategory;
