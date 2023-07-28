import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import styled from "@emotion/styled";
import HeaderAdminPage from "../components/HeaderAdminPage";
import CategoryAdminPage from "../components/CategoryAdminPage";
import HeaderSeniorAdmin from "features/SeniorAdministrator/components/HeaderSeniorAdmin";
import CategorySeniorAdmin from "features/SeniorAdministrator/components/CategorySeniorAdmin";
import axiosClient from "api/axiosClient";

// Dữ liệu mẫu

const RootContainer = styled("div")`
  display: flex;
`;
const Statistical = () => {
  const [totalProducts, setTotalProducts] = useState("");
  const [totalRevenue, setTotalRevenue] = useState("");
  const [newOrders, setNewOrders] = useState("");
  const [totalCustomers, setTotalCustomers] = useState("");

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const [months, setMonth] = useState(month);
  const [years, setYear] = useState(year);
  const handlePreviousMonth = () => {
    if (months === 1) {
      setMonth(12);
      setYear((prevYear) => prevYear - 1);
    } else {
      setMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (months === 12) {
      setMonth(1);
      setYear((prevYear) => prevYear + 1);
    } else {
      setMonth((prevMonth) => prevMonth + 1);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const list = await axiosClient.get(
          `/api/getstatistical?month=${months}&year=${years}`
        );

        console.log(list);

        setTotalProducts(list[0].total_quantity ? list[0].total_quantity : "0");
        setTotalRevenue(list[0].total_price ? list[0].total_price : "0");
        setNewOrders(list[0].total_order);
        setTotalCustomers(list[0].total_user);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, [months, years]);
  return (
    <RootContainer>
      {/* App bar */}
      <HeaderSeniorAdmin />
      {/* Drawer */}
      <CategorySeniorAdmin />
      <Container maxWidth="md" sx={{ marginTop: "50px" }}>
        <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
          Thống kê bán quần áo tháng {months}/{years}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Tổng số sản phẩm đã bán</Typography>
                <Typography variant="h4" color="primary">
                  {totalProducts}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Doanh thu</Typography>
                <Typography variant="h4" color="primary">
                  {totalRevenue} VND
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Đơn hàng mới</Typography>
                <Typography variant="h4" color="primary">
                  {newOrders}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Tổng số khách hàng</Typography>
                <Typography variant="h4" color="primary">
                  {totalCustomers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Button
            sx={{ width: "300px", margin: "20px 60px" }}
            variant="outlined"
            onClick={handlePreviousMonth}
          >
            Tháng trước
          </Button>
          <Button
            sx={{ width: "300px", margin: "20px 70px" }}
            variant="outlined"
            onClick={handleNextMonth}
            disabled={months === month && years === year}
          >
            Tháng sau
          </Button>
        </Grid>
      </Container>
    </RootContainer>
  );
};

export default Statistical;
