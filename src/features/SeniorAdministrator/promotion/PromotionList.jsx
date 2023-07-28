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
import { Link, useNavigate } from "react-router-dom";
import CategorySeniorAdmin from "../components/CategorySeniorAdmin";
import HeaderSeniorAdmin from "../components/HeaderSeniorAdmin";
import axiosClient from "api/axiosClient";
import dayjs from "dayjs";

const RootContainer = styled("div")`
  display: flex;
`;

const ContentContainer = styled(Container)`
  flex-grow: 1;
  padding: 24px;
`;

function PromotionList() {
  const navigate = useNavigate();
  const [promotionList, setPromotionList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await axiosClient.get("/api/senior-admin/list-promotion");
        // Lấy tất cả những sp và màu sắc và hình ảnh đại diện có số lượng >0

        setPromotionList(
          list.map((x) => ({
            promotion_description: x.promotion_description,
            promotion_id: x.promotion_id,
            discount_percent: x.discount_percent,
            from_date: x.from_date,
            to_date: x.to_date,
          }))
        );
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);
  const handleEdit = (productId) => {
    navigate(`/admin/senior-admin/detailPromotion/${productId}`);
  };
  const handleEditDSSPKM = (productId) => {
    navigate(`/admin/senior-admin/ProductListPromotion/${productId}`);
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
            DANH SÁCH KHUYẾN MÃI
          </Typography>
          <Link to="/admin/senior-admin/addPromotion">
            <Button variant="outlined">Thêm khuyến mãi</Button>
          </Link>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã KM</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell>Phần trăm</TableCell>
                <TableCell>Từ ngày</TableCell>
                <TableCell>Đến ngày</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {promotionList.map((promotion) => (
                <TableRow key={promotion.promotion_id}>
                  <TableCell>{promotion.promotion_id}</TableCell>
                  <TableCell>{promotion.promotion_description}</TableCell>
                  <TableCell>{promotion.discount_percent}%</TableCell>
                  <TableCell>
                    {dayjs(promotion.from_date).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell>
                    {dayjs(promotion.to_date).format("YYYY-MM-DD")}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleEdit(promotion.promotion_id)}
                      sx={{ marginRight: "20px" }}
                    >
                      Chi tiết
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleEditDSSPKM(promotion.promotion_id)}
                      sx={{ marginRight: "20px" }}
                    >
                      DSSP khuyến mãi
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

export default PromotionList;
