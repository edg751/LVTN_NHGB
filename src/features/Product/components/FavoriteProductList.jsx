import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import userApi from "api/userApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FavoriteProducts = () => {
  const [FavoriteList, setFavoriteList] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    (async () => {
      try {
        const list = await userApi.getFavoriteList(user.user_id);
        setFavoriteList(
          list.map((x) => ({
            id_product: x.id_product,
            product_name: x.product_name,
            price: x.price,
            pic_link: x.pic_link,
          }))
        );
        console.log(user.user_id);
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, [user]);

  return (
    <Box
      p={2}
      sx={{ width: "1200px", marginLeft: "auto", marginRight: "auto" }}
    >
      <Typography variant="h4" mb={2}>
        Danh sách sản phẩm yêu thích
      </Typography>
      {FavoriteList.length === 0 ? (
        <Box sx={{ height: "600px" }}>
          <Typography variant="body1">
            Danh sách sản phẩm yêu thích rỗng
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ display: "flex" }}>
          {FavoriteList.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Link to={`/products/0/${product.id_product}`} underline="none">
                <Card sx={{ minHeight: "500px" }}>
                  <CardMedia
                    component="img"
                    height="100%"
                    width="100%"
                    image={product.pic_link}
                    alt={product.product_name}
                  />
                  <CardContent sx={{ marginTop: "10px" }}>
                    <Typography variant="h6">{product.product_name}</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FavoriteProducts;
