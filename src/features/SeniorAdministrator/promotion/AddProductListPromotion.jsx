import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import axiosClient from "api/axiosClient";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddProductListPromotion() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productList, setProductList] = useState([]);
  const location = useLocation();
  const idPM = location.pathname.split("/").pop();
  const navigate = useNavigate();
  React.useEffect(() => {
    (async () => {
      try {
        const list = await axiosClient.get(
          `/api/senior-admin/list-product?idPM=${idPM}`
        );
        setProductList(
          list.map((x) => ({
            id_product: x.id_product,
            product_name: x.product_name,
          }))
        );
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);

  const handleCheckboxChange = (event, productId) => {
    if (event.target.checked) {
      setSelectedProducts((prevSelected) => [...prevSelected, productId]);
    } else {
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((id) => id !== productId)
      );
    }
  };

  const handleSubmit = async () => {
    console.log("Danh sách mã sản phẩm đã chọn:", selectedProducts);
    let data = {};
    data.id_PM = idPM;
    data.productList = selectedProducts;
    let response = axiosClient.post(
      "/api/senior-admin/add-product-promotion",
      data
    );
    navigate(`/admin/senior-admin/ProductListPromotion/${idPM}`);
  };

  return (
    <Box p={2}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã sản phẩm</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Chọn</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((product) => (
              <TableRow key={product.id_product}>
                <TableCell>{product.id_product}</TableCell>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={selectedProducts.includes(product.id_product)}
                    onChange={(event) =>
                      handleCheckboxChange(event, product.id_product)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Thêm
      </Button>
    </Box>
  );
}
