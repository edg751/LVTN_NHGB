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

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAllCategoryAdmin();

        setCategoryList(
          list.map((x) => ({
            category_id: x.category_id,
            category_name: x.category_name,
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
          Danh sách loại sản phẩm
        </Typography>
        <Link to="/admin/addCategory">
          <Button variant="outlined">Thêm loại sản phẩm</Button>
        </Link>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã loại</TableCell>
              <TableCell>Tên loại</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryList.map((category) => (
              <TableRow key={category.category_id}>
                <TableCell>{category.category_id}</TableCell>
                <TableCell>{category.category_name}</TableCell>
                <Link to={`/admin/detailCategory/${category.category_id}`}>
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

export default CategoryList;
