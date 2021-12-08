 <template>
  <ul class="user__tweets">
    <li v-for="likedTweet in likedTweets" :key="likedTweet.TweetId">
      <div class="avatar__container">
        <router-link
          :to="{ name: 'user', params: { id: likedTweet.tweet_user_id } }"
        >
          <img
            :src="likedTweet.tweet_user_avatar | emptyImage"
            alt=""
            class="user__tweet--avatar"
          />
        </router-link>
      </div>
      <div class="user__tweet--content">
        <div class="tweet__content--title">
          <h3 class="tweet__user--name">{{ likedTweet.tweet_user_name }}</h3>
          <span class="tweet__user--account">
            <router-link
              :to="{ name: 'user', params: { id: likedTweet.tweet_user_id } }"
            >
              @{{ likedTweet.tweet_user_account }}
            </router-link>
            ．{{ likedTweet.createdAt | fromNow }}</span
          >
        </div>
        <p class="tweet__content--text">
          {{ likedTweet.description }}
        </p>
        <div class="tweet__content--interaction">
          <span class="tweet__interaction--replies">
            <img
              src="./../assets/Vector_reply-icon.svg"
              alt=""
              class="interaction__replies--icon"
              @click="handleReplyClicked(likedTweet.TweetId)"
            />
            <span class="interaction__replies--counts">{{
              likedTweet.reply_count
            }}</span>
          </span>
          <span class="tweet__interaction--likes">
            <img
              v-if="likedTweet.isLiked"
              src="./../assets/Vector_redLike-icon.svg"
              alt=""
              class="likes--icon"
              @click="deleteLike(likedTweet.TweetId)"
            />
            <img
              v-else
              src="./../assets/Vector_like-icon.svg"
              alt=""
              class="likes--icon"
              @click="addLike(likedTweet.TweetId)"
            />
            <span class="likes--counts">{{ likedTweet.like_count }}</span>
          </span>
        </div>
      </div>
    </li>
  </ul>
</template>

 <script>
import { emptyImageFilter } from "../utils/mixins";
import { fromNowFilter } from "../utils/mixins";
import { Toast } from "./../utils/helpers";
import tweetsAPI from "./../apis/tweets";

export default {
  name: "UserLikedTweets",
  mixins: [emptyImageFilter, fromNowFilter],
  props: {
    initialLikedTweets: {
      type: Array,
      default: () => [],
    },
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      likedTweets: this.initialLikedTweets,
    };
  },
  watch: {
    initialLikedTweets(newValue) {
      this.likedTweets = [...newValue];
    },
  },
  methods: {
    handleReplyClicked(tweetId) {
      this.$emit("after-reply-clicked", tweetId);
    },
    async addLike(tweetId) {
      try {
        const response = await tweetsAPI.like.addLike({ tweetId });
        if (response.status !== 200) throw new Error(response.statusText);
        this.likedTweets.map((tweet) => {
          if (tweet.id === tweetId) {
            tweet.isLiked = true;
            tweet.like_count++;
          }
        });
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
        this.likedTweets.map((tweet) => {
          if (tweet.id === tweetId) {
            tweet.isLiked = false;
            tweet.like_count--;
          }
        });
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
  },
};
</script>

 <style lang="scss" scoped>
.user__tweets {
  li {
    display: flex;
    height: 8.5rem;
    border: 1px solid $tweet-border;
    .avatar__container {
      padding: 0.5rem;
      img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
      }
    }
    .user__tweet--content {
      display: flex;
      flex-direction: column;
      padding: 0.5rem;
      .tweet__content--title {
        vertical-align: middle;
        .tweet__user--name {
          display: inline-block;
          font-size: 1rem;
        }
        .tweet__user--account {
          margin: 0 5px;
          font-size: 1rem;
          color: $account;
        }
      }
      .tweet__content--text {
        font-size: 15px;
        margin-top: 0.5rem;
        flex: 1;
        @include overflow-line-clamp(3);
      }
      .tweet__content--interaction {
        display: flex;
        padding: 1.2rem 0 0;
        > span {
          display: flex;
          margin-right: 3rem;
          img {
            height: 1rem;
            width: 1rem;
            margin-right: 0.5rem;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>  