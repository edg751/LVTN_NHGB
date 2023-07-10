import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Container,
  Typography,
} from "@mui/material";
import productApi from "api/productApi";
import { Link, useNavigate } from "react-router-dom";
import HeaderAdminPage from "../components/HeaderAdminPage";
import CategoryAdminPage from "../components/CategoryAdminPage";
import styled from "@emotion/styled";

const RootContainer = styled("div")`
  display: flex;
`;

const ContentContainer = styled(Container)`
  flex-grow: 1;
  padding: 24px;
`;

function ProductList() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await productApi.getProductListAdmin();
        // Lấy tất cả những sp và màu sắc và hình ảnh đại diện có số lượng >0

        setProductList(
          list.map((x) => ({
            id: x.id_product,
            name: x.product_name,
            price: x.price,
          }))
        );
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);
  const handleEdit = (productId) => {
    // Xử lý sự kiện chỉnh sửa sản phẩm
    navigate(`/admin/productDetail/${productId}`);
  };

  return (
    <RootContainer>
      {/* App bar */}
      <HeaderAdminPage />
      {/* Drawer */}
      <CategoryAdminPage />

      {/* Main content */}
      <ContentContainer>
        <div>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            mt={3}
            mb={4}
            sx={{ marginTop: "60px" }}
          >
            DANH SÁCH SẢN PHẨM
          </Typography>
          <Link to="/admin/addProduct">
            <Button variant="outlined">Thêm sản phẩm</Button>
          </Link>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã SP</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Giá tiền</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productList.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleEdit(product.id)}
                      sx={{ marginRight: "20px" }}
                    >
                      Chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ContentContainer>
    </RootContainer>
  );
}

export default ProductList;
