import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import * as yup from "yup";
import { useEffect, useState } from "react";
import productApi from "api/productApi";
import categoryApi from "api/categoriesApi";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "components/form-control/InputField";
import axiosClient from "api/axiosClient";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import HeaderAdminPage from "../components/HeaderAdminPage";
import CategoryAdminPage from "../components/CategoryAdminPage";

const schema = yup.object().shape({});
const ContentContainer = styled(Container)`
  flex-grow: 1;
  padding: 24px;
`;
const RootContainer = styled("div")`
  display: flex;
`;
const AddProductForm = () => {
  const navigate = useNavigate();
  const [Categories, setCategories] = useState([]);
  const [Materials, setMaterials] = useState([]);
  const [Styles, setStyles] = useState([]);
  const [colorsData, setcolorsData] = useState([]);
  const [sizeData, setSizeData] = useState([]);

  const [gender, setGender] = useState("");
  const [material, setMaterial] = useState("");
  const [category, setCategory] = useState("");
  const [style, setStyle] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const listCategories = await categoryApi.getAllCategoryAdmin();
        setCategories(
          listCategories.map((x) => ({
            id: x.category_id,
            name: x.category_name,
          }))
        );

        const listMaterials = await categoryApi.getAllMaterialAdmin();
        setMaterials(
          listMaterials.map((x) => ({
            id: x.material_id,
            name: x.material_name,
          }))
        );

        const listColors = await categoryApi.getAllColorAdmin();
        setcolorsData(
          listColors.map((x) => ({
            color_id: x.color_id,
            color_name: x.color_name,
          }))
        );

        const listSize = await categoryApi.getAllSize();
        setSizeData(
          listSize.map((x) => ({
            size_id: x.size_id,
            size_name: x.size_name,
          }))
        );

        const listStyles = await categoryApi.getAllStyleAdmin();
        setStyles(
          listStyles.map((x) => ({
            id: x.style_id,
            name: x.style_name,
          }))
        );
      } catch (error) {
        console.log("Error to fetch category API", error);
      }
    })();
  }, []);

  const form = useForm({
    defaultValues: {
      productName: "",
      price: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });

  console.log(gender);

  //   const onSubmit = (data) => {
  //     // Gửi dữ liệu đến API hoặc xử lý theo nhu cầu
  //     console.log(data);
  //     // Reset form
  //     // reset();
  //   };

  const handleSubmit = async (data) => {
    const colorObjects = selectedColors.map((color, index) => {
      return { color_id: color };
    });
    const sizeObjects = selectedSize.map((size, index) => {
      return { size_id: size };
    });

    try {
      data.gender_id = gender;
      data.category_id = category;
      data.material_id = material;
      data.style_id = style;
      data.color_list = colorObjects;
      data.size_list = sizeObjects;
      console.log("Data", data);
      const response = await axiosClient.post("/api/admin/add_product", data);
      console.log("Mã SP vừa thêm", response);
      navigate(`/admin/productDetail/${response}`);
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error registering user:", error);
    }
  };
  //   COLOR
  const [selectedColors, setSelectedColors] = useState([]);

  const handleColorChange = (colorId) => {
    if (selectedColors.includes(colorId)) {
      setSelectedColors((prevSelectedColors) =>
        prevSelectedColors.filter((color) => color !== colorId)
      );
    } else {
      setSelectedColors((prevSelectedColors) => [
        ...prevSelectedColors,
        colorId,
      ]);
    }
  };
  //   SIZE
  const [selectedSize, setSelectedSize] = useState([]);

  const handleSizeChange = (sizeId) => {
    if (selectedSize.includes(sizeId)) {
      setSelectedSize((prevSelectedSize) =>
        prevSelectedSize.filter((size) => size !== sizeId)
      );
    } else {
      setSelectedSize((prevSelectedSize) => [...prevSelectedSize, sizeId]);
    }
  };
  return (
    <RootContainer>
      <HeaderAdminPage />

      <CategoryAdminPage />
      <ContentContainer>
        {" "}
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            component="h1"
            align="center"
            mt={3}
            mb={4}
            sx={{ marginTop: "60px" }}
          >
            Thêm sản phẩm
          </Typography>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField
              name="productName"
              label="Tên sản phẩm"
              form={form}
            ></InputField>
            <InputField name="price" label="Giá tiền" form={form}></InputField>
            <InputField
              name="description"
              label="Mô tả sản phẩm"
              form={form}
            ></InputField>

            <FormControl fullWidth>
              <InputLabel>Giới tính</InputLabel>
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <MenuItem value="0">Nam</MenuItem>
                <MenuItem value="1">Nữ</MenuItem>
                <MenuItem value="2">Unisex</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Loại sản phẩm</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {Categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Vật liệu</InputLabel>
              <Select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                required
              >
                {Materials.map((material) => (
                  <MenuItem key={material.id} value={material.id}>
                    {material.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Phong cách</InputLabel>
              <Select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                required
              >
                {Styles.map((style) => (
                  <MenuItem key={style.id} value={style.id}>
                    {style.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box>
              <Typography>Màu sắc</Typography>
              <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                {colorsData.map((color) => (
                  <FormControlLabel
                    key={color.color_id}
                    control={
                      <Checkbox
                        checked={selectedColors.includes(color.color_id)}
                        onChange={() => handleColorChange(color.color_id)}
                      />
                    }
                    label={color.color_name}
                  />
                ))}
              </FormGroup>
            </Box>

            <Typography>Size</Typography>
            <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
              {sizeData.map((size) => (
                <FormControlLabel
                  key={size.size_id}
                  control={
                    <Checkbox
                      checked={selectedSize.includes(size.size_id)}
                      onChange={() => handleSizeChange(size.size_id)}
                    />
                  }
                  label={size.size_name}
                />
              ))}
            </FormGroup>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ p: "15px", marginTop: "30px" }}
              fullWidth
            >
              Đặt hàng
            </Button>
          </form>
        </Container>
      </ContentContainer>
    </RootContainer>
  );
};

export default AddProductForm;
