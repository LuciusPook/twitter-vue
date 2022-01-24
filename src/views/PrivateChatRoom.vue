<template>
  <div class="container">
    <div class="online_users">
      <div class="online_users-part">
        <div class="user-title">
          <p>訊息</p>
          <img src="./../assets/Vector_newChat.svg" alt="" />
        </div>
        <div
          v-for="user in users"
          :key="user.chatUser.id"
          class="online_user"
          @click="getRoomName(user.chatUser.id)"
        >
          <router-link to="#" class="user-avatar-link">
            <div class="online_user-image">
              <img :src="user.chatUser.avatar" class="user-image" alt="" />
            </div>
          </router-link>
          <div class="online_user-info">
            <router-link to="#" class="user-name-link">
              <div class="user-name">{{ user.chatUser.name }}</div>
            </router-link>
            <div class="user-account">@{{ user.chatUser.account }}</div>
          </div>
          <p class="user-recentchat">{{ user.content }}</p>
        </div>
        <!-- <div class="online_user">
          <router-link to="#" class="user-avatar-link">
            <div class="online_user-image">
              <img
                src="./../assets/Photo_avatar.png"
                class="user-image"
                alt=""
              />
            </div>
          </router-link>
          <div class="online_user-info">
            <router-link to="#" class="user-name-link">
              <div class="user-name">User2</div>
            </router-link>
            <div class="user-account">@account</div>
          </div>
        </div> -->
      </div>
      <div class="chat_room">
        <div class="chat_room-part">
          <div class="chat-title">
            <p>私人聊天室</p>
          </div>
          <div class="chat_room-part-container scrollbar" ref="chatContainer">
            <div class="chat-content">
              <ChatMessage
                @after-retrieve-allMessage="scrollToBottom"
                :roomName="roomName"
              />
            </div>
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
import ChatMessage from "./../components/ChatMessage.vue";
import chatAPI from "./../apis/chat";
import userAPI from "./../apis/users";
import { mapState } from "vuex";
export default {
  name: "PrivateChatRoom",
  components: {
    ChatMessage,
  },
  data() {
    return {
      chatUserId: undefined,
      users: [],
      roomName: "",
      inputMessage: "",
    };
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.currentUserModule.currentUser,
    }),
  },
  created() {
    this.$store.commit(
      "statusControlModule/toggleTopUsersDisplayStatus",
      "private-chatroom"
    );
    this.$socket.open();
    const { id } = this.$route.params;
    this.chatUserId = id;
    this.fetchLatest();
  },
  beforeDestroy() {
    this.leaveRoom();
  },
  methods: {
    async fetchLatest() {
      try {
        const response = await chatAPI.getLatest();
        if (response.status !== 200) throw new Error(response.statusText);
        this.users= [...response.data]
        this.getRoomName(this.chatUserId);
      } catch (error) {
        console.log(error);
      }
    },
    async getRoomName(id) {
      const userId = id ? id : this.users[0].chatUser.id;
      try {
        if (!this.users.some((user) => user.chatUser.id === +userId)) {
          const response = await userAPI.getUsers({ userId });
          if (response.status !== 200) throw new Error(response.statusText);
          const data = response.data;
          const user = {}
          user.chatUser = {
            id:data.id,
            name:data.name,
            avatar:data.avatar,
            account:data.account
          }
          this.users.push(user) 
        }
        const tempt = [this.currentUser.id, userId];
        tempt.sort((a, b) => a - b);
        tempt.splice(1, 0, "R");
        this.roomName = tempt.join("");
        this.joinRoom();
      } catch(error) {
        console.log(error);
      }
    },
    handleSendChatBtnClicked() {
      this.$socket.emit("sendMessage", {
        roomName: this.roomName,
        UserId: this.currentUser.id,
        content: this.inputMessage,
      });
      this.inputMessage = "";
      this.scrollToBottom();
    },
    scrollToBottom() {
      this.$refs.chatContainer.scrollTo({
        top: this.$refs.chatContainer.scrollHeight,
        behavior: "smooth",
      });
    },
    joinRoom() {
      this.$socket.emit("join-room", this.roomName);
    },
    leaveRoom() {
      this.$socket.emit("leave-room", this.roomName);
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  height: 1200px;
  flex: 1;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  height: 55px;
  border-bottom: 1px solid #e6ecf0;
  p {
    line-height: 55px;
    margin-left: 15px;
  }
  img {
    height: 22px;
    width: 22px;
    margin-right: 1rem;
    cursor: pointer;
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
    .user-recentchat {
      width: 300px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
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
      height: 100%;
      width: 100%;
      padding: 8px;
      overflow: scroll;
      .chat-content {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 100%;
      }
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
