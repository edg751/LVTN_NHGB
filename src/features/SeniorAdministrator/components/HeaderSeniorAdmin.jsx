import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledAppBar = styled(AppBar)`
  z-index: 99999;
`;
function HeaderSeniorAdmin(props) {
  const isLoggedIn = !!localStorage.getItem("senior-admin");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin-senior/login");
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return null; // Không hiển thị component nếu chưa đăng nhập
  }
  let admin_name = JSON.parse(localStorage.getItem("senior-admin"));

  const handleLogout = () => {
    localStorage.removeItem("senior-admin");
    navigate("/admin-senior/login");
  };
  return (
    <StyledAppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" noWrap>
          Senior Admin Dashboard
        </Typography>
        <Box>
          <Typography>Xin chào {admin_name[0].user_name}</Typography>
          <Button sx={{ color: "white" }} onClick={handleLogout}>
            LOG OUT
          </Button>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}

export default HeaderSeniorAdmin;
