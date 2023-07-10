import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Container,
  Typography,
} from "@mui/material";
import adminApi from "api/adminApi";
import { Link } from "react-router-dom";
import HeaderAdminPage from "../components/HeaderAdminPage";
import CategoryAdminPage from "../components/CategoryAdminPage";
import styled from "@emotion/styled";

OderList.propTypes = {};
const RootContainer = styled("div")`
  display: flex;
`;

const ContentContainer = styled(Container)`
  flex-grow: 1;
  padding: 24px;
`;

function OderList(props) {
  const [oderList, setOrderList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await adminApi.getOrderListWait();
        setOrderList(
          list.map((x) => ({
            order_id: x.order_id,
            user_id: x.user_id,
          }))
        );
        console.log(list);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);

  const sampleOrderList = [
    { id: 1, customerCode: "KH001" },
    { id: 2, customerCode: "KH002" },
    { id: 3, customerCode: "KH003" },
  ];

  return (
    <RootContainer>
      {/* App bar */}
      <HeaderAdminPage />
      {/* Drawer */}
      <CategoryAdminPage />

      {/* Main content */}
      <ContentContainer>
        <div>
          <Typography variant="h5" sx={{ marginTop: "60px" }}>
            DANH SÁCH ĐƠN HÀNG CHỜ DUYỆT
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Mã khách hàng</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {oderList.map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>{order.user_id}</TableCell>
                  <TableCell>
                    <Link to={`/admin/oderdetail/${order.order_id}`}>
                      {" "}
                      <Button
                        variant="outlined"
                        //   onClick={() => handleDetail(order.id)}
                      >
                        Chi tiết
                      </Button>
                    </Link>
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

export default OderList;
