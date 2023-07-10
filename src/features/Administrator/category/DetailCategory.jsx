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

const DetailCategory = () => {
  const location = useLocation();
  const idCategory = location.pathname.split("/").pop();
  const [categoryName, setCategoryName] = useState("");

  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getDetailCategory(idCategory);
        // Lấy tất cả những sp và màu sắc và hình ảnh đại diện có số lượng >0
        console.log();
        setCategoryName(list[0].category_name);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axiosClient.post("/api/admin/update_category", {
        category_name: categoryName,
        category_id: idCategory,
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
          CHI TIẾT LOẠI SẢN PHẨM CÓ ID : {idCategory}
        </Typography>
        <InputField
          label="Tên loại sản phẩm"
          value={categoryName}
          onChange={handleInputChange}
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

export default DetailCategory;
