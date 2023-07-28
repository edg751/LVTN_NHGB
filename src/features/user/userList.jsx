import styled from "@emotion/styled";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axiosClient from "api/axiosClient";
import dayjs from "dayjs";
import CategoryAdminPage from "features/Administrator/components/CategoryAdminPage";
import HeaderAdminPage from "features/Administrator/components/HeaderAdminPage";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RootContainer = styled("div")`
  display: flex;
`;

const ContentContainer = styled(Container)`
  flex-grow: 1;
  padding: 24px;
`;

function UserList() {
  const navigate = useNavigate();
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    fetchCustomerList();
  }, []);

  const fetchCustomerList = async () => {
    try {
      const list = await axiosClient.get("/api/customer_list");
      setCustomerList(
        list.map((x) => ({
          user_id: x.user_id,
          email: x.email,
          full_name: x.full_name,
          is_active: x.is_active,
        }))
      );
    } catch (error) {
      console.log("Error to fetch customer list", error);
    }
  };

  const handleEdit = async (userId, status) => {
    try {
      await axiosClient.get(
        `/api/customer_disable?id=${userId}&status=${status}`
      );
      fetchCustomerList();
    } catch (error) {
      console.log("Error to disable customer", error);
    }
  };

  return (
    <RootContainer>
      {/* App bar */}
      <HeaderAdminPage />
      {/* Drawer */}
      <CategoryAdminPage />

      {/* Main content */}
      <ContentContainer>
        <div>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            mt={3}
            mb={4}
            sx={{ marginTop: "60px" }}
          >
            DANH SÁCH KHÁCH HÀNG
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã khách hàng</TableCell>
                <TableCell>Tên khách hàng</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customerList.map((promotion) => (
                <TableRow key={promotion.user_id}>
                  <TableCell>{promotion.user_id}</TableCell>
                  <TableCell>{promotion.full_name}</TableCell>
                  <TableCell>{promotion.email}</TableCell>
                  <TableCell>
                    {promotion.is_active === 1 ? "Hoạt động" : "Vô hiệu hóa"}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        handleEdit(promotion.user_id, promotion.is_active)
                      }
                      sx={{ marginRight: "20px" }}
                    >
                      {promotion.is_active === 1 ? "Vô hiệu hóa" : "Kích hoạt"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ContentContainer>
    </RootContainer>
  );
}

export default UserList;
