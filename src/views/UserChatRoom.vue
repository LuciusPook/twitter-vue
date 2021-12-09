<template>
  <div class="container">
    <div class="online_users">
      <div class="online_users-part">
        <div class="user-title">
          <p>上線用戶(1)</p>
        </div>
        <div class="online_user">
          <router-link to="#" class="user-avatar-link">
            <div class="online_user-image">
              <img
                src="https://i.imgur.com/qRezTy6.pnge"
                class="user-image"
                alt=""
              />
            </div>
          </router-link>
          <div class="online_user-info">
            <router-link to="#" class="user-name-link">
              <div class="user-name">username</div>
            </router-link>
            <div class="user-account">@user.account</div>
          </div>
        </div>
        <div class="online_user">
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
              <div class="user-name">username</div>
            </router-link>
            <div class="user-account">@user.account</div>
          </div>
        </div>
      </div>
      <div class="chat_room">
        <div class="chat_room-part">
          <div class="chat-title">
            <p>聊天室</p>
          </div>
          <div class="chat_room-part-container scrollbar">
            <div class="chat-content">
              <ChatMessage />
            </div>
          </div>
          <div class="chat_room-part-input">
            <div class="input-container">
              <textarea
                cols="30"
                class="message-input"
                rows="10"
                placeholder="輸入訊息..."
                @keydown="autoTextAreaHeight"
                v-model="inputMessage"
              ></textarea>
              <div class="input-button cursor-pointer">
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
export default {
  components: {
    ChatMessage,
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
    flex-direction: row;
    &-part {
      width: 50%;
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
  width: 50%;
  height: 1200px;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e6ecf0;
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
  background: #f0f0f0;
}

.input-button img {
  width: 35px;
  height: 35px;
}
</style>
