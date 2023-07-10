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

const StyledTable = styled(Table)({
  marginTop: "16px",
});
const ContentContainer = styled(Container)`
  flex-grow: 1;
  padding: 24px;
`;

const categories = [
  { category_id: 1, category_name: "Category 1" },
  { category_id: 2, category_name: "Category 2" },
  { category_id: 3, category_name: "Category 3" },
];

const StyleList = () => {
  const [styleList, setStyleList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAllStyleAdmin();

        setStyleList(
          list.map((x) => ({
            style_id: x.style_id,
            style_name: x.style_name,
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
          Danh sách phong cách
        </Typography>
        <Link to="/admin/addStyle">
          <Button variant="outlined">Thêm phong cách</Button>
        </Link>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã loại</TableCell>
              <TableCell>Tên loại</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {styleList.map((style) => (
              <TableRow key={style.style_id}>
                <TableCell>{style.style_id}</TableCell>
                <TableCell>{style.style_name}</TableCell>
                <Link to={`/admin/detailStyle/${style.style_id}`}>
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

export default StyleList;
