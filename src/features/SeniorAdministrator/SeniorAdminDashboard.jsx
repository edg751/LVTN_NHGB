import { Container, Toolbar, Typography } from "@mui/material";

import styled from "@emotion/styled";
import HeaderSeniorAdmin from "./components/HeaderSeniorAdmin";
import CategorySeniorAdmin from "./components/CategorySeniorAdmin";

const RootContainer = styled("div")`
  display: flex;
`;

const ContentContainer = styled(Container)`
  flex-grow: 1;
  padding: 24px;
`;

const SeniorAdminDashboard = () => {
  return (
    <RootContainer>
      {/* App bar */}
      <HeaderSeniorAdmin />
      {/* Drawer */}
      <CategorySeniorAdmin />

      {/* Main content */}
      <ContentContainer>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Trang quản trị
        </Typography>
      </ContentContainer>
    </RootContainer>
  );
};

export default SeniorAdminDashboard;
