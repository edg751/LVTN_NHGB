import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import dayjs from "dayjs";
import { Axios } from "axios";
import axiosClient from "api/axiosClient";

const FeedBack = () => {
  const location = useLocation();
  const { order_id } = queryString.parse(location.search);
  const [orderItems, setOrderItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await axiosClient.get(`/api/feedback?orderid=${order_id}`);
        setOrderItems(
          list.map((x) => ({
            id_product: x.id_product,
            product_name: x.product_name,
            size_name: x.size_name,
            color_name: x.color_name,
            quantity: x.quantity,
            promotion_price_order: x.promotion_price_order,
          }))
        );
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const list = await axiosClient.get(
          `/api/feedback_address?orderid=${order_id}`
        );
        setOrders(
          list.map((x) => ({
            name: x.name,
            address: x.address,
            phone_number: x.phone_number,
            order_date: x.order_date,
            payment_method_id: x.payment_method_id,
            payment_status: x.payment_status,
          }))
        );
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);

  const totalAmount = orderItems.reduce(
    (total, item) => total + item.promotion_price_order * item.quantity,
    0
  );

  return (
    <Container maxWidth="md" sx={{ marginTop: "50px", marginBottom: "50px" }}>
      <Box mt={4} mb={2}>
        <Typography variant="h4" align="center">
          Cảm ơn bạn đã mua hàng!
        </Typography>
      </Box>

      <Typography variant="h6" mt={4} mb={2}>
        Thông tin đơn hàng:
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Màu sắc</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Giá</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.product_name}</TableCell>
                <TableCell>{item.size_name}</TableCell>
                <TableCell>{item.color_name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  {" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.promotion_price_order)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} align="right">
                Tổng giá trị:
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "20px" }}>
                {" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalAmount)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* INFOMATION */}
      <TableContainer>
        <Typography variant="h6" mt={4} mb={2}>
          Thông tin nhận hàng:
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>SĐT</TableCell>
              <TableCell>Ngày đặt</TableCell>
              <TableCell>Phương thức thanh toán</TableCell>
              <TableCell>Trạng thái thanh toán</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.phone_number}</TableCell>
                <TableCell>
                  {" "}
                  {dayjs(order.order_date).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>
                  {order.payment_method_id === 1 ? "COD" : "VNPAY"}
                </TableCell>
                <TableCell>
                  {order.payment_status === 0
                    ? "Chưa thanh toán"
                    : "Đã thanh toán"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default FeedBack;
