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

const AddNotification = () => {
  const [Content, setContent] = useState("");
  const navigate = useNavigate();

  const handleInputChange2 = (event) => {
    setContent(event.target.value);
  };
  const employee = JSON.parse(localStorage.getItem("admin"));

  const handleSubmit = async () => {
    try {
      const response = await axiosClient.post("/api/addNotification", {
        content: Content,
        employee_id: employee[0].id_employee,
      });
      console.log(response.data); // Log the response data if needed
      navigate("/admin/notificationList");
    } catch (error) {
      console.error(error); // Handle error if needed
    }
  };

  return (
    <FormContainer>
      <StyledForm>
        <Typography variant="h5" sx={{ marginBottom: "20px" }}>
          THÊM THÔNG BÁO
        </Typography>

        <InputField
          label="Nội dung thông báo"
          value={Content}
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

export default AddNotification;
