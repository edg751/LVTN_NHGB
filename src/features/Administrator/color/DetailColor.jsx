import React, { useEffect, useState } from "react";

import axios from "axios";
import styled from "@emotion/styled";
import { Button, TextField, Typography } from "@mui/material";
import axiosClient from "api/axiosClient";
import { useLocation } from "react-router-dom";
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

const DetailColor = () => {
  const location = useLocation();
  const icColor = location.pathname.split("/").pop();
  const [colorName, setColorName] = useState("");
  const [colorCode, setColorCode] = useState("");

  const handleInputChange = (event) => {
    setColorName(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setColorCode(event.target.value);
  };
  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getDetailColor(icColor);
        console.log(list);
        setColorName(list[0].color_name);
        setColorCode(list[0].color_code);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axiosClient.post("/api/admin/update_color", {
        color_name: colorName,
        color_code: colorCode,
        color_id: icColor,
      });
      console.log(response.data); // Log the response data if needed
      setColorName(""); // Clear the input field
    } catch (error) {
      console.error(error); // Handle error if needed
    }
  };

  return (
    <FormContainer>
      <StyledForm>
        <Typography variant="h5" sx={{ marginBottom: "20px" }}>
          CHI TIẾT MÀU CÓ ID : {icColor}
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
            Cập nhật
          </Button>
        </ButtonContainer>
      </StyledForm>
    </FormContainer>
  );
};

export default DetailColor;
