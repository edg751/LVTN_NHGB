import React, { useState } from "react";

import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import AddAddress from "./AddAddress";
import ChangePassword from "./ChangePassword";
import Infomation from "./Infomation";
import OrderList from "./OrderList";

const Container = styled.div`
  display: flex;
  min-height: 600px;
  width: 1200px;
  margin: 30px auto;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #f5f5f5;
  padding: 16px;
`;

const Content = styled.div`
  flex: 1;
  padding: 16px;
`;

const Profile = () => {
  const [selectedItem, setSelectedItem] = useState("infomation");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const renderContent = () => {
    switch (selectedItem) {
      case "changePassword":
        return <ChangePassword />;
      case "addAddress":
        return <AddAddress />;
      case "infomation":
        return <Infomation />;
      case "orderList":
        return <OrderList />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Sidebar>
        <List component="nav">
          <ListItem
            button
            selected={selectedItem === "infomation"}
            onClick={() => handleItemClick("infomation")}
          >
            <ListItemText primary="Thông tin cá nhân" />
          </ListItem>
          <ListItem
            button
            selected={selectedItem === "changePassword"}
            onClick={() => handleItemClick("changePassword")}
          >
            <ListItemText primary="Đổi mật khẩu" />
          </ListItem>
          <ListItem
            button
            selected={selectedItem === "addAddress"}
            onClick={() => handleItemClick("addAddress")}
          >
            <ListItemText primary="Thêm địa chỉ" />
          </ListItem>
          <ListItem
            button
            selected={selectedItem === "orderList"}
            onClick={() => handleItemClick("orderList")}
          >
            <ListItemText primary="Đơn hàng" />
          </ListItem>
        </List>
      </Sidebar>
      <Content>{renderContent()}</Content>
    </Container>
  );
};

export default Profile;
