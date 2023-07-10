import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
} from "@mui/material";
import adminApi from "api/adminApi";
import styled from "@emotion/styled";
import HeaderAdminPage from "../components/HeaderAdminPage";
import CategoryAdminPage from "../components/CategoryAdminPage";
import axiosClient from "api/axiosClient";

OrderDetail.propTypes = {};
const RootContainer = styled("div")`
  display: flex;
`;

const ContentContainer = styled(Container)`
  flex-grow: 1;
  padding: 24px;
`;

function OrderDetail(props) {
  const location = useLocation();
  const idProduct = location.pathname.split("/").pop();
  //http://localhost:3500/api/admin/order_detail?orderid=8
  const [orderDetail, setOrderDetail] = useState([]);
  const [orderInfo, setOrderInfo] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await adminApi.gerOderDetail(idProduct);
        setOrderDetail(
          list.map((x) => ({
            id_product: x.id_product,
            color: x.color_name,
            size: x.size_name,
            quantity: x.quantity,
          }))
        );
        console.log(list);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const list = await adminApi.getOderInfo(idProduct);
        setOrderInfo(
          list.map((x) => ({
            id: x.order_id,
            paymentMethod: x.payment_method_id,
            totalAmount: x.total_price,
            status: x.order_status,
            name: x.name,
            address: x.address,
            numberphone: x.phone_number,
          }))
        );
        console.log(list);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);

  function getOrderStatus(status) {
    if (status == 0) {
      return "Chờ duyệt";
    } else if (status === 1) {
      return "Hoàn thành";
    } else {
      return "Khác";
    }
  }

  function getPaymentMethod(paymentMethod) {
    if (paymentMethod === 1) {
      return "Thanh toán khi nhận hàng (COD)";
    } else if (paymentMethod === 2) {
      return "PayPal";
    } else if (paymentMethod === 3) {
      return "Credit Card";
    } else {
      return "Khác";
    }
  }

  const handleDuyetClick = async () => {
    try {
      let orderid = idProduct;
      console.log(orderid);
      const response = await axiosClient.post("/api/admin/update_order", {
        orderid: orderid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleKhongDuyetClick = async () => {
    try {
      let orderid = idProduct;
      console.log(orderid);
      const response = await axiosClient.post("/api/admin/update_order_2", {
        orderid: orderid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RootContainer>
      {/* App bar */}
      <HeaderAdminPage />
      {/* Drawer */}
      <CategoryAdminPage />

      {/* Main content */}
      <ContentContainer sx={{ marginTop: "60px" }}>
        <div>
          <h2>Danh sách đơn hàng</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID Sản phẩm</TableCell>
                  <TableCell>Màu sắc</TableCell>
                  <TableCell>Kích thước</TableCell>
                  <TableCell>Số lượng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderDetail.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.id_product}</TableCell>
                    <TableCell>{item.color}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <h2>Thông tin đơn hàng</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>

                  <TableCell>Phương thức thanh toán</TableCell>
                  <TableCell>Tổng giá</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Địa chỉ</TableCell>
                  <TableCell>Số điện thoại</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderInfo.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>

                    <TableCell>
                      {getPaymentMethod(item.paymentMethod)}
                    </TableCell>
                    <TableCell>{item.totalAmount}</TableCell>
                    <TableCell>{getOrderStatus(item.status)}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>{item.numberphone}</TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginRight: "20px" }}
                        onClick={handleDuyetClick}
                      >
                        Duyệt
                      </Button>

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleKhongDuyetClick}
                      >
                        Không duyệt
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </ContentContainer>
    </RootContainer>
  );
}

export default OrderDetail;
