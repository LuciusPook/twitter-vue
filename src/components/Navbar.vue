<template>
  <div class="menu" v-show="isAuthenticated">
    <div class="navbar">
      <a>
        <img src="https://i.ibb.co/WD1YSyW/Logo.jpg" alt="Logo" class="logo" />
      </a>
      <div class="navbar-options">
        <div class="navbar-list">
          <template v-if="currentUser.role !== 'admin'">
            <div
              class="navbar-item"
              :class="['page-item', { active: currentPage === 'main' }]"
            >
              <router-link to="/main">
                <img
                  src="./../assets/Vector_home-action.svg"
                  alt="main"
                  v-if="currentPage === 'main'"
                />
                <img
                  src="./../assets/Vector_home-icon.svg"
                  alt="main-unselected"
                  v-else
                />
                首頁
              </router-link>
            </div>
            <div
              class="navbar-item"
              :class="['page-item', { active: currentPage === 'profile' }]"
            >
              <router-link
                :to="{ name: 'user', params: { id: currentUser.id } }"
              >
                <img
                  src="./../assets/Vector_user-action.svg"
                  alt="user-info"
                  v-if="
                    currentPage === 'profile' &&
                    $route.params.id === currentUser.id
                  "
                />
                <img
                  src="./../assets/Vector_user-icon.svg"
                  alt="user-info-unselected"
                  v-else
                />
                個人資料
              </router-link>
            </div>
            <div
              class="navbar-item"
              :class="['page-item', { active: currentPage === 'setting' }]"
            >
              <router-link
                :to="{ name: 'setting', params: { id: currentUser.id } }"
              >
                <img
                  src="./../assets/Vector_cogsetting-action.svg"
                  alt="cogsetting"
                  v-if="currentPage === 'setting'"
                />
                <img
                  src="./../assets/Vector_cogsetting-icon.svg"
                  alt="cogsetting-unselected"
                  v-else
                />
                設定
              </router-link>
            </div>
          </template>
          <template v-if="currentUser.role === 'admin'">
            <div
              class="navbar-item"
              :class="['page-item', { active: currentPage === 'tweets' }]"
            >
              <router-link to="/admin/tweets">
                <img
                  src="./../assets/Vector_home-icon.svg"
                  alt="tweets-list"
                  v-if="currentPage === 'tweets'"
                />
                <img
                  src="./../assets/Vector_home-action.svg"
                  alt="tweets-list-unselectd"
                  v-else
                />
                推文清單
              </router-link>
            </div>
            <div
              class="navbar-item"
              :class="['page-item', { active: currentPage === 'users-page' }]"
            >
              <router-link to="/admin/users">
                <img
                  src="./../assets/Vector_user-action.svg"
                  alt="users-cards"
                  v-if="currentPage === 'users-page'"
                />
                <img
                  src="./../assets/Vector_user-icon.svg"
                  alt="users-unselected"
                  v-else
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
  props: {
    currentPage: {
      type: [String, Boolean],
      require: true,
    },
  },
  data() {
    return {
      // currentPage: [],
    };
  },

  watch: {
    currentPage(newValue) {
      this.currentPage = {
        ...newValue,
      };
    },
  },

  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
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
  },
};
</script>

<style lang="scss" scoped>
.menu {
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .navbar {
    height: 100%;
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