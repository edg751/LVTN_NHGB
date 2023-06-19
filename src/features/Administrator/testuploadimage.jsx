import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Box } from "@mui/material";

ImageUpload.propTypes = {};

function ImageUpload(props) {
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [selectedImage4, setSelectedImage4] = useState(null);
  const [selectedImage5, setSelectedImage5] = useState(null);
  const [selectedImage6, setSelectedImage6] = useState(null);

  const [url1, setUrl1] = useState(null);
  const [url2, setUrl2] = useState(null);
  const [url3, setUrl3] = useState(null);
  const [url4, setUrl4] = useState(null);
  const [url5, setUrl5] = useState(null);
  const [url6, setUrl6] = useState(null);

  const handleImageUpload = async () => {
    try {
      //Img 1
      const formData = new FormData();
      formData.append("image", selectedImage1);

      const response = await axios.post(
        "http://localhost:3500/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload successful:", response.data);
      setUrl1(response.data.imageUrl);
      //Img 2
      const formData2 = new FormData();
      formData2.append("image", selectedImage2);

      const response2 = await axios.post(
        "http://localhost:3500/upload",
        formData2,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload 2 successful:", response2.data);
      setUrl2(response2.data.imageUrl);
      //Img 3
      const formData3 = new FormData();
      formData3.append("image", selectedImage3);

      const response3 = await axios.post(
        "http://localhost:3500/upload",
        formData3,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload 3 successful:", response3.data);
      setUrl3(response3.data.imageUrl);
      //Img 4
      const formData4 = new FormData();
      formData4.append("image", selectedImage4);

      const response4 = await axios.post(
        "http://localhost:3500/upload",
        formData4,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload 4 successful:", response4.data);
      setUrl4(response4.data.imageUrl);
      //Img 5
      const formData5 = new FormData();
      formData5.append("image", selectedImage5);

      const response5 = await axios.post(
        "http://localhost:3500/upload",
        formData5,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload 5 successful:", response5.data);
      setUrl5(response5.data.imageUrl);
      //Img 6
      const formData6 = new FormData();
      formData6.append("image", selectedImage6);

      const response6 = await axios.post(
        "http://localhost:3500/upload",
        formData6,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload 6 successful:", response6.data);
      setUrl6(response6.data.imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage1(e.target.files[0]);
  };

  const handleImageChange2 = (e) => {
    setSelectedImage2(e.target.files[0]);
  };
  const handleImageChange3 = (e) => {
    setSelectedImage3(e.target.files[0]);
  };
  const handleImageChange4 = (e) => {
    setSelectedImage4(e.target.files[0]);
  };
  const handleImageChange5 = (e) => {
    setSelectedImage5(e.target.files[0]);
  };
  const handleImageChange6 = (e) => {
    setSelectedImage6(e.target.files[0]);
  };

  return (
    <Box sx={{ marginBottom: "500px" }}>
      <h1>Upload ảnh</h1>
      <p>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </p>
      <p>
        <input type="file" accept="image/*" onChange={handleImageChange2} />
      </p>
      <p>
        <input type="file" accept="image/*" onChange={handleImageChange3} />
      </p>
      <p>
        <input type="file" accept="image/*" onChange={handleImageChange4} />
      </p>
      <p>
        <input type="file" accept="image/*" onChange={handleImageChange5} />
      </p>
      <p>
        <input type="file" accept="image/*" onChange={handleImageChange6} />
      </p>

      <button onClick={handleImageUpload}>Tải ảnh lên</button>
      {url1 && (
        <p>
          <a href={url1} target="_blank" rel="noreferrer">
            Link 1: {url1}
          </a>
          <img width={"200px"} src={url1} alt="" />
        </p>
      )}
      {url2 && (
        <p>
          <a href={url2} target="_blank" rel="noreferrer">
            Link 2: {url2}
          </a>
          <img width={"200px"} src={url2} alt="" />
        </p>
      )}
      {url3 && (
        <p>
          <a href={url3} target="_blank" rel="noreferrer">
            Link 3: {url3}
          </a>
          <img width={"200px"} src={url3} alt="" />
        </p>
      )}
      {url4 && (
        <p>
          <a href={url4} target="_blank" rel="noreferrer">
            Link 4: {url4}
          </a>
          <img width={"200px"} src={url4} alt="" />
        </p>
      )}
      {url5 && (
        <p>
          <a href={url5} target="_blank" rel="noreferrer">
            Link 5: {url5}
          </a>
          <img width={"200px"} src={url5} alt="" />
        </p>
      )}
      {url6 && (
        <p>
          <a href={url6} target="_blank" rel="noreferrer">
            Link 6: {url6}
          </a>
          <img width={"200px"} src={url6} alt="" />
        </p>
      )}
    </Box>
  );
}

export default ImageUpload;
