import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledAppBar = styled(AppBar)`
  z-index: 99999;
`;
function HeaderAdminPage(props) {
  const isLoggedIn = !!localStorage.getItem("admin");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin/login");
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return null; // Không hiển thị component nếu chưa đăng nhập
  }
  let admin_name = JSON.parse(localStorage.getItem("admin"));

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };
  return (
    <StyledAppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" noWrap>
          Admin Dashboard
        </Typography>
        <Box>
          <Typography>Xin chào {admin_name[0].full_name}</Typography>
          <Button sx={{ color: "white" }} onClick={handleLogout}>
            LOG OUT
          </Button>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}

export default HeaderAdminPage;
