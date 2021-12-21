<template>
  <div class="container">
    <div class="admin_users">
        <div class="admin_users-title">
          <p>使用者列表</p>
        </div>
        <!-- card -->
        <div class="user_cards scrollbar">
          <Spinner v-if="isLoading" />
          <template v-else>
            <div
              class="user_cards-profile"
              v-for="user in adminUsers"
              :key="user.id"
            >
              <div class="cover-part">
                <img
                  :src="user.cover | emptyImage"
                  class="cover-img"
                  alt="cover"
                />
              </div>
              <div class="avatar-part">
                <img
                  :src="user.avatar | emptyImage"
                  class="avatar-img"
                  alt="avatar"
                />
              </div>
              <div class="users_detail">
                <div class="users_detail-name">{{ user.name }}</div>
                <div class="users_detail-account">@{{ user.account }}</div>
                <div class="users_detail-action">
                  <div class="user-reply">
                    <img
                      src="./../assets/Vector_reply-icon.svg"
                      class="reply"
                      alt="reply"
                    />
                    <span class="reply-count">{{ user.tweetsCount }}</span>
                  </div>
                  <div class="user-like">
                    <img
                      src="./../assets/Vector_like-icon.svg"
                      class="like"
                      alt="like"
                    />
                    <span class="like-count">{{ user.likeCount }}</span>
                  </div>
                </div>
                <div class="follow-info">
                  <a class="followings-link"
                    ><div class="followings">
                      <span>{{ user.followingsCount }}</span
                      >追蹤中
                    </div>
                  </a>
                  <a class="followers-link"
                    ><div class="followers">
                      <span>{{ user.followersCount }}</span
                      >追蹤者
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </template>
        </div>
    </div>
  </div>
</template>


<script>
import { emptyImageFilter } from "./../utils/mixins";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";

export default {
  name: "users-page",
  mixins: [emptyImageFilter],
  components: {
    Spinner,
  },

  data() {
    return {
      currentPage: "users-page",
      adminUsers: [],
      isLoading: false,
    };
  },

  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchAdminUsers(id);
    next();
  },

  created() {
    this.$store.commit('toggleTopUsersDisplayStatus' , 'admin-users')
    this.fetchAdminUsers();
  },

  methods: {
    async fetchAdminUsers() {
      this.isLoading = true;
      try {
        const { data } = await adminAPI.getUsers();
        this.adminUsers = [...data];
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法讀取使用者資料，請稍後再試",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  flex: 1;
  max-height: 1200px;
}

.admin_users {
  &-title {
    position: fixed;
    width: 100%;
    height: 55px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #e6ecf0;
    background: #fff;
    z-index: 1;
    p {
      margin: 15px 27px;
    }
  }
}

.user_cards {
  display: grid;
  grid-template-columns: repeat(auto-fit , minmax(245px , 1fr));
  // grid-auto-flow: row;
  height: 1145px;
  padding-top: 55px;
  &-profile {
    position: relative;
    width: 245px;
    height: 314px;
    margin: 15px 0 15px 15px;
    border-radius: 10%;
    background: #f6f7f8;
    .cover-part,
    .cover-img {
      width: 245px;
      height: 140px;
      background: #c4c4c4;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .avatar-part {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      left: 72px;
      top: 70px;
      .avatar-img {
        width: 100px;
        height: 100px;
        background: #c4c4c4;
        border: 4px solid #fff;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .users_detail {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 33px;
      &-name {
        font-size: 15px;
        font-weight: 900;
      }
      &-account {
        font-size: 15px;
        color: #657786;
      }
      &-action {
        display: flex;
        justify-content: center;
        width: 100%;
        margin: 15px 0;
        .user-reply,
        .user-like {
          display: flex;
          margin-left: 15px;
          .reply,
          .like {
            width: 24px;
            height: 24px;
            margin-right: 7px;
          }
          .like-count,
          .reply-count {
            font-size: 15px;
            margin-right: 7px;
          }
        }
      }
    }
  }
}

.follow-info {
  display: flex;
  margin-left: 22px;
  .followings,
  .followers {
    font-size: 15px;
    margin-right: 5px;
    color: #657786;
    span {
      color: #000;
    }
  }
}
</style>