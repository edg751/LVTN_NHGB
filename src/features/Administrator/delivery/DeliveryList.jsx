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
import adminApi from "api/adminApi";
import { Link } from "react-router-dom";
import HeaderAdminPage from "../components/HeaderAdminPage";
import CategoryAdminPage from "../components/CategoryAdminPage";
import styled from "@emotion/styled";
import orderApi from "api/orderApi";

const RootContainer = styled("div")`
  display: flex;
`;

const ContentContainer = styled(Container)`
  flex-grow: 1;
  padding: 24px;
`;

function DeliveryList(props) {
  const [deliveryList, setDeliveryList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await orderApi.getDeliveryList();
        setDeliveryList(
          list.map((x) => ({
            order_id: x.order_id,
            total_price: x.total_price,
            payment_method_id: x.payment_method_id,
            name: x.name,
            address: x.address,
            phone_number: x.phone_number,
            delevery_status: x.delevery_status,
            delivery_id: x.delivery_id,
          }))
        );
        console.log(list);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);

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
            DANH SÁCH ĐƠN HÀNG VẬN CHUYỂN
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã đơn hàng</TableCell>
                <TableCell>Giá đơn hàng</TableCell>
                <TableCell>Phương thức thanh toán</TableCell>
                <TableCell>Tên người nhận</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Sdt</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveryList.map((delivery) => (
                <TableRow key={delivery.order_id}>
                  <TableCell>{delivery.order_id}</TableCell>
                  <TableCell>{delivery.total_price}</TableCell>
                  <TableCell>
                    {delivery.payment_method_id === 1
                      ? "Thanh toán khi nhận hàng (COD)"
                      : delivery.payment_method_id === 2
                      ? "Thanh toán qua VNPAY"
                      : ""}
                  </TableCell>
                  <TableCell>{delivery.name}</TableCell>
                  <TableCell>{delivery.address}</TableCell>
                  <TableCell>{delivery.phone_number}</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {delivery.delevery_status === 0 && "Đang xử lý"}
                    {delivery.delevery_status === 1 && "Đang vận chuyển"}
                    {delivery.delevery_status === 2 && "Đã giao"}
                    {delivery.delevery_status === 3 && "Hoàn trả"}
                  </TableCell>

                  <TableCell>
                    <Link to={`/admin/deliverydetail/${delivery.delivery_id}`}>
                      {" "}
                      <Button
                        variant="outlined"
                        //   onClick={() => handleDetail(order.id)}
                      >
                        Cập nhật trạng thái
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

export default DeliveryList;
