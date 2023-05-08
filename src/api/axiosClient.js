import axios from "axios";
// Import thư viện axios vào đoạn mã JavaScript để sử dụng.

const axiosClient = axios.create({
  // Khởi tạo một đối tượng axiosClient với hàm axios.create().
  baseURL: "http://localhost:3000/", // Đường dẫn cơ sở của API.
  headers: {
    "Content-Type": "application/json", // Tiêu đề của yêu cầu HTTP được gửi đến API, chỉ định rằng nội dung của yêu cầu là JSON.
  },
});

axiosClient.interceptors.request.use(
  // Sử dụng axiosClient.interceptors.request.use() để thêm một interceptor cho các yêu cầu HTTP được gửi từ client.
  function (config) {
    // Hàm callback đầu tiên nhận vào đối tượng cấu hình config của yêu cầu và trả về nó mà không làm gì thêm.
    return config;
  },
  function (error) {
    // Hàm callback thứ hai nhận vào đối tượng error và trả về một promise bị từ chối với đối số error để hiển thị lỗi.
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  // Sử dụng axiosClient.interceptors.response.use() để thêm một interceptor cho các phản hồi HTTP từ API.
  function (response) {
    // Hàm callback đầu tiên nhận vào đối tượng response và trả về phần dữ liệu của phản hồi (response.data).
    return response.data;
  },
  function (error) {
    // Hàm callback thứ hai nhận vào đối tượng error và trả về một promise bị từ chối với đối số error.
    const { config, status, data } = error.response; // Lấy ra đường dẫn, mã trạng thái và dữ liệu từ phản hồi lỗi.
    const URLs = ["/auth/register", "/auth/login"]; // Các đường dẫn liên quan đến đăng ký và đăng nhập.
    if (URLs.includes(config.url) && status === 400) {
      // Kiểm tra đường dẫn và mã trạng thái để xác định loại lỗi.
      const errorList = data.data || []; // Danh sách lỗi.
      const firstError = errorList.length > 0 ? errorList[0] : {}; // Lấy ra lỗi đầu tiên từ danh sách lỗi.
      const messageList = firstError.messages || []; // Danh sách thông báo lỗi.
      const firstMessage = messageList.length > 0 ? messageList[0] : {}; // Lấy ra thông báo lỗi đầu tiên từ danh sách thông báo lỗi.
      throw new Error(firstMessage.message); // Ném ra một lỗi mới với thông báo lỗi đầu tiên.
    }
    return Promise.reject(error); // Trả về một promise bị từ chối với lượng error, để cho các interceptor tiếp theo hoặc phía gọi API có thể xử lý.
  }
);

export default axiosClient; // Xuất đối tượng axiosClient để sử dụng trong các thành phần khác của ứng dụng.
