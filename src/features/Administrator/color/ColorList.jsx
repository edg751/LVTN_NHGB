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

const ColorList = () => {
  const [ColorList, setColorList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAllColorAdmin();

        setColorList(
          list.map((x) => ({
            color_id: x.color_id,
            color_code: x.color_code,
            color_name: x.color_name,
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
          Danh sách màu
        </Typography>
        <Link to="/admin/addColor">
          <Button variant="outlined">Thêm màu</Button>
        </Link>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã màu</TableCell>
              <TableCell>Tên màu</TableCell>
              <TableCell>Code màu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ColorList.map((color) => (
              <TableRow key={color.color_id}>
                <TableCell>{color.color_id}</TableCell>
                <TableCell>{color.color_name}</TableCell>
                <TableCell>{color.color_code}</TableCell>
                <Link to={`/admin/detailColor/${color.color_id}`}>
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

export default ColorList;
