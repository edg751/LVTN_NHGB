import { Container, Toolbar, Typography } from "@mui/material";

import styled from "@emotion/styled";
import Header from "./components/CategoryAdminPage";
import HeaderAdminPage from "./components/HeaderAdminPage";
import CategoryAdminPage from "./components/CategoryAdminPage";

const RootContainer = styled("div")`
  display: flex;
`;

const ContentContainer = styled(Container)`
  flex-grow: 1;
  padding: 24px;
`;

const AdminDashboard = () => {
  return (
    <RootContainer>
      {/* App bar */}
      <HeaderAdminPage />
      {/* Drawer */}
      <CategoryAdminPage />

      {/* Main content */}
      <ContentContainer>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Trang quản lý
        </Typography>
      </ContentContainer>
    </RootContainer>
  );
};

export default AdminDashboard;
