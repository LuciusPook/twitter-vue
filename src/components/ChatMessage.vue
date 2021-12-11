<template>
  <div class="message-container">
    <!-- 顯示上線或離線 -->
    <template>
      <div class="online-container">
        <div class="online-user">
          <div class="online-user-name">User55555 上線</div>
        </div>
        <div class="offline-user">
          <div class="offline-user-name">User4 離線</div>
        </div>
      </div>
    </template>
    <!-- 做判斷顯示 -->
    <template>
      <div class="self-message">
        <div class="self-container">
          <div class="self-message__info">
            <div class="self-message__info__content">
              <div class="message-text">how are you?</div>
            </div>
            <div class="submit-time">3 days</div>
          </div>
        </div>
      </div>
    </template>
    <!-- 做判斷顯示 -->
    <template>
      <div class="user_message">
        <div class="user_content">
          <div class="profile-image">
            <img src="./../assets/Photo_avatar.png" class="user-img" alt="" />
          </div>
          <div class="user_content-info">
            <div class="info-container">
              <div class="message-text">hi,i am top user</div>
            </div>
            <div class="submit-time">a few minutes</div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
</script>


<style lang="scss" scoped>
.online-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
  .online-user,
  .offline-user {
    margin: 7px;
    border-radius: 50px;
    background: #e5e5e5;
    .online-user-name,
    .offline-user-name {
      margin: 7px 14px;
      font-size: 15px;
      color: #657786;
    }
  }
}

.self-message {
  &__info {
    display: flex;
    flex-direction: column;
    height: auto;
    margin-right: 10px;
    align-items: flex-end;
    &__content {
      min-height: 40px;
      max-width: 300px;
      background: #ff6000;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;
      border-bottom-left-radius: 30px;
    }
  }
}

.user_content {
  display: flex;
  flex-direction: row;
  &-info {
    display: flex;
    flex-direction: column;
    height: auto;
    margin-left: 10px;
    .info-container {
      min-height: 40px;
      width: auto;
      max-width: 300px;
      background: #e6ecf0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;
      border-bottom-right-radius: 30px;
    }
  }
}

.message-text {
  font-size: 15px;
  line-height: 23px;
  margin: 13px;
  word-break: break-all;
}

.submit-time {
  font-size: 8px;
  color: #657786;
  margin-top: 3px;
}

.user-img {
  width: 50px;
  height: 50px;
  margin-left: 15px;
  border-radius: 50%;
}
</style>