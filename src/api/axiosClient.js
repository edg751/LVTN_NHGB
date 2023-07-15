import axios from "axios";
// Import thư viện axios vào đoạn mã JavaScript để sử dụng.

const axiosClient = axios.create({
  baseURL: "http://localhost:3500/",
  headers: {
    "Content-Type": "application/json", // Tiêu đề của yêu cầu HTTP được gửi đến API, chỉ định rằng nội dung của yêu cầu là JSON.
  },
});

axiosClient.interceptors.request.use(
  // Sử dụng axiosClient.interceptors.request.use() để thêm một interceptor cho các yêu cầu HTTP được gửi từ client.
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  // Sử dụng axiosClient.interceptors.response.use() để thêm một interceptor cho các phản hồi HTTP từ API.
  function (response) {
    return response.data;
  },
  function (error) {
    const { config, status, data } = error.response;
    const URLs = ["/auth/register", "/auth/login"]; // Các đường dẫn liên quan đến đăng ký và đăng nhập.
    if (URLs.includes(config.url) && status === 401) {
      // Kiểm tra đường dẫn và mã trạng thái để xác định loại lỗi.
      const errorList = data.message || []; // Danh sách lỗi.
      throw new Error(errorList); // Ném ra một lỗi mới với thông báo lỗi đầu tiên.
    }
    return Promise.reject(error); // Trả về một promise bị từ chối với lượng error, để cho các interceptor tiếp theo hoặc phía gọi API có thể xử lý.
  }
);

export default axiosClient; // Xuất đối tượng axiosClient để sử dụng trong các thành phần khác của ứng dụng.
