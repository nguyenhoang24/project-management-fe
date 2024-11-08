<script>
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { required } from "vuelidate/lib/validators";
import { getAccessToken, getUserInfo } from "@/utils/cookieAuthen";
import { mapActions } from "vuex";

let stompClient = null; // Global variable to maintain StompClient connection

export default {
    head() {
        return {
            title: `${this.title} | Chats chits`,
        };
    },
    data() {
        return {
            name: null,
            users: [],
            chatMessagesData: [],
            title: "Chat",
            items: [{ text: "Apps" }, { text: "Chat", active: true }],
            submitted: false,
            form: {
                message: "",
            },
            userInfo: {},
            username: "",
            userId: "",
            member: null,
            connected: false,
            currentChatUser: null,
            currentConversationId: null,
            activeSubscription: null, // Variable to store the current subscription
            isChatWithAI: false,
            messageResponseAI: "",
            user: {
                id: -1,
                name: "",
            },
        };
    },
    validations: {
        form: {
            message: {
                required,
            },
        },
    },
    methods: {
        subscribeToUserNotifications() {
            if (this.userId && stompClient && this.connected) {
                // Topic tường minh, lắng nghe thông báo dành cho user hiện tại
                const destination = `/topic/users/${this.username}/notifications`;
                console.log("dcmmmmm {}", destination);
                stompClient.subscribe(destination, (message) => {
                    const notification = JSON.parse(message.body);
                    console.log("Received notification:", notification);

                    // Xử lý thông báo (ví dụ: hiện thông báo "Bạn bè đang online")
                    this.handleNotification(notification);
                });
            }
        },
        handleNotification(notification) {
            if (notification.type === "FRIEND_ONLINE") {
                const username = notification.userConnection.username;
                console.log(`${username} is online`);

                // Tìm người dùng trong danh sách và cập nhật trạng thái online
                const user = this.users.find((user) => user.username === username);
                if (user) {
                    user.online = true; // Cập nhật trạng thái online
                }
            }
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const simpleBarInstance = this.$refs.simplebar.SimpleBar; // Lấy instance của SimpleBar
                if (simpleBarInstance) {
                    const scrollElement = simpleBarInstance.getScrollElement();
                    scrollElement.scrollTop = scrollElement.scrollHeight;
                }
            });
        },
        async fetchUsers() {
            try {
                const response = await this.$axios.get(`/users/list-user-chat/${Number(this.userId)}`);
                this.users = response.data;
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        },

        async startPrivateChat(user) {
            console.log("Starting private chat for user ID: " + this.userId);
            this.isChatWithAI = false;
            try {
                const response = await this.$axios.post("/conversations/start", {
                    type: "1-1",
                    userIds: [this.userId, user.id],
                });

                const conversationId = response.data.id;

                // Kiểm tra xem cuộc hội thoại hiện tại có phải là cuộc hội thoại mới hay không
                if (this.currentConversationId !== conversationId) {
                    await this.$router.push(`/chat?conversation=${conversationId}`);
                    this.currentConversationId = conversationId;

                    // Gọi hàm subscribe vào conversation mới
                    this.subscribeToConversation(conversationId);
                } else {
                    console.log("Already subscribed to this conversation");
                }
            } catch (error) {
                console.error("Error starting private chat:", error);
            }
        },

        async startAIChat() {
            console.log("Starting chat AI with userId: " + this.userId);
            this.isChatWithAI = true;
            try {
                const response = await this.$axios.post("/conversations/start", {
                    type: "chat-ai",
                    userId: this.userId,
                });

                const conversationId = response.data.id;

                // Kiểm tra xem cuộc hội thoại hiện tại có phải là cuộc hội thoại mới hay không
                if (this.currentConversationId !== conversationId) {
                    await this.$router.push(`/chat?conversation=${conversationId}`);
                    this.currentConversationId = conversationId;

                    // Gọi hàm subscribe vào conversation mới
                    this.subscribeToConversation(conversationId);
                } else {
                    console.log("Already subscribed to this conversation");
                }
            } catch (error) {
                console.error("Error starting private chat:", error);
            }
        },

        async apiChatAI() {
            console.log("start chat ai event");

            try {
                const response = await this.$axios.post(
                    process.env.VUE_APP_API_BASE + "chat",
                    {
                        // model: "npien/vistral-4bit",
                        // messages: [{
                        //     role: "user",
                        //     content: this.form.message }],
                        // stream: false,
                        // token: 15,
                        model: "gemma2:9b",
                        messages: [
                            {
                                role: "system",
                                content: "Trả lời đầy đủ, ngắn gọn.",
                            },
                            {
                                role: "user",
                                content: this.form.message,
                            },
                        ],
                        stream: false,
                        temperature: 0.1,
                    },
                    {
                        timeout: 600000,
                    }
                );

                if (response.data && response.data.message && response.data.message.content) {
                    this.messageResponseAI = response.data.message.content;
                    this.sendMessageAIResponse(); // Hàm mới để gửi tin nhắn
                    console.log("content AI response: ..." + this.messageResponseAI);
                } else {
                    console.error("Invalid AI response format");
                }
            } catch (error) {
                console.error("Error starting AI chat:", error);
            }
        },

        subscribeToConversation(conversationId) {
            // Unsubscribe from the old subscription if it exists
            if (this.activeSubscription) {
                console.log("Unsubscribing from old subscription");
                this.activeSubscription.unsubscribe();
                this.activeSubscription = null;
            }

            if (conversationId && stompClient && this.connected) {
                console.log("Subscribing to new conversation:", conversationId);

                // Đăng ký nhận danh sách tin nhắn đã có
                this.activeSubscription = stompClient.subscribe(`/topic/conversation/${conversationId}/messages`, (msg) => {
                    const messages = JSON.parse(msg.body);
                    console.log("Received existing messages:", messages);

                    // Reset the current chat message data
                    this.chatMessagesData = [];

                    messages.forEach((message) => {
                        const align = message.user.id === this.userId ? "right" : "left";
                        // let align;
                        // if (message.sender === 'AI') {
                        //     align = "left";
                        // } else if (message.userId === this.userId) {
                        //     align = "right";
                        // } else {
                        //     align = "left";
                        // }
                        this.chatMessagesData.push({
                            align: align,
                            name: message.user.username,
                            message: message.content,
                            time: new Date(message.timestamp).toLocaleTimeString(),
                        });
                    });
                });

                // Lắng nghe tin nhắn mới
                this.activeSubscription = stompClient.subscribe(`/topic/conversation/${conversationId}/newMessage`, (msg) => {
                    const message = JSON.parse(msg.body);
                    console.log("Received new message:", message);

                    const align = message.userId === this.userId ? "right" : "left";
                    // let align;
                    // if (message.sender === 'AI') {
                    //     align = "left";
                    // } else if (message.userId === this.userId) {
                    //     align = "right";
                    // } else {
                    //     align = "left";
                    // }
                    this.chatMessagesData.push({
                        align: align,
                        name: message.sender,
                        message: message.content,
                        time: new Date().toLocaleTimeString(),
                    });

                    this.scrollToBottom();
                });

                // Yêu cầu danh sách tin nhắn hiện có
                stompClient.publish({
                    destination: `/app/chat/${conversationId}/getMessages`,
                    body: JSON.stringify({ conversationId }),
                });
            }
        },
        async formSubmit() {
            if (!this.form.message) {
                console.log("Message is empty, not sending");
                return;
            }

            console.log("Sending message:", this.form.message);
            const message = {
                sender: this.username,
                content: this.form.message,
                userId: this.userId,
                chatType: !this.isChatWithAI ? "PRIVATE" : "CHAT-AI",
                conversationId: this.currentConversationId,
                roomId: this.currentChatUser ? this.currentChatUser.id : "public",
            };

            // Gửi tin nhắn thông qua WebSocket
            stompClient.publish({
                destination: `/app/chat/${this.currentConversationId}/sendMessage`,
                body: JSON.stringify(message),
            });

            if (this.isChatWithAI && message.chatType === "CHAT-AI") {
                if (this.isChatWithAI) {
                    await this.apiChatAI();
                }
            }

            // Reset form sau khi gửi tin nhắn
            this.submitted = false;
            this.form.message = "";
        },

        initializeWebSocket() {
            const token = getAccessToken();
            if (!token) {
                console.error("Token not found in cookies");
                return;
            }

            if (!stompClient || !this.connected) {
                const socket = new SockJS(process.env.VUE_APP_API_BASE + "ws");
                stompClient = new Client({
                    webSocketFactory: () => socket,
                    reconnectDelay: 5000,
                    connectHeaders: {
                        Authorization: `Bearer ${token}`,
                    },
                    onConnect: () => {
                        this.connected = true;
                        console.log("Connected to WebSocket server");

                        this.subscribeToUserNotifications();

                        // Subscribe to the conversation if it's already set
                        if (this.currentConversationId) {
                            this.subscribeToConversation(this.currentConversationId);
                        }

                        this.subscribeToGroupNotifications();
                    },
                    onStompError: (frame) => {
                        console.error("STOMP error:", frame);
                        this.connected = false;
                    },
                });

                stompClient.activate();
            } else {
                console.log("WebSocket already connected");
            }
        },

        subscribeToGroupNotifications() {
            if (stompClient && this.connected) {
                console.log("Subscribing to group notifications for conversation: {{}}");

                // Subscribe to the group's conversation notifications
                this.activeSubscription = stompClient.subscribe(`/topic/conversation/${this.username}/groupNotifications`, (msg) => {
                    const notification = JSON.parse(msg.body);
                    console.log("Received group notification:", notification);

                    // Handle the notification based on its type
                    this.handleGroupNotification(notification);
                });
            }
        },
        handleGroupNotification(notification) {
            if (notification.type === "MESSAGE_DELIVERY_UPDATE") {
                console.log("hêloooooooooooooooooooooooooooo");
            }
        },
        sendMessageAIResponse() {
            if (this.messageResponseAI && this.messageResponseAI.trim() !== "") {
                const message = {
                    sender: "AI",
                    content: this.messageResponseAI,
                    userId: 100,
                    conversationId: this.currentConversationId,
                };

                stompClient.publish({
                    destination: `/app/chat/${this.currentConversationId}/sendMessage`,
                    body: JSON.stringify(message),
                });
                console.log("Sent AI response message");
            }
        },
        handleInitUser() {
            if (JSON.parse(getUserInfo()).role === "ROLE_STUDENT") {
                this.apiGetStudent({
                    conditionSearch: "ID",
                    valueSearch: JSON.parse(getUserInfo()).studentId,
                }).then((res) => {
                    this.user.name = res[0].fullName;
                });
            }
            console.log(JSON.parse(getUserInfo()).teacherId);
            if (JSON.parse(getUserInfo()).role === "ROLE_TEACHER") {
                this.apiGetTeacherById({ id: JSON.parse(getUserInfo()).teacherId }).then((res) => {
                    this.user.name = res.fullName;
                });
            }
        },
        ...mapActions("admin/students", {
            apiGetStudent: "apiGetStudent",
        }),
        ...mapActions("admin/teachers", {
            apiGetTeacherById: "apiGetTeacherById",
            apiAddRegulation: "apiAddRegulation",
        }),
    },

    mounted() {
        this.userInfo = JSON.parse(getUserInfo());
        this.username = this.userInfo.username;
        this.userId = this.userInfo.userId;
        this.name = localStorage.getItem("firstName");

        this.fetchUsers();
        this.initializeWebSocket(); // Initialize or reuse the WebSocket connection
        this.scrollToBottom();
        this.handleInitUser();
    },
    watch: {
        chatMessagesData() {
            this.scrollToBottom(); // Cuộn xuống khi có tin nhắn mới
        },
    },
    // middleware: "authentication",
};
</script>

<template>
    <div>
        <PageHeader :title="title" :items="items" />
        <div class="d-lg-flex mb-4">
            <!-- Sidebar trái -->
            <div class="chat-leftsidebar card">
                <div class="p-3 px-4">
                    <div class="media">
                        <div class="align-self-center me-3">
                            <img src="~/assets/images/users/avatar-4.jpg" class="avatar-xs rounded-circle" alt="User Avatar" />
                        </div>
                        <div class="media-body">
                            <h5 class="font-size-16 mt-0 mb-1">
                                <a href="#" class="text-dark">
                                    {{ user.name }}
                                    <i class="mdi mdi-circle text-success align-middle font-size-10 ms-1"></i>
                                </a>
                            </h5>
                            <p class="text-muted mb-0">Đang hoạt động</p>
                        </div>
                        <div>
                            <b-dropdown variant="white" class="chat-noti-dropdown" toggle-class="py-0" right>
                                <template v-slot:button-content>
                                    <i class="uil uil-ellipsis-h"></i>
                                </template>
                                <a class="dropdown-item" href="#">Profile</a>
                                <a class="dropdown-item" href="#">Edit</a>
                                <a class="dropdown-item" href="#">Add Contact</a>
                                <a class="dropdown-item" href="#">Setting</a>
                            </b-dropdown>
                        </div>
                    </div>
                </div>

                <div class="p-3">
                    <div class="search-box chat-search-box">
                        <div class="position-relative">
                            <input type="text" class="form-control bg-light border-light rounded" placeholder="Tìm kiếm..." />
                            <i class="uil uil-search search-icon"></i>
                        </div>
                    </div>
                </div>

                <!-- Danh sách người dùng và nhóm -->
                <div class="pb-3">
                    <div data-simplebar style="max-height: 470px">
                        <!-- Nhóm chat -->
                        <div class="p-4 border-top">
                            <!--                            <div class="float-end">-->
                            <!--                                <a href="#" class="text-primary"> <i class="mdi mdi-plus"></i> Nhóm Mới </a>-->
                            <!--                            </div>-->
                            <h5 class="font-size-16 mb-3"><i class="uil uil-users-alt me-1"></i> Chat với AI</h5>

                            <ul class="list-unstyled chat-list group-list">
                                <li>
                                    <a href="#" @click.prevent="startAIChat()">
                                        <div class="media align-items-center">
                                            <div class="avatar-xs me-3">
                                                <span class="avatar-title rounded-circle bg-soft-primary text-primary">AI</span>
                                                <!--                                                <span v-if="group.icon" class="avatar-title rounded-circle bg-soft-primary text-primary">-->
                                                <!--                                                    <i :class="`uil ${group.icon}`"></i>-->
                                                <!--                                                </span>-->
                                            </div>
                                            <div class="media-body">
                                                <h5 class="font-size-14 mb-0">CHAT AI</h5>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <!-- Danh sách liên hệ -->
                        <div class="p-4 border-top">
                            <div class="float-end">
                                <a href="#" class="text-primary"> <i class="mdi mdi-plus"></i> Liên Hệ Mới </a>
                            </div>
                            <h5 class="font-size-16 mb-3"><i class="uil uil-user me-1"></i> Liên Hệ</h5>

                            <ul class="list-unstyled chat-list">
                                <li v-for="user in users" :key="user.id" :class="{ active: currentChatUser && currentChatUser.id === user.id }">
                                    <a href="#" @click.prevent="startPrivateChat(user)">
                                        <div class="media">
                                            <div class="user-img align-self-center me-3" :class="{ online: user.online, offline: !user.online }">
                                                <img v-if="user.image" :src="user.image" class="rounded-circle avatar-xs" alt="User Avatar" />
                                                <div v-if="!user.image" class="avatar-xs align-self-center">
                                                    <span class="avatar-title rounded-circle bg-soft-primary text-primary">{{ user.fullName.charAt(0) }}</span>
                                                </div>
                                                <span class="user-status"></span>
                                            </div>
                                            <div class="media-body overflow-hidden">
                                                <h5 class="text-truncate font-size-14 mb-1">{{ user.fullName }}</h5>
                                                <p class="text-truncate mb-0">{{ user.message || "" }}</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end chat-leftsidebar -->

            <!-- Khu vực chat -->
            <div class="w-100 user-chat mt-4 mt-sm-0 ms-lg-1">
                <div class="card">
                    <div class="p-3 px-lg-4 border-bottom">
                        <div class="row">
                            <div class="col-md-4 col-6">
                                <h5 class="font-size-16 mb-1 text-truncate">
                                    <a href="#" class="text-dark">{{ currentChatUser ? currentChatUser.username : "Chat" }}</a>
                                </h5>
                                <p class="text-muted text-truncate mb-0" v-if="member !== null">
                                    <i class="uil uil-users-alt me-1"></i>
                                    {{ member !== null ? member : "" }} Thành viên
                                </p>
                            </div>
                            <div class="col-md-8 col-6">
                                <ul class="list-inline user-chat-nav text-end mb-0">
                                    <li class="list-inline-item">
                                        <b-dropdown right menu-class="dropdown-menu-md" variant="white">
                                            <template v-slot:button-content>
                                                <i class="uil uil-search"></i>
                                            </template>
                                            <form class="p-2">
                                                <div>
                                                    <input type="text" class="form-control rounded" placeholder="Tìm kiếm..." />
                                                </div>
                                            </form>
                                        </b-dropdown>
                                    </li>
                                    <li class="list-inline-item">
                                        <b-dropdown right toggle-class="nav-btn" variant="white">
                                            <template v-slot:button-content>
                                                <i class="uil uil-ellipsis-h"></i>
                                            </template>
                                            <a class="dropdown-item" href="#">Profile</a>
                                            <a class="dropdown-item" href="#">Lưu trữ</a>
                                            <a class="dropdown-item" href="#">Tắt tiếng</a>
                                            <a class="dropdown-item" href="#">Xóa</a>
                                        </b-dropdown>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="px-lg-2 chat-users">
                        <div class="chat-conversation p-3">
                            <simplebar ref="simplebar" style="max-height: 455px">
                                <ul class="list-unstyled mb-0">
                                    <li class="chat-day-title">
                                        <div class="title">Hôm nay</div>
                                    </li>
                                    <li v-for="(data, index) in chatMessagesData" :key="index" :class="{ 'message-right': data.align === 'right', 'message-left': data.align === 'left' }">
                                        <div class="conversation-list">
                                            <div class="ctext-wrap">
                                                <div class="ctext-wrap-content">
                                                    <h5 class="font-size-14 conversation-name">
                                                        <a href="#" class="text-dark">{{ data.name }}</a>
                                                        <span class="d-inline-block font-size-12 text-muted ms-2">{{ data.time }}</span>
                                                    </h5>
                                                    <p class="mb-0">{{ data.message }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </simplebar>
                        </div>
                    </div>

                    <div class="p-3 chat-input-section">
                        <form @submit.prevent="formSubmit" class="row">
                            <div class="col">
                                <div class="position-relative">
                                    <input type="text" v-model="form.message" class="form-control chat-input rounded" placeholder="Nhập tin nhắn..." :class="{ 'is-invalid': submitted && $v.form.message.$error }" />
                                    <div v-if="submitted && $v.form.message.$error" class="invalid-feedback">
                                        <span v-if="!$v.form.message.required">Tin nhắn không được để trống.</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-auto">
                                <button type="submit" class="btn btn-primary chat-send w-md waves-effect waves-light">
                                    <span class="d-none d-sm-inline-block me-2">Gửi</span>
                                    <i class="mdi mdi-send float-end"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.chat-leftsidebar {
    max-width: 350px;
    min-width: 300px;
    background-color: #f8f9fa;
}

.chat-leftsidebar .media {
    padding: 10px;
    background-color: #fff;
    border-radius: 8px;
}

.chat-leftsidebar .media .avatar-xs {
    width: 36px;
    height: 36px;
}

.chat-leftsidebar .media-body h5 {
    margin: 0;
}

.chat-list .media:hover {
    background-color: #e9ecef;
    cursor: pointer;
}

.user-chat {
    flex-grow: 1;
}

.chat-conversation {
    background-color: #ffffff;
    border-radius: 8px;
    border: 1px solid #e9ecef;
}

.chat-conversation .chat-day-title .title {
    color: #495057;
    font-weight: bold;
    margin-bottom: 15px;
}

.chat-input-section {
    background-color: #f8f9fa;
    border-top: 1px solid #e9ecef;
}

.chat-input-section .form-control.chat-input {
    height: 50px;
    padding: 10px;
}

.chat-send {
    padding: 12px 24px;
}
.message-right {
    text-align: right;
    float: right;
    clear: both;
    background-color: #e1ffc7; /* Màu nền cho tin nhắn của mình */
    padding: 10px;
    border-radius: 15px;
    margin-bottom: 10px;
}

.message-left {
    text-align: left;
    float: left;
    clear: both;
    background-color: #f1f0f0; /* Màu nền cho tin nhắn của người khác */
    padding: 10px;
    border-radius: 15px;
    margin-bottom: 10px;
}

/* Giới hạn chiều rộng của tin nhắn */
.ctext-wrap-content {
    max-width: 70%;
    display: inline-block;
}
</style>
