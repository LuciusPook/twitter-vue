<template>
  <div class="popular">
    <div class="popular-items">
      <h3>Popular</h3>
      <div class="popular-container">
        <div class="popular-list" v-for="user in topUsers" :key="user.id">
          <div class="popular-info">
            <div class="avatar">
              <router-link
                :to="{ name: 'user-profile', params: { id: user.id } }"
                ><img :src="user.avatar | emptyImage" alt="avatar"
              /></router-link>
            </div>
            <div class="user-info">
              <router-link
                :to="{ name: 'user-profile', params: { id: user.id } }"
                >{{ user.name }}</router-link
              >
              <router-link
                :to="{ name: 'user-profile', params: { id: user.id } }"
                class="popular-email"
                >@{{ user.account }}</router-link
              >
            </div>
          </div>
          <div class="button">
            <button
              type="button"
              class="unfollow-btn"
              :name="user.id"
              v-if="user.isFollowed"
              :disabled="isProcessing"
              @click.prevent.stop="deleteFollow(user.id)"
            >
              正在跟隨
            </button>
            <button
              type="button"
              class="follow-btn"
              v-else
              :disabled="isProcessing"
              @click.prevent.stop="addFollow(user.id)"
            >
              跟隨
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import { emptyImageFilter } from "./../utils/mixins";

export default {
  mixins: [emptyImageFilter],

  props: {
    initialIsFollowed: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      topUsers: [],
      isFollowed: this.initialIsFollowed,
      isProcessing: false,
    };
  },

  watch: {
    initialIsFollowed(newValue) {
      this.isFollowed = newValue;
    },
  },

  created() {
    this.fetchTopUsers();
  },

  methods: {
    async fetchTopUsers() {
      try {
        const { data } = await usersAPI.getTopUsers();
        this.topUsers = data;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得人氣使用者名單",
        });
      }
    },

    async addFollow(id) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.postFollow({ id });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.topUsers.map((user) => {
          if (user.id === id) {
            user.isFollowed = true;
            this.isFollowed = true;
          }
          return user;
        });

        Toast.fire({
          icon: "success",
          title: "跟隨成功",
        });

        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法跟隨，請稍後再試",
        });
      }
    },

    async deleteFollow(id) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.deleteFollow({ followingId: id });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.topUsers.map((topUser) => {
          if (topUser.id === id) {
            topUser.isFollowed = false;
            this.isFollowed = false;
          }
          return topUser;
        });

        Toast.fire({
          icon: "success",
          title: "成功取消跟隨",
        });

        this.isProcessing = false;
      } catch (error) {
        console.log(error);
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法取消跟隨，請稍後再試",
        });
      }
    },
  },
};
</script>



<style lang="scss" scoped>
.popular {
  width: 30%;
  height: 100%;
  overflow: overlay;
  display: flex;
  flex-direction: column;
  justify-content: start;
  border-left: 1px solid #e6ecf0;
}

.popular-items {
  width: 350px;
  height: 756px;
  margin: 15px 80px 20px 30px;
  background: #f5f8fa;
  border-radius: 14px;
}

.popular-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-top: 1px solid #e6ecf0;
}

h3 {
  padding: 10px 15px;
}

img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.popular-info {
  display: flex;
}

.user-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  margin-left: 10px;
}

.popular-name {
  font-size: 15px;
}

.popular-email {
  font-size: 15px;
  color: #657786;
}

button {
  width: 90px;
  height: 35px;
  border: 1px solid #ff6600;
  background: transparent;
  color: #ff6600;
  transition: all 0.3s ease-in-out;
}

.unfollow-btn {
  background-color: #ff6600;
  color: #fff;
}

.unfollow-btn:hover {
  background: #fff;
  color: #ff6600;
}

button:hover {
  background: #ff6600;
  color: #fff;
}
</style>