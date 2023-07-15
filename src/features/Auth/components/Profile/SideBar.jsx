import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";

const SidebarWrapper = styled.div`
  width: 250px;
`;

function Sidebar() {
  return (
    <SidebarWrapper>
      <List component="nav">
        <ListItem button>
          <ListItemIcon></ListItemIcon>
          <ListItemText primary="Xem trạng thái đơn hàng" />
        </ListItem>
        <ListItem button>
          <ListItemIcon></ListItemIcon>
          <ListItemText primary="Quản lý địa chỉ" />
        </ListItem>
      </List>
    </SidebarWrapper>
  );
}
export default Sidebar;
