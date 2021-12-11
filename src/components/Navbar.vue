<template>
  <div class="menu">
    <div class="navbar">
      <a>
        <img 
          src="./../assets/Icon@ac-icon.svg" 
          alt="Logo" 
          class="logo" 
          @click="redirectMainPage(currentUser.role)"
        />
      </a>
      <div class="navbar-options">
        <div class="navbar-list">
          <template v-if="currentUser.role !== 'admin'">
            <div
              :class="[
                'navbar-item',
                'page-item',
                { active: currentPage === 'main' },
              ]"
              @click="switchCurrentDisply('main')"
            >
              <router-link to="/main">
                <img
                  v-if="currentPage === 'main'"
                  src="./../assets/Vector_home-action.svg"
                  alt="main"
                />
                <img
                  v-else
                  src="./../assets/Vector_home-icon.svg"
                  alt="main-unselected"
                />
                首頁
              </router-link>
            </div>
            <div
              :class="[
                'navbar-item',
                'page-item',
                { active: currentPage === 'profile' },
              ]"
              @click="switchCurrentDisply('profile')"
            >
              <router-link
                :to="{ name: 'user', params: { id: currentUser.id } }"
              >
                <img
                  v-if="currentPage === 'profile'"
                  src="./../assets/Vector_user-action.svg"
                  alt="user-info"
                />
                <img
                  v-else
                  src="./../assets/Vector_user-icon.svg"
                  alt="user-info-unselected"
                />
                個人資料
              </router-link>
            </div>
            <div
              :class="[
                'navbar-item',
                'page-item',
                { active: currentPage === 'chat-room' },
              ]"
              @click="switchCurrentDisply('setting')"
            >
              <router-link :to="{ name: 'chat-room' }">
                <img src="./../assets/Vector_message-icon.svg" alt="message" />
                <img
                  src="./../assets/Vector_message-action.svg"
                  alt="message-unselected"
                />

                聊天室
              </router-link>
            </div>
            <div
              :class="[
                'navbar-item',
                'page-item',
                { active: currentPage === 'setting' },
              ]"
              @click="switchCurrentDisply('setting')"
            >
              <router-link :to="{ name: 'setting' }">
                <img
                  v-if="currentPage === 'setting'"
                  src="./../assets/Vector_cogsetting-action.svg"
                  alt="cogsetting"
                />
                <img
                  v-else
                  src="./../assets/Vector_cogsetting-icon.svg"
                  alt="cogsetting-unselected"
                />
                設定
              </router-link>
            </div>
          </template>
          <template v-else>
            <div
              :class="[
                'navbar-item',
                'page-item',
                { active: currentPage === 'tweets' },
              ]"
              @click="switchCurrentDisply('tweets')"
            >
              <router-link to="/admin/tweets">
                <img
                  v-if="currentPage === 'tweets'"
                  src="./../assets/Vector_home-icon.svg"
                  alt="tweets-list"
                />
                <img
                  v-else
                  src="./../assets/Vector_home-action.svg"
                  alt="tweets-list-unselectd"
                />
                推文清單
              </router-link>
            </div>
            <div
              :class="[
                'navbar-item',
                'page-item',
                { active: currentPage === 'users-page' },
              ]"
              @click="switchCurrentDisply('users-page')"
            >
              <router-link to="/admin/users">
                <img
                  v-if="currentPage === 'users-page'"
                  src="./../assets/Vector_user-action.svg"
                  alt="users-cards"
                />
                <img
                  v-else
                  src="./../assets/Vector_user-icon.svg"
                  alt="users-unselected"
                />
                使用者列表
              </router-link>
            </div>
          </template>
        </div>
      </div>
      <button
        v-if="currentUser.role !== 'admin'"
        class="show-tweet-modal"
        @click="showCreateModal"
      >
        推文
      </button>
    </div>
    <div class="logout" @click="logout">
      <img src="./../assets/Vector_logout-icon.svg" alt="logout" />
      <span class="cursor-pointer">登出</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "../utils/helpers";

export default {
  name: "Navbar",
  data() {
    return {
      currentPage: "",
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },

  methods: {
    showCreateModal() {
      this.$emit("show-create-modal");
    },
    logout() {
      Toast.fire({
        icon: "success",
        title: "已登出",
      });
      this.$store.commit("revokeAuthentication");
      this.$router.push("/login");
    },
    switchCurrentDisply(mode) {
      switch (mode) {
        case "main":
          this.currentPage = "main";
          break;
        case "profile":
          this.currentPage = "profile";
          break;
        case "setting":
          this.currentPage = "setting";
          break;
        case "chat-room":
          this.currentPage = "chat-room";
          break;
        case "tweets":
          this.currentPage = "tweets";
          break;
        case "users-page":
          this.currentPage = "users-page";
          break;
      }
    },
    redirectMainPage(role){
      if(role === 'admin'){
        this.$router.push({ name: 'admin-tweets' })
      }else{
        this.$router.push({ name: 'main' })
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.menu {
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .navbar {
    // height: 100%;
    padding: 14px 0 0 70px;
    border-right: 1px solid #e6ecf0;
  }
}

img.logo {
  width: 30px;
  height: 30px;
}

img {
  width: 24px;
  height: 24px;
  margin-right: 21px;
}

.logo {
  margin-bottom: 35px;
  cursor: pointer;
}

a {
  display: flex;
  align-items: center;
  margin-bottom: 35px;
  font-weight: bold;
}

a:hover {
  color: #ff6600;
}

button {
  width: 210px;
  height: 38px;
}

.logout {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0 0 14px 70px;
  border-right: 1px solid #e6ecf0;
  font-weight: bold;
}

span:hover {
  color: #ff6600;
}

.page-item .active {
  color: #ff6600;
  z-index: 1;
}
</style>