 <template>
  <ul class="user__tweets scrollbar">
    <li v-for="tweet in userTweets" :key="tweet.id">
      <div class="avatar__container">
        <router-link :to="{ name: 'user', params: { id: user.id } }">
          <img
            :src="user.avatar | emptyImage"
            alt=""
            class="user__tweet--avatar"
          />
        </router-link>
      </div>
      <div class="user__tweet--content">
        <div class="tweet__content--title">
          <h3 class="tweet__user--name">{{ user.name }}</h3>
          <span class="tweet__user--account">
            <router-link :to="{ name: 'user', params: { id: user.id } }">
              @{{ user.account }}
            </router-link>
            <span> ．{{ tweet.createdAt | fromNow }} </span>
          </span>
        </div>

        <p class="tweet__content--text">
          <router-link :to="{ name: 'tweet', params: { id: tweet.id } }">
            {{ tweet.description }}
          </router-link>
        </p>
        <div class="tweet__content--interaction">
          <span class="tweet__interaction--replies">
            <img
              src="./../assets/Vector_reply-icon.svg"
              alt=""
              class="interaction__replies--icon"
              @click="handleReplyClicked(tweet.id)"
            />
            <span class="interaction__replies--counts">{{
              tweet.reply_count
            }}</span>
          </span>
          <span class="tweet__interaction--likes">
            <img
              v-if="tweet.isLiked && !isLoading"
              src="./../assets/Vector_redLike-icon.svg"
              alt=""
              class="likes--icon"
              @click="deleteLike(tweet.id)"
            />
            <img
              v-else-if="!tweet.isLiked&&!isLoading"
              src="./../assets/Vector_like-icon.svg"
              alt=""
              class="likes--icon"
              @click="addLike(tweet.id)"
            />
            <span class="likes--counts">{{ tweet.like_count }}</span>
          </span>
        </div>
      </div>
    </li>
  </ul>
</template>

 <script>
import { mapState } from "vuex";
import { emptyImageFilter } from "../utils/mixins";
import { fromNowFilter } from "../utils/mixins";
import { Toast } from "./../utils/helpers";
import tweetsAPI from "./../apis/tweets";
export default {
  name: "UserTweets",
  mixins: [emptyImageFilter, fromNowFilter],
  props: {
    initialTweets: {
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
      userTweets: this.initialTweets,
      isLoading:false
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  watch: {
    initialTweets(newValue) {
      this.userTweets = [...newValue];
    },
  },
  methods: {
    handleReplyClicked(tweetId) {
      this.$emit("after-reply-clicked", tweetId);
    },
    async addLike(tweetId) {
      this.isLoading = true
      try {
        const response = await tweetsAPI.like.addLike({ tweetId });
        if (response.status !== 200) throw new Error(response.statusText);
        this.userTweets.map( tweet => {
          if(tweet.id === tweetId){
            tweet.isLiked = true
            tweet.like_count++
          }
        })
        Toast.fire({
          icon: "success",
          title: "成功對推文按讚",
        });
      this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法對推文按讚，請稍後再試",
        });
      }
    },
    async deleteLike(tweetId) {
      this.isLoading = true
      try {
        const response = await tweetsAPI.like.deleteLike({ tweetId });
        if (response.status !== 200) throw new Error(response.statusText);
        this.userTweets.map( tweet => {
          if(tweet.id === tweetId){
            tweet.isLiked = false
            tweet.like_count--

          }
        })
        Toast.fire({
          icon: "success",
          title: "成功取消推文按讚",
        });
      this.isLoading = false
      } catch (error) {
        this.isLoading = false
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
  height: 100%;
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
          > a {
            margin: 0 5px;
            font-size: 1rem;
            color: $reply-account;
          }
        }
      }
      .tweet__content--text {
        margin-top: 0.5rem;
        flex: 1;
        @include overflow-line-clamp(3);
      }
      .tweet__content--interaction {
        display: flex;
        margin: 0.5rem 0;
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