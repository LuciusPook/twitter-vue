<template>
  <div class="tweet__container">
    <ReplyModal
      v-if="isReplying"
      @after-submit-reply="afterSubmitReply"
      :tweetId="clickedTweetId"
    />
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="tweet__navbar">
        <a class="tweet__navbar--prev" @click="$router.back()"></a>
        <div class="tweet__navbar--info">推文</div>
      </div>
      <div class="tweet__card">
        <div class="tweet__title">
          <div class="tweet__avatar--container">
            <router-link :to="{ name: 'user', params: { id: tweet.User.id } }">
              <img
                :src="tweet.User.avatar | emptyImage"
                alt=""
                class="tweet__avatar"
              />
            </router-link>
          </div>
          <div class="tweet__title--info">
            <h3 class="tweet__title--name">{{ tweet.User.name }}</h3>
            <router-link :to="{ name: 'user', params: { id: tweet.User.id } }">
              <p class="tweet__title--account">@{{ tweet.User.account }}</p>
            </router-link>
          </div>
        </div>
        <p class="tweet__context">
          {{ tweet.description }}
        </p>
        <span class="tweet__time">{{ tweet.createdAt | timeTransForm }}</span>
        <div class="tweet__counts">
          <span class="tweet__commentCounts"
            >{{ tweet.reply_count }}<span>回覆</span></span
          >
          <span class="tweet__likeCounts"
            >{{ tweet.like_count }}<span>喜歡次數</span></span
          >
        </div>
        <div class="tweet__interactions">
          <img
            src="./../assets/Vector_reply-icon.svg"
            alt=""
            class="tweet__commentBtn"
            @click="handleReplyModalToggle(tweet.id)"
          />
          <img
            v-if="tweet.isLiked"
            src="./../assets/Vector_redLike-icon.svg"
            alt=""
            class="tweet__likeBtn"
            @click="deleteLike(tweet.id)"
          />
          <img
            v-else
            src="./../assets/Vector_like-icon.svg"
            alt=""
            class="tweet__likeBtn"
            @click="addLike(tweet.id)"
          />
        </div>
      </div>
      <div class="tweet__replies--container scroll">
        <ul class="tweet__replies">
          <li
            v-for="tweetReply in tweetReplies"
            :key="tweetReply.id"
            class="tweet__reply"
          >
            <div class="reply__avatar--container">
              <img
                :src="tweetReply.User.avatar | emptyImage"
                alt=""
                class="reply__avatar"
              />
            </div>
            <div class="tweet__reply--content">
              <div class="tweet__reply--title">
                <h3 class="reply__user--name">{{ tweetReply.User.name }}</h3>
                <span class="reply__user--account">
                  <router-link
                    :to="{ name: 'user', params: { id: tweetReply.User.id } }"
                  >
                    <span>{{ tweetReply.User.account }}</span>
                  </router-link>
                  <span>．{{ tweetReply.createdAt | fromNow }}</span>
                </span>
              </div>
              <p class="tweet__reply--tag">
                <span>回覆</span>
                <router-link
                  :to="{ name: 'user', params: { id: tweet.User.id } }"
                >
                  <span class="tweet__account">
                    {{ tweet.User.account }}
                  </span>
                </router-link>
              </p>
              <p class="tweet__reply--text">
                {{ tweetReply.comment }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>
<script>
import ReplyModal from "./../components/ReplyModal.vue";
import Spinner from "./../components/Spinner.vue";
import tweetsAPI from "./../apis/tweets";
import { Toast } from "./../utils/helpers";
import { fromNowFilter } from "../utils/mixins";
import { timeTransForm } from "../utils/mixins";
import { emptyImageFilter } from "../utils/mixins";
import { mapState } from "vuex";
export default {
  name: "Tweet",
  components: {
    ReplyModal,
    Spinner,
  },
  mixins: [fromNowFilter, timeTransForm, emptyImageFilter],
  data() {
    return {
      tweet: {},
      tweetReplies: [],
      isLoading: false,
    };
  },
  computed: mapState({
    isReplying: (state) => state.statusControlModule.isReplying,
  }),
  // {
  //   ...mapState(['isReplying'])
  // },
  created() {
    this.$store.commit(
      "statusControlModule/toggleTopUsersDisplayStatus",
      "tweets"
    );
    const { id } = this.$route.params;
    this.fetchTweet(id);
    this.fetchTweetReplies(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchTweet(id);
    this.fetchTweetReplies(id);
    next();
  },
  methods: {
    async fetchTweet(tweetId) {
      this.isLoading = true;
      try {
        const response = await tweetsAPI.getTweet({ tweetId });
        if (response.status !== 200) throw new Error(response.statusText);
        const data = response.data;
        const {
          id,
          description,
          UserId,
          createdAt,
          like_count,
          reply_count,
          User,
          isLiked,
        } = data;
        this.tweet = {
          ...this.tweet,
          id,
          description,
          UserId,
          createdAt,
          like_count,
          reply_count,
          User,
          isLiked,
        };
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法得到推文資料，請稍後再試!",
        });
      }
    },
    async fetchTweetReplies(tweetId) {
      this.isLoading = true;
      try {
        const response = await tweetsAPI.reply.getReplies({ tweetId });
        if (response.status !== 200) throw new Error(response.statusText);
        const data = response.data;
        this.tweetReplies = [...data];
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法得到推文回覆，請稍後再試!",
        });
      }
    },
    async addLike(tweetId) {
      try {
        const response = await tweetsAPI.like.addLike({ tweetId });
        if (response.status !== 200) throw new Error(response.statusText);
        this.tweet.isLiked = true;
        Toast.fire({
          icon: "success",
          title: "成功對推文按讚",
        });
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法對推文按讚，請稍後再試",
        });
      }
    },
    async deleteLike(tweetId) {
      try {
        const response = await tweetsAPI.like.deleteLike({ tweetId });
        if (response.status !== 200) throw new Error(response.statusText);
        this.tweet.isLiked = false;
        Toast.fire({
          icon: "success",
          title: "成功取消推文按讚",
        });
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取消推文按讚，請稍後再試",
        });
      }
    },
    handleReplyModalToggle(tweetId) {
      this.$store.commit("statusControlModule/toggleReplyModal");
      this.clickedTweetId = tweetId;
    },
    afterSubmitReply(payload) {
      if (payload.status === 200) {
        this.tweet.reply_count++;
        this.fetchTweetReplies(this.tweet.id);
        Toast.fire({
          icon: "success",
          title: "成功回覆推文",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "無法回覆推文，請稍後再試!",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.tweet__container {
  height: 1200px;
  position: relative;
  flex: 1;
  .tweet__navbar {
    display: flex;
    height: 55px;
    border-bottom: 1px solid $tweet-border;
    .tweet__navbar--prev {
      position: relative;
      flex-basis: 5rem;
      &::before {
        content: "\279C";
        position: absolute;
        top: 50%;
        left: 30%;
        transform: translateX(-50%) translateY(-50%) rotate(180deg);
      }
    }
    .tweet__navbar--info {
      flex: 1;
      line-height: 55px;
      font-size: 18px;
      font-weight: 700;
    }
  }
  .tweet__card {
    display: flex;
    flex-direction: column;
    height: 399px;
    .tweet__title {
      display: flex;
      height: 5rem;
      .tweet__avatar--container {
        position: relative;
        width: 5rem;
        img {
          border-radius: 50%;
          position: absolute;
          @extend %position-center;
          height: 50px;
          width: 50px;
        }
      }
      .tweet__title--info {
        flex: 1;
        padding: 18px 0;
        font-size: 15px;
        .tweet__title--name {
          font-weight: 700;
        }
        .tweet__title--account {
          font-weight: 500;
        }
      }
    }
    .tweet__context {
      flex: 1;
      font-size: 23px;
      line-height: 35px;
      padding: 0 15px;
      @include overflow-line-clamp(4);
    }
    .tweet__time {
      font-size: 15px;
      font-weight: bold;
      color: $account;
      margin: 0.5rem 15px;
    }
    .tweet__counts {
      font-size: 19px;
      height: 68px;
      padding: 20px;
      border-top: 1px solid $tweet-border;
      border-bottom: 1px solid $tweet-border;
      span {
        font-weight: bold;
        font-size: 19px;
        margin-right: 20px;
        span {
          color: $follow-text;
        }
      }
    }
    .tweet__interactions {
      display: flex;
      align-items: center;
      height: 68px;
      margin-left: 15px;
      img {
        height: 25px;
        width: 25px;
        margin-right: 155px;
        cursor: pointer;
      }
    }
  }
  .tweet__replies--container {
    height: calc(1200px - 55px - 399px);
    .tweet__replies {
      .tweet__reply {
        height: 105px;
        display: flex;
        border: 1px solid $tweet-border;
        .reply__avatar--container {
          position: relative;
          width: 5rem;
          img {
            position: absolute;
            top: 18px;
            left: 50%;
            transform: translateX(-50%);
            height: 50px;
            width: 50px;
            border-radius: 50%;
          }
        }
        .tweet__reply--content {
          flex: 1;
          .tweet__reply--title {
            display: flex;
            align-items: center;
            font-size: 15px;
            margin-top: 15px;
            margin-bottom: 4px;
            .reply__user--name {
              font-weight: 700;
              margin-right: 5px;
            }
            .reply__user--account {
              span {
                color: $account;
                vertical-align: middle;
              }
            }
          }
          .tweet__reply--tag {
            font-size: 15px;
            span {
              vertical-align: middle;
            }
            .tweet__account {
              color: $reply-account;
            }
          }
          .tweet__reply--text {
            flex: 1;
            @include overflow-line-clamp(2);
          }
        }
      }
    }
  }
}
</style>