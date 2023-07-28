import React, { useEffect, useState } from "react";

import axios from "axios";
import styled from "@emotion/styled";
import { Button, TextField, Typography } from "@mui/material";
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

const DetailMaterial = () => {
  const location = useLocation();
  const idMaterial = location.pathname.split("/").pop();
  const [materialName, setMaterialnName] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setMaterialnName(event.target.value);
  };

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getDetailMaterial(idMaterial);
        // Lấy tất cả những sp và màu sắc và hình ảnh đại diện có số lượng >0
        console.log();
        setMaterialnName(list[0].material_name);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axiosClient.post("/api/admin/update_material", {
        material_name: materialName,
        material_id: idMaterial,
      });
      console.log(response.data); // Log the response data if needed
      setMaterialnName(""); // Clear the input field
      navigate("/admin/materialList");
    } catch (error) {
      console.error(error); // Handle error if needed
    }
  };

  return (
    <FormContainer>
      <StyledForm>
        <Typography variant="h5" sx={{ marginBottom: "20px" }}>
          CHI TIẾT LOẠI VẢI CÓ ID : {idMaterial}
        </Typography>
        <InputField
          label="Tên loại sản phẩm"
          value={materialName}
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

export default DetailMaterial;
