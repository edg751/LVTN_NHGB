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
function CategoryAdminPage(props) {
  return (
    <StyledDrawer variant="permanent">
      <Toolbar />
      <DrawerContainer>
        <List>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <Link to="/admin/order">
            <ListItem button>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý đơn hàng" />
            </ListItem>
          </Link>

          <Link to="/admin/productList">
            <ListItem button>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý sản phẩm" />
            </ListItem>
          </Link>

          <Link to="/admin/categoryList">
            <ListItem button>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý danh mục sản phẩm" />
            </ListItem>
          </Link>

          <Link to="/admin/styleList">
            <ListItem button>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý phong cách" />
            </ListItem>
          </Link>

          <Link to="/admin/materialList">
            <ListItem button>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý vật liệu" />
            </ListItem>
          </Link>

          <Link to="/">
            <ListItem button>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý giao hàng" />
            </ListItem>
          </Link>

          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>
        </List>
      </DrawerContainer>
    </StyledDrawer>
  );
}

export default CategoryAdminPage;
