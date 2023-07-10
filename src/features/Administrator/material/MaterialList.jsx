import React, { useEffect, useState } from "react";

import styled from "@emotion/styled";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import categoryApi from "api/categoriesApi";
import HeaderAdminPage from "../components/HeaderAdminPage";
import CategoryAdminPage from "../components/CategoryAdminPage";

const RootContainer = styled("div")({
  margin: "16px",
});

const ContentContainer = styled(Container)`
  flex-grow: 1;
  padding: 24px;
`;

const MaterialList = () => {
  const [materialList, setMaterialList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAllMaterialAdmin();

        setMaterialList(
          list.map((x) => ({
            material_id: x.material_id,
            material_name: x.material_name,
          }))
        );
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);
  return (
    <RootContainer>
      <HeaderAdminPage />
      {/* Drawer */}
      <CategoryAdminPage />
      <ContentContainer>
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{ marginTop: "60px" }}
        >
          Danh sách loại vải
        </Typography>
        <Link to="/admin/addMaterial">
          <Button variant="outlined">Thêm loại vải</Button>
        </Link>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã loại</TableCell>
              <TableCell>Tên loại</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materialList.map((material) => (
              <TableRow key={material.material_id}>
                <TableCell>{material.material_id}</TableCell>
                <TableCell>{material.material_name}</TableCell>
                <Link to={`/admin/detailMaterial/${material.material_id}`}>
                  <Button variant="outlined">Chi tiết</Button>
                </Link>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ContentContainer>
    </RootContainer>
  );
};

export default MaterialList;
