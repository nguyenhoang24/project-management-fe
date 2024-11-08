import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export default ({ app }, inject) => {
  if (process.client) { // Chỉ chạy trên client-side
    const socket = new SockJS(process.env.VUE_APP_API_BASE + "ws", null, {
        transports: ['xhr-polling'],
        withCredentials: true // Bật gửi thông tin xác thực
    });
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000, // Tự động kết nối lại sau 5 giây nếu mất kết nối
    });

    // Hàm connect đến WebSocket server
    stompClient.onConnect = () => {
      console.log('Connected to WebSocket server');

      // Đăng ký để nhận tin nhắn từ topic "/topic/public"
      stompClient.subscribe('/topic/public', (message) => {
        if (message.body) {
          const receivedMessage = JSON.parse(message.body);
          app.store.commit('addMessage', receivedMessage); // Giả sử bạn dùng Vuex để lưu trữ tin nhắn
        }
      });
    };

    stompClient.activate(); // Kích hoạt kết nối

    // Inject stompClient để sử dụng trong các component khác
    inject('stompClient', stompClient);
  }
};
