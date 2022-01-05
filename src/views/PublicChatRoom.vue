<template>
  <div class="container">
    <div class="online_users">
      <div class="online_users-part">
        <div class="user-title">
          <p>上線用戶({{loginUsers.length}})</p>
        </div>
        <div class="online_user" v-for="loginUser in loginUsers"
              :key="loginUser.id">
          <router-link to="#" class="user-avatar-link">
            <div 
              
              class="online_user-image">
              <img
                :src="loginUser.avatar"
                class="user-image"
                alt=""
              />
            </div>
          </router-link>
          <div class="online_user-info">
            <router-link to="#" class="user-name-link">
              <div class="user-name">{{loginUser.name}}</div>
            </router-link>
            <div class="user-account">@{{loginUser.account}}</div>
          </div>
        </div>
      </div>
      <div class="chat_room">
        <div class="chat_room-part">
          <div class="chat-title">
            <p>公開聊天室</p>
          </div>
          <div class="chat_room-part-container scrollbar" ref="chatContainer">
            <ChatMessage
              @after-retrieve-allMessage="scrollToBottom"
            />
          </div>
          <div class="chat_room-part-input">
            <div class="input-container">
              <!-- 希望使用者寫入資料時會隨著字數增加高度，送出再恢復 -->
              <textarea
                v-model="inputMessage"
                cols="30"
                class="message-input"
                rows="10"
                placeholder="輸入訊息..."
                @keypress.enter="handleSendChatBtnClicked"
              ></textarea>
              <div
                class="input-button cursor-pointer"
                @click="handleSendChatBtnClicked"
              >
                <img src="./../assets/Vector_send-icon.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import ChatMessage from "../components/ChatMessage.vue";
import { mapState } from "vuex";

export default {
  name: "PublicChatRoom",
  components: {
    ChatMessage,
  },
  data() {
    return {
      user: {},
      inputMessage: '',
      loginUsers: [],
    };
  },
  computed: mapState({
    currentUser: (state) => state.currentUserModule.currentUser,
  }),
  // {
  //   ...mapState(["currentUser"]),
  // },
  created() {
    this.$store.commit(
      "statusControlModule/toggleTopUsersDisplayStatus",
      "public-chatroom"
    );
    this.joinRoom();
  },
  beforeDestroy() {
    this.leaveRoom();
  },
  mounted() {
    this.$socket.open();
  },
  sockets: {
    loginUsers(loginUsers) {
      this.loginUsers = [...loginUsers];
    },
  },
  methods: {
    handleSendChatBtnClicked() {
      this.$socket.emit("sendMessage", {
        roomName: "public",
        UserId: this.currentUser.id,
        content: this.inputMessage,
      });
      this.inputMessage = "";
      this.scrollToBottom()
    },
    scrollToBottom(){
      this.$refs.chatContainer.scrollTo({
        top:this.$refs.chatContainer.scrollHeight,
        behavior: 'smooth'
      })
    },
    joinRoom() {
      const roomName = 'public'
      this.$socket.emit("public",roomName);
    },
    leaveRoom() {
      const roomName = 'public'
      this.$socket.emit("leave-room",roomName);
    },
  },
};
</script>


<style lang="scss" scoped>
.container {
  flex: 1;
  height: 1200px;
  .online_users {
    height: 100%;
    display: flex;
    &-part {
      width: 40%;
      height: 100%;
      overflow: overlay;
      display: flex;
      flex-direction: column;
    }
  }
}

.user-title,
.chat-title {
  font-size: 18px;
  font-weight: 700;
  height: 55px;
  border-bottom: 1px solid #e6ecf0;
  p {
    line-height: 55px;
    margin-left: 15px;
  }
}

.online_user {
  display: flex;
  align-items: center;
  height: 70px;
  border-bottom: 1px solid #e6ecf0;
  cursor: pointer;
  &:hover {
    background: #daf5fa;
  }
  &-image {
    width: 70px;
    height: 70px;
    padding: 10px;
    .user-image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      &:hover {
        transform: scale(1.1, 1.1);
      }
    }
  }
  &-info {
    width: 150px;
    display: flex;
    margin-left: 10px;
    .user-name {
      font-size: 15px;
      font-weight: bold;
    }
    .user-account {
      font-size: 15px;
      font-weight: bold;
      color: #657786;
      margin-left: 8px;
    }
  }
}

.chat_room {
  width: 100%;
  height: 1200px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e6ecf0;
  &-part {
    height: 100%;
    display: flex;
    flex-direction: column;
    &-container {
      height: 1047px;
      width: 100%;
      padding: 8px;
    }
    &-input {
      width: 100%;
      height: 70px;
      display: flex;
      border-top: 1px solid #e6ecf0;
      .input-container {
        display: flex;
        width: 100%;
        height: 35px;
        justify-content: space-around;
        margin: auto;
      }
    }
  }
}

.message-input {
  width: 80%;
  resize: none;
  border-radius: 30px;
  padding: 10px 15px;
  font-size: 15px;
  border: none;
  background: #e5e5e5;
}

.input-button img {
  width: 24px;
  height: 24px;
  margin: 5px;
}
</style>