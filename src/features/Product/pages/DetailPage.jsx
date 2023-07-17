import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  OutlinedInput,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import styled from "@emotion/styled";

import ProductInfo from "../components/ProductInfo";
import ProductThumbnail from "../components/ProductThumbnail";
import DetailInfomation from "../components/DetailInfomation";
import ReviewProduct from "../components/ReviewProduct";
import productApi from "api/productApi";
import axiosClient from "api/axiosClient";
import { useSelector } from "react-redux";
import ViewProduct from "../components/ViewProduct";
DetailPage.propTypes = {};
const StyledGridLeft = styled(Grid)`
  width: 700px;
  padding: 14px;
`;
const StyledGridRight = styled(Grid)`
  padding: "14px";
  flex: 1 1 0;
`;

function DetailPage({ handleAddToCartClick }) {
  const location = useLocation();
  const idProduct = location.pathname.split("/").pop();
  console.log(idProduct);

  const [detailProduct, setDetailProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [statusFlag, setStatusFlag] = useState();
  const [viewedProducts, setViewedProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await productApi.getProductDetail(idProduct, color);
        setDetailProduct(
          list.map((x) => ({
            id: x.id_product,
            name: x.product_name,
            sold: x.sold_quantity,
            price: x.price,
            des: x.product_description,
            total_rate: x.count_rating,
            rate: x.rating,
            images_list: x.images_list,
            colors_list: x.colors_list,
            size_list: x.size_list,
            // colors: x.color,
            // sizes: x.size,
          }))
        );
        setLoading(true); // Đánh dấu dữ liệu đã được tải xong
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, [color, statusFlag]);

  if (loading === true) {
    console.log("Đây là chi tiết", detailProduct);
    console.log("Đây là tên SP:", detailProduct[0].name);
    console.log("Đây là giá SP:", detailProduct[0].price);
    console.log("Đây là hình SP:", detailProduct[0].images_list[0].pic_link);
  }

  const [open, setOpen] = React.useState(false);
  const [openReview, setOpenReview] = React.useState(false);
  const [inputReview, setInputReview] = useState("");
  const [ratingValue, setRatingValue] = useState(5);

  const handleClose = () => {
    setOpen(false);
  };
  const handleSize = () => {
    setOpen(true);
  };
  const handleReviewClose = () => {
    setOpenReview(false);
  };
  const handleReviewOpen = () => {
    setOpenReview(true);
  };
  const loggedInUser = useSelector((state) => state.user.current);
  // Nếu nó có id thì là đăng nhập rồi

  const handleSubmit = async () => {
    try {
      console.log(
        "Nội dung đánh giá:",
        inputReview,
        ", Điểm :",
        ratingValue,
        "Id: ",
        idProduct
      );
      let data = {};
      data.star = ratingValue;
      data.productid = idProduct;
      data.comment = inputReview;
      data.userid = loggedInUser.user_id;

      setOpenReview(false);

      const response = await axiosClient.post("/api/postReview", data);
      setStatusFlag(Date.now());
    } catch {}
  };
  const handleRating = (event, newValue) => {
    setRatingValue(newValue);
  };
  const handleContextRating = (event) => {
    let inputValue = event.target.value;

    if (inputValue.length > 500) {
      inputValue = inputValue.slice(0, 500);
    }

    setInputReview(inputValue);
  };

  const handleGetColor = (value) => {
    console.log("Màu trong Product Detail ahuhu: ", value);
    // Vẫn là cái id
    // Lấy id useEffect lại cái list hình
    setColor(value);
  };

  const handleGetSize = (value) => {
    console.log("Size trong Product Detail ahuhu: ", value);
    setSize(value);
  };
  useEffect(() => {
    const storedViewedProducts = localStorage.getItem("viewedProducts");
    if (storedViewedProducts) {
      setViewedProducts(JSON.parse(storedViewedProducts));
    }
  }, []);

  const handleViewProduct = () => {
    const isViewed = viewedProducts.find((p) => p.id === idProduct);

    if (!isViewed && loading === true) {
      const viewedProduct = {
        id: idProduct,
        name: detailProduct[0].name,
        image: detailProduct[0].images_list[0].pic_link,
        price: detailProduct[0].price,
      };

      setViewedProducts((prevProducts) => {
        const existingViewedProducts = JSON.parse(
          localStorage.getItem("viewedProducts")
        );
        const updatedProducts = existingViewedProducts
          ? [...existingViewedProducts]
          : [];
        const isNewProduct = updatedProducts.some(
          (p) => p.id === viewedProduct.id
        );

        if (!isNewProduct) {
          updatedProducts.push(viewedProduct);
          localStorage.setItem(
            "viewedProducts",
            JSON.stringify(updatedProducts)
          );
        }

        return [...prevProducts, viewedProduct];
      });
    }
  };
  const existingViewedProducts = JSON.parse(
    localStorage.getItem("viewedProducts")
  );

  // VIEW
  handleViewProduct();

  return (
    <div>
      <Box>
        <Container sx={{ marginTop: "20px" }}>
          <Paper elevation={0}>
            {/* <DIALOG HƯỚNG DẪN CHỌN SIZE> */}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              disableEscapeKeyDown
            >
              <DialogTitle id="alert-dialog-title">
                {"Hướng dẫn bạn chọn size"}
              </DialogTitle>
              <DialogContent>
                <img
                  width={"100%"}
                  src="https://baonguyen.online/LVTN/size/size_ao_nam.png"
                  alt=""
                />
              </DialogContent>
            </Dialog>
            {/* <DIALOG ĐÁNH GIÁ SẢN PHẨM> */}
            <Dialog
              open={openReview}
              onClose={handleReviewClose}
              disableEscapeKeyDown
              maxWidth="md"
            >
              <DialogTitle
                id="alert-dialog-title"
                sx={{ padding: "30px 0 30px", marginLeft: "50px" }}
              >
                {"Đánh giá sản phẩm"}
              </DialogTitle>
              <Typography sx={{ marginLeft: "40px" }}> Điểm : </Typography>
              <Rating
                sx={{ marginLeft: "50px", marginBottom: "20px" }}
                name="half-rating"
                defaultValue={5}
                precision={1}
                value={ratingValue}
                onChange={handleRating}
              />
              <Typography sx={{ marginLeft: "40px", marginBottom: "20px" }}>
                Nội dung đánh giá :{" "}
              </Typography>
              <TextField
                id="outlined-multiline-flexible"
                label="Nhập tối đa 500 ký tự"
                multiline
                maxRows={10}
                sx={{
                  width: "800px",
                  paddingBottom: "30px",
                  marginLeft: "50px",
                  marginRight: "50px",
                }}
                value={inputReview}
                onChange={handleContextRating}
              />
              <Button sx={{ marginBottom: "20px" }} onClick={handleSubmit}>
                Gửi đánh giá
              </Button>
            </Dialog>
            {/* CHI TIẾT SẢN PHẨM {productId} */}
            <Grid container>
              {/* LEFT */}
              <StyledGridLeft item>
                {loading && <ProductThumbnail product={detailProduct} />}
                {loading && <DetailInfomation product={detailProduct} />}
                <ReviewProduct
                  handleReview={handleReviewOpen}
                  statusFlag={statusFlag}
                />
              </StyledGridLeft>
              {/* RIGHT */}
              <StyledGridRight item>
                {loading && (
                  <ProductInfo
                    product={detailProduct}
                    handleGetColor={handleGetColor}
                    handleGetSize={handleGetSize}
                    handleSize={handleSize}
                    handleAddToCartClick={handleAddToCartClick}
                  />
                )}
                {/* <AddToCardForm onSubmit={handleAddToCartSubmit} /> */}
              </StyledGridRight>
            </Grid>
            {existingViewedProducts && (
              <ViewProduct products={existingViewedProducts} />
            )}
          </Paper>
        </Container>
      </Box>
    </div>
  );
}

export default DetailPage;
