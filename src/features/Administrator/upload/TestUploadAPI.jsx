import React, { useState, useEffect } from "react";
import axiosClient from "api/axiosClient";

const TestUploadAPI = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        throw new Error("No file selected");
      }

      const formData = new FormData();
      formData.append("image", file);

      const response = await axiosClient.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    handleUpload(); // Call handleUpload whenever the 'file' state changes
  }, [file]); // The dependency array ensures the effect is re-run whenever 'file' changes

  return (
    <div>
      <h2>Image Upload</h2>
      <input type="file" onChange={handleFileChange} />

      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "300px" }} />
        </div>
      )}
    </div>
  );
};

export default TestUploadAPI;
