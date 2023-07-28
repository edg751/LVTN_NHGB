import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Button,
  Drawer,
} from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const StyledDrawer = styled(Drawer)`
  width: 240px;

  & .MuiDrawer-paper {
    width: 240px;
  }
`;
const DrawerContainer = styled("div")`
  overflow: auto;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

function CategoryAdminPage(props) {
  return (
    <StyledDrawer variant="permanent">
      <Toolbar />
      <DrawerContainer>
        <List>
          <StyledLink to="/admin/productList">
            <ListItem button>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý sản phẩm" />
            </ListItem>
          </StyledLink>

          <StyledLink to="/admin/categoryList">
            <ListItem button>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý danh mục sản phẩm" />
            </ListItem>
          </StyledLink>

          <StyledLink to="/admin/styleList">
            <ListItem button>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý phong cách" />
            </ListItem>
          </StyledLink>

          <StyledLink to="/admin/materialList">
            <ListItem button>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý vật liệu" />
            </ListItem>
          </StyledLink>

          <StyledLink to="/admin/colorList">
            <ListItem button>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý màu sắc" />
            </ListItem>
          </StyledLink>

          <StyledLink to="/admin/order">
            <ListItem button>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý đơn hàng" />
            </ListItem>
          </StyledLink>

          <StyledLink to="/admin/delivery">
            <ListItem button>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý giao hàng" />
            </ListItem>
          </StyledLink>

          <StyledLink to="/admin/notificationList">
            <ListItem button>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý thông báo" />
            </ListItem>
          </StyledLink>
          <StyledLink to="/admin/userList">
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Customers" />
            </ListItem>
          </StyledLink>
        </List>
      </DrawerContainer>
    </StyledDrawer>
  );
}

export default CategoryAdminPage;
