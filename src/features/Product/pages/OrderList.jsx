import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import axiosClient from "api/axiosClient";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const getUserIdFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const userId = user.user_id;
      return userId;
    }
    return null;
  };

  const userId = getUserIdFromLocalStorage();

  useEffect(() => {
    (async () => {
      try {
        const list = await axiosClient.get(`/api/list_order?user_id=${userId}`);
        setOrders(
          list.map((x) => ({
            order_id: x.order_id,
            name: x.name,
            address: x.address,
            phone_number: x.phone_number,
            order_date: x.order_date,
            order_status: x.order_status,
            payment_status: x.payment_status,
            payment_method_id: x.payment_method_id,
            total_price: x.total_price,
            delevery_status: x.delevery_status,
          }))
        );
        console.log("list", list);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên người nhận</TableCell>
            <TableCell>Địa chỉ</TableCell>
            <TableCell>SDT</TableCell>
            <TableCell>Ngày đặt</TableCell>
            <TableCell>Trạng thái đơn hàng</TableCell>
            <TableCell>Trạng thái thanh toán</TableCell>
            <TableCell>Phương thức thanh toán</TableCell>
            <TableCell>Giá trị đơn hàng</TableCell>
            <TableCell>Trạng thái giao hàng</TableCell>
            <TableCell>Chức năng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.order_id}>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell>{order.phone_number}</TableCell>
              <TableCell>
                {" "}
                {dayjs(order.order_date).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell>
                {order.order_status === "1" ? "Duyệt" : "Chưa duyệt"}
              </TableCell>
              <TableCell>
                {order.payment_status === 0
                  ? "Chưa thanh toán"
                  : "Đã thanh toán"}
              </TableCell>
              <TableCell>
                {order.payment_method_id === 1 ? "COD" : "VNPAY"}
              </TableCell>
              <TableCell>
                {" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(order.total_price)}
              </TableCell>
              <TableCell>
                {order.delevery_status === 0
                  ? "Đang chuẩn bị"
                  : order.delevery_status === 1
                  ? "Đang vận chuyển"
                  : order.delevery_status === 2
                  ? "Đã giao"
                  : order.delevery_status === 3
                  ? "Hoàn trả"
                  : ""}
              </TableCell>
              <TableCell>
                <Link to={`/feedback?order_id=${order.order_id}`}>
                  <Button>Xem</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderList;
