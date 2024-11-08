<template>
    <div>
      <h2>Chat Application</h2>
      <div v-for="(message, index) in messages" :key="index">
        <p><strong>{{ message.sender }}:</strong> {{ message.content }}</p>
      </div>
      <input type="text" v-model="newMessage" placeholder="Enter your message" @keyup.enter="sendMessage"/>
      <button @click="sendMessage">Send</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newMessage: '',
        messages: [],
        username: 'User1', // Lấy từ thông tin đăng nhập của người dùng
        roomId: 'public',  // Mặc định là 'public' cho chat nhóm
      };
    },
    methods: {
      sendMessage() {
        if (this.newMessage.trim() !== '') {
          const message = {
            sender: this.username,  // Lấy từ thông tin người dùng đăng nhập
            content: this.newMessage,
            chatType: 'GROUP', // 'GROUP' cho chat nhóm, 'PRIVATE' cho chat 1-1
            roomId: this.roomId,   // ID phòng hoặc ID người nhận nếu chat riêng tư
          };
  
          // Sử dụng stompClient để gửi tin nhắn tới WebSocket server
          this.$stompClient.publish({
            destination: '/app/chat.sendMessage', // Đích đến trên server
            body: JSON.stringify(message),
          });
  
          // Reset input
          this.newMessage = '';
        }
      }
    },
    mounted() {
      // Đăng ký nhận tin nhắn từ server và cập nhật vào danh sách messages
      this.$stompClient.subscribe('/topic/public', (msg) => {
        const message = JSON.parse(msg.body);
        this.messages.push(message);
      });
  
      // Ví dụ nếu có phòng riêng tư, bạn cũng có thể đăng ký kênh riêng tư như sau:
      this.$stompClient.subscribe(`/user/${this.username}/queue/messages`, (msg) => {
        const privateMessage = JSON.parse(msg.body);
        this.messages.push(privateMessage);
      });
    }
  };
  </script>
  
  <style scoped>
  /* CSS cho component */
  </style>
  