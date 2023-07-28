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
import productApi from "api/productApi";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CategorySeniorAdmin from "../components/CategorySeniorAdmin";
import HeaderSeniorAdmin from "../components/HeaderSeniorAdmin";
import axiosClient from "api/axiosClient";

const RootContainer = styled("div")`
  display: flex;
`;

const ContentContainer = styled(Container)`
  flex-grow: 1;
  padding: 24px;
`;

function ProductListPromotion() {
  const [promotionList, setPromotionList] = useState([]);
  const location = useLocation();
  const idPM = location.pathname.split("/").pop();

  useEffect(() => {
    (async () => {
      try {
        const list = await axiosClient.get(
          `/api/senior-admin/list-product-promotion?promotion_id=${idPM}`
        );
        // Lấy tất cả những sp và màu sắc và hình ảnh đại diện có số lượng >0

        setPromotionList(
          list.map((x) => ({
            id_product: x.id_product,
            product_name: x.product_name,
            price: x.price,
            promotion_price: x.promotion_price,
          }))
        );
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);

  const handleEdit = async (productId) => {
    console.log("id SP", productId);
    console.log("Mã KM", idPM);
    let data = {};
    data.id_PM = idPM;
    data.id_product = productId;

    let response = await axiosClient.post(
      "/api/senior-admin/remove-product-promotion",
      data
    );
    const updatedList = promotionList.filter(
      (product) => product.id_product !== productId
    );
    setPromotionList(updatedList);
  };

  return (
    <RootContainer>
      {/* App bar */}
      <HeaderSeniorAdmin />
      {/* Drawer */}
      <CategorySeniorAdmin />

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
            DANH SÁCH SẢN PHẨM ĐƯỢC KHUYẾN MÃI
          </Typography>
          <Link to={`/admin/senior-admin/addProductListPromotion/${idPM}`}>
            <Button variant="outlined">Thêm sản phẩm</Button>
          </Link>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã sản phẩm</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Giá gốc</TableCell>
                <TableCell>Giá khuyến mãi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {promotionList.map((promotion) => (
                <TableRow key={promotion.id_product}>
                  <TableCell>{promotion.id_product}</TableCell>
                  <TableCell>{promotion.product_name}</TableCell>
                  <TableCell>{promotion.price}</TableCell>
                  <TableCell>{promotion.promotion_price}</TableCell>

                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleEdit(promotion.id_product)}
                      sx={{ marginRight: "20px" }}
                    >
                      Xóa
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

export default ProductListPromotion;
