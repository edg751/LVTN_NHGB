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
import productApi from "api/productApi";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategorySeniorAdmin from "../components/CategorySeniorAdmin";
import HeaderSeniorAdmin from "../components/HeaderSeniorAdmin";
import axiosClient from "api/axiosClient";
import dayjs from "dayjs";

const RootContainer = styled("div")`
  display: flex;
`;

const ContentContainer = styled(Container)`
  flex-grow: 1;
  padding: 24px;
`;

function EmployeeList() {
  const navigate = useNavigate();
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await axiosClient.get("/api/employee_list");
        // Lấy tất cả những sp và màu sắc và hình ảnh đại diện có số lượng >0

        setEmployeeList(
          list.map((x) => ({
            id_employee: x.id_employee,
            full_name: x.full_name,
            address: x.address,
            phone_number: x.phone_number,
            email: x.email,
            is_active: x.is_active,
          }))
        );
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);
  const handleEdit = (productId) => {
    navigate(`/admin/senior-admin/detailEmployee/${productId}`);
  };

  return (
    <RootContainer>
      {/* App bar */}
      <HeaderSeniorAdmin />
      {/* Drawer */}
      <CategorySeniorAdmin />

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
            DANH SÁCH NHÂN VIÊN
          </Typography>
          <Link to="/admin/senior-admin/addEmployee">
            <Button variant="outlined">Thêm nhân viên</Button>
          </Link>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã nhân viên</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Hoạt động</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeList.map((employee) => (
                <TableRow key={employee.id_employee}>
                  <TableCell>{employee.id_employee}</TableCell>
                  <TableCell>{employee.full_name}</TableCell>
                  <TableCell>{employee.address}</TableCell>
                  <TableCell>{employee.phone_number}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    {employee.is_active === 1 ? "Hoạt động" : "Không hoạt động"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleEdit(employee.id_employee)}
                      sx={{ marginRight: "20px" }}
                    >
                      Chi tiết
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

export default EmployeeList;
