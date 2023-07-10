import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { AppBar, Toolbar, Typography } from "@mui/material";

const StyledAppBar = styled(AppBar)`
  z-index: 1;
`;
function HeaderAdminPage(props) {
  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap>
          Admin Dashboard
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
}

export default HeaderAdminPage;
