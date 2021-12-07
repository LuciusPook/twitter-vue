<template>
  <div class="container">
    <Spinner v-if="isLoading" />

    <!-- <Navbar :currentPage="currentPage" /> -->

    <div class="admin_tweets">
      <div class="admin_tweets-container">
        <div class="admin_tweets-title">
          <p>推文清單</p>
        </div>

        <!-- list -->
        <div class="users-container">
          <div class="users_list" v-for="tweet in admintweets" :key="tweet.id">
            <div class="users_list-image">
              <img
                :src="tweet.UserAvatar | emptyImage"
                class="users-img"
                alt="avatar"
              />
            </div>
            <div class="users_list-tweet">
              <div class="users_list-tweet-info">
                <router-link
                  :to="{ name: 'tweet', params: { id: tweet.id } }"
                  class="user-name-link"
                >
                  <div class="user-name">{{ tweet.UserName }}</div>
                </router-link>
                <router-link
                  :to="{ name: 'user-profile', params: { id: tweet.userId } }"
                  class="user-info-link"
                >
                  <div class="user-account">@{{ tweet.UserAccount }}</div>
                  <span></span>
                  <div class="create-time">
                    {{ tweet.createdAt | fromNow }}
                  </div>
                </router-link>
              </div>

              <div class="text-content">
                {{ tweet.description }}
              </div>
            </div>
            <div class="delete">
              <div
                class="delete-container cursor-pointer"
                @click="deleteTweet(tweet.id)"
              >
                <img
                  src="./../assets/Vector_close02-icon.svg"
                  class="delete-icon"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// import Navbar from "./../components/Navbar.vue";
import { fromNowFilter } from "./../utils/mixins";
import { emptyImageFilter } from "./../utils/mixins";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";

export default {
  mixins: [fromNowFilter, emptyImageFilter],

  components: {
    // Navbar,
    Spinner,
  },

  data() {
    return {
      currentPage: "tweets",
      admintweets: [],
      isLoading: true,
    };
  },

  created() {
    this.fetchAdminTweets();
  },
  methods: {
    async fetchAdminTweets() {
      try {
        this.isLoading = true;
        const { data } = await adminAPI.getTweets();

        this.admintweets = data.tweets;

        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得推文資料，請稍後再試",
        });
      }
    },

    async deleteTweet(tweetsId) {
      try {
        const { data } = await adminAPI.deleteTweet({ tweetsId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.admintweets = this.admintweets.filter(
          (tweet) => tweet.id !== tweetsId
        );

        Toast.fire({
          icon: "success",
          title: "成功刪除推文",
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法刪除推文，請稍後再試",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex: 1;
}

.admin_tweets {
  overflow: auto;
  height: 100%;
  flex: 1;
  &-title {
    font-size: 18px;
    font-weight: bold;
    padding: 15px 26px;
    margin-bottom: 6px;
    border-bottom: 1px solid #e6ecf0;
  }
}

.users_list {
  border-bottom: 1px solid #e6ecf0;
  display: flex;
  padding: 12px 15px;
  &-image {
    width: 50px;
    height: 50px;
    margin-right: 15px;
    .users-img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  &-tweet {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      .user-name {
        font-size: 15px;
        font-weight: bold;
        margin-right: 5px;
      }
      .user-name-link:hover {
        text-decoration: underline;
      }
      .user-info-link {
        display: flex;
        align-items: center;
      }
      .user-account,
      .create-time {
        font-size: 15px;
        color: #657786;
      }
      span {
        width: 3px;
        height: 3px;
        margin: 5px;
        border-radius: 50px;
        background: #657786;
      }
    }
    .text-content {
      font-size: 15px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      max-width: 24rem;
    }
  }
}

.delete-container:hover {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(192, 192, 192, 0.3);
  transition: all 0.2s ease-in-out;
  &:active {
    background: rgba(192, 192, 192, 0.7);
  }
}
.delete-icon {
  width: 24px;
  height: 24px;
}
</style>