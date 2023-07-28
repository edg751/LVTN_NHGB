import React, { useEffect, useState } from "react";

import axios from "axios";
import styled from "@emotion/styled";
import { Button, Checkbox, TextField, Typography } from "@mui/material";
import axiosClient from "api/axiosClient";
import { useLocation, useNavigate } from "react-router-dom";
import productApi from "api/productApi";
import categoryApi from "api/categoriesApi";

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

const DetailNotification = () => {
  const location = useLocation();
  const idNotification = location.pathname.split("/").pop();
  const [Content, setContent] = useState("");
  const [IsActive, setIsActive] = useState(0);
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setContent(event.target.value);
  };

  useEffect(() => {
    (async () => {
      try {
        const list = await axiosClient.get(
          `/api/notificationDetail?notification_id=${idNotification}`
        );
        console.log(list);
        setContent(list[0].notification_content);
        setIsActive(list[0].is_active);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axiosClient.post("/api/updateNotification", {
        content: Content,
        is_active: IsActive,
        notification_id: idNotification,
      });
      navigate("/admin/notificationList");
    } catch (error) {
      console.error(error); // Handle error if needed
    }
  };
  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setIsActive(1);
    } else {
      setIsActive(0);
    }
  };

  return (
    <FormContainer>
      <StyledForm>
        <Typography variant="h5" sx={{ marginBottom: "20px" }}>
          THÔNG BÁO CÓ ID : {idNotification}
        </Typography>

        <InputField
          label="Nội dung"
          value={Content}
          onChange={handleInputChange}
        />
        <div>
          Hiển thị
          <Checkbox
            checked={IsActive}
            onChange={handleCheckboxChange}
            color="primary"
          />
        </div>
        <ButtonContainer>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Cập nhật
          </Button>
        </ButtonContainer>
      </StyledForm>
    </FormContainer>
  );
};

export default DetailNotification;
