<template>
  <div class="container">
    <div class="admin_tweets">
      <div class="admin_tweets-container">
        <div class="admin_tweets-title">
          <p>推文清單</p>
        </div>

        <!-- list -->
        <div class="tweets-container scrollbar">
          <Spinner v-if="isLoading" />
          <template v-else>
            <div
              class="users_list"
              v-for="tweet in admintweets"
              :key="tweet.id"
            >
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
                    :to="{ params: { id: tweet.id } }"
                    class="user-name-link"
                  >
                    <div class="user-name">{{ tweet.UserName }}</div>
                  </router-link>
                  <router-link
                    :to="{ params: { id: tweet.userId } }"
                    class="user-info-link"
                  >
                    <div class="user-account">@{{ tweet.UserAccount }}</div>
                    <span></span>
                    <div class="create-time">
                      {{ tweet.createdAt | timeTransForm }}
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
                  @click.stop.prevent="deleteTweet(tweet.id)"
                >
                  <img
                    src="./../assets/Vector_close02-icon.svg"
                    class="delete-icon"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { timeTransForm } from "./../utils/mixins";
import { emptyImageFilter } from "./../utils/mixins";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";

export default {
  name: "tweets",
  mixins: [timeTransForm, emptyImageFilter],

  components: {
    Spinner,
  },

  data() {
    return {
      currentPage: "tweets",
      admintweets: [],
      isLoading: true,
    };
  },

  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchAdminTweets(id);
    next();
  },

  created() {
    this.$store.commit(
      "statusControlModule/toggleTopUsersDisplayStatus",
      "admin-tweets"
    );
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

    async deleteTweet(tweetId) {
      this.isLoading = true;
      try {
        const response = await adminAPI.deleteTweet({ tweetId });
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        this.admintweets = this.admintweets.filter(
          (tweet) => tweet.id !== tweetId
        );
        this.isLoading = false;
        Toast.fire({
          icon: "success",
          title: "成功刪除推文",
        });
      } catch (error) {
        this.isLoading = false;
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
  flex: 1;
  // display: flex;
  // flex-direction: row;
  max-height: 1200px;
}

.admin_tweets {
  &-title {
    position: fixed;
    width: 100%;
    height: 55px;
    margin-bottom: 6px;
    padding: 15px 26px;
    background: #fff;
    border-bottom: 1px solid #e6ecf0;
    font-size: 18px;
    font-weight: bold;
  }
  .tweets-container {
    height: 1145px;
    width: 100%;
    padding-top: 55px;
  }
}

.users_list {
  display: flex;
  width: 100%;
  padding: 12px 15px;
  border-bottom: 1px solid #e6ecf0;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
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