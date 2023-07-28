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
  Box,
} from "@mui/material";
import adminApi from "api/adminApi";
import { Link } from "react-router-dom";
import HeaderAdminPage from "../components/HeaderAdminPage";
import CategoryAdminPage from "../components/CategoryAdminPage";
import styled from "@emotion/styled";
import FilterOrder from "../filter/FilterOrder";
import dayjs from "dayjs";
OderList.propTypes = {};
const RootContainer = styled("div")`
  display: flex;
`;

const ContentContainer = styled(Container)`
  flex-grow: 1;
  padding: 24px;
`;

function OderList(props) {
  const [oderList, setOrderList] = useState([]);
  const [filterOrder, setFilterOrder] = useState("");
  const [filter2, setFilter2] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const list = await adminApi.getOrderListWait(filterOrder, filter2);
        setOrderList(
          list.map((x) => ({
            order_id: x.order_id,
            user_id: x.user_id,
            order_date: x.order_date,
            total_price: x.total_price,
            payment_method_id: x.payment_method_id,
            order_status: x.order_status,
          }))
        );
        console.log(list);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, [filterOrder, filter2]);

  return (
    <RootContainer>
      {/* App bar */}
      <HeaderAdminPage />
      {/* Drawer */}
      <CategoryAdminPage />

      {/* Main content */}
      <ContentContainer>
        <div>
          <Typography variant="h5" sx={{ marginTop: "60px" }}>
            DANH SÁCH ĐƠN HÀNG CHỜ DUYỆT
          </Typography>
          <Box>
            <Button variant="outlined" onClick={() => setFilter2(0)}>
              Đơn hàng chờ duyệt
            </Button>
            <Button onClick={() => setFilter2(1)} variant="outlined">
              Đơn hàng đã duyệt
            </Button>
            <Button onClick={() => setFilter2(2)} variant="outlined">
              Đơn hàng đã từ chối
            </Button>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã đơn hàng</TableCell>
                <TableCell>Mã khách hàng</TableCell>
                <TableCell>Tổng giá trị</TableCell>
                <TableCell>Phương thức thanh toán</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Trạng thái</TableCell>

                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {oderList.map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>{order.user_id}</TableCell>
                  <TableCell>{order.total_price}</TableCell>
                  <TableCell>
                    {order.payment_method_id === 1
                      ? "Thanh toán khi nhận hàng"
                      : order.payment_method_id === 2
                      ? "VNPAY"
                      : ""}
                  </TableCell>

                  <TableCell>
                    {dayjs(order.order_date).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell>
                    {order.order_status == 0
                      ? "Đơn hàng chờ duyệt"
                      : order.order_status == 1
                      ? "Đơn hàng đã duyệt"
                      : "Đơn hàng không được duyệt"}
                  </TableCell>

                  <TableCell>
                    <Link to={`/admin/oderdetail/${order.order_id}`}>
                      {" "}
                      <Button
                        variant="outlined"
                        //   onClick={() => handleDetail(order.id)}
                      >
                        Chi tiết
                      </Button>
                    </Link>
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

export default OderList;
