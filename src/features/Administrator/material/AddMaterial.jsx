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

const AddMaterial = () => {
  const [materialName, setMaterialname] = useState("");

  const handleInputChange = (event) => {
    setMaterialname(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosClient.post("/api/admin/add_material", {
        material_name: materialName,
      });
      console.log(response.data); // Log the response data if needed
      setMaterialname(""); // Clear the input field
    } catch (error) {
      console.error(error); // Handle error if needed
    }
  };

  return (
    <FormContainer>
      <StyledForm>
        <Typography variant="h5" sx={{ marginBottom: "20px" }}>
          THÊM LOẠI VẢI
        </Typography>
        <InputField
          label="Tên loại vải"
          value={materialName}
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

export default AddMaterial;
