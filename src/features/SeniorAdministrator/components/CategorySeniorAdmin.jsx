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

function CategorySeniorAdmin(props) {
  return (
    <StyledDrawer variant="permanent">
      <Toolbar />
      <DrawerContainer>
        <List>
          <StyledLink to="/admin/senior-admin/statistical">
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Thống kê" />
            </ListItem>
          </StyledLink>

          <StyledLink to="/admin/senior-admin/promotion">
            <ListItem button>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý khuyến mãi" />
            </ListItem>
          </StyledLink>
          <StyledLink to="/admin/senior-admin/employee">
            <ListItem button>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý nhân viên" />
            </ListItem>
          </StyledLink>
        </List>
      </DrawerContainer>
    </StyledDrawer>
  );
}

export default CategorySeniorAdmin;
