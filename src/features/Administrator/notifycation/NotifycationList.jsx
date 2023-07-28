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
import axiosClient from "api/axiosClient";
import dayjs from "dayjs";
const RootContainer = styled("div")({
  margin: "16px",
});

const ContentContainer = styled(Container)`
  flex-grow: 1;
  padding: 24px;
`;

const NotificationList = () => {
  const [NotificationList, setNotificationList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await axiosClient.get("/api/notificationList");

        setNotificationList(
          list.map((x) => ({
            notification_id: x.notification_id,
            notification_content: x.notification_content,
            notification_date: x.notification_date,
            is_active: x.is_active,
            id_employee: x.id_employee,
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
          Danh sách thông báo
        </Typography>
        <Link to="/admin/addNotification">
          <Button variant="outlined">Thêm thông báo</Button>
        </Link>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã thông báo</TableCell>
              <TableCell>Nội dung</TableCell>
              <TableCell>Ngày thêm</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Mã nhân viên thêm</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {NotificationList.map((notification) => (
              <TableRow key={notification.notification_id}>
                <TableCell>{notification.notification_id}</TableCell>
                <TableCell>{notification.notification_content}</TableCell>
                <TableCell>
                  {" "}
                  {dayjs(notification.notification_date).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>
                  {notification.is_active === 0 ? "Đang ẩn" : "Đang hiện"}
                </TableCell>
                <TableCell>{notification.id_employee}</TableCell>

                <Link
                  to={`/admin/detailNotification/${notification.notification_id}`}
                >
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

export default NotificationList;
