<template>
  <div class="main">
    <Spinner v-if="isLoading" />
    <template v-else>
      <ReplyModal
        v-if="isReplying"
        @after-submit-reply="afterSubmitReply"
        :tweetId="clickedTweetId"
      />
      <div class="main__navbar">首頁</div>
      <div class="createTweet">
        <div class="createTweet__avatar--wrapper">
          <router-link :to="{ name: 'user', params: { id: currentUser.id } }">
            <img
              :src="currentUser.avatar | emptyImage"
              alt=""
              class="createTweet__avatar"
            />
          </router-link>
        </div>
        <div :class="['form__group', { edit: isEditing }]">
          <textarea
            class="newTweet form__control"
            :rows="textareaRows"
            name="newTweet"
            id="newTweet"
            placeholder="有什麼新鮮事?"
            @focus="handleTextareaFocused"
            @blur="handleTextareaBlurred"
            v-model="newTweetText"
            @keydown="newPostRestriction"
          />
          <button type="submit" @click="createNewTweet(newTweetText)">
            推文
          </button>
        </div>
      </div>
      <div class="main__tweets--container scrollbar">
        <ul class="main__tweets">
          <li class="main__tweet" v-for="tweet in tweets" :key="tweet.id">
            <div class="tweet__avatar--wrapper">
              <router-link :to="{ name: 'user', params: { id: tweet.UserId } }">
                <img
                  :src="tweet.User.avatar | emptyImage"
                  alt=""
                  class="tweet__avatar"
                />
              </router-link>
            </div>
            <div class="tweet__content">
              <p class="tweet__title">
                <span class="tweet__tweeter--name">{{ tweet.name }}</span>
                <router-link
                  :to="{ name: 'user', params: { id: tweet.UserId } }"
                  class="tweet__tweeter--account"
                  >@{{ tweet.User.account }}
                </router-link>
                <span class="tweet__createdTime"
                  >．{{ tweet.createdAt | fromNow }}</span
                >
              </p>
              <router-link
                class="tweet__text--container"
                :to="{ name: 'tweet', params: { id: tweet.id } }"
              >
                <p class="tweet__text">
                  {{ tweet.description }}
                </p>
              </router-link>
              <div class="tweet__content--interaction">
                <span class="tweet__interaction--replies">
                  <img
                    src="./../assets/Vector_reply-icon.svg"
                    alt=""
                    class="interaction__replies--icon"
                    @click="handleReplyModalToggle(tweet.id)"
                  />
                  <span class="interaction__replies--counts">{{
                    tweet.reply_count
                  }}</span>
                </span>
                <span class="tweet__interaction--likes">
                  <img
                    v-if="tweet.isLiked && !isProcessing"
                    src="./../assets/Vector_redLike-icon.svg"
                    alt=""
                    class="likes--icon"
                    @click="deleteLike(tweet.id)"
                  />
                  <img
                    v-else-if="!tweet.isLiked && !isProcessing"
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
      </div>
    </template>
  </div>
</template>

  <script>
import ReplyModal from "./../components/ReplyModal.vue";
import tweetsAPI from "./../apis/tweets";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
import { emptyImageFilter } from "../utils/mixins";
import { fromNowFilter } from "../utils/mixins";
import Spinner from "./../components/Spinner";

export default {
  name: "Main",
  mixins: [emptyImageFilter, fromNowFilter],
  components: {
    ReplyModal,
    Spinner,
  },
  data() {
    return {
      tweets: [],
      newTweetText: "",
      clickedTweetId: undefined,
      isEditing: false,
      textareaRows: 3,
      isLoading: true,
      isProcessing:false,
      clickedLikedId:undefined
    };
  },
  created() {
    this.fetchTweets();
  },
  computed: {
    ...mapState(["currentUser", "isReplying"]),
  },
  methods: {
    async createNewTweet(newTweetText) {
      this.isLoading = true;
      if(newTweetText.trim().length === 0){
        Toast.fire({
          icon: 'warning',
          title: '內文不能留白'     
        })
      } 
      try {
        const response = await tweetsAPI.postTweet({
          description: newTweetText,
        });
        if (response.status !== 200) throw new Error(response.status);
        this.newTweetText = "";
        this.handleTextareaBlurred();
        this.fetchTweets();
        Toast.fire({
          icon: "success",
          title: "成功新增推文",
        });
      } catch (error) {
        this.isLoading = false;
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法新增推文，請稍後再試!",
        });
      }
    },
    newPostRestriction(e){
      console.log(e)
      if(this.newTweetText.length >= 140 && e.keyCode !== 8){
        e.returnValue = false
        Toast.fire({
          icon: 'warning',
          title: '新增推文字數超過上限140字'
        })
        return
      }
    },
    handleReplyModalToggle(tweetId) {
      this.$store.commit("toggleReplyModal");
      this.clickedTweetId = tweetId;
    },
    afterSubmitReply(payload) {
      console.log(payload);
      if (payload.status === 200) {
        this.tweets.map((tweet) => {
          if (tweet.id === payload.tweetId) {
            tweet.reply_count++;
          }
        });
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
    async addLike(tweetId) {
      this.isProcessing = true
      try {
        const response = await tweetsAPI.like.addLike({ tweetId });
        if (response.status !== 200) throw new Error(response.statusText);
        this.tweets.map((tweet) => {
          if (tweet.id === tweetId) {
            tweet.isLiked = !tweet.isLiked;
            tweet.like_count++;
          }
        });
        Toast.fire({
          icon: "success",
          title: "成功對推文按讚",
        });
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法對推文按讚，請稍後再試",
        });
      }
    },
    async deleteLike(tweetId) {
      this.isProcessing = true
      try {
        const response = await tweetsAPI.like.deleteLike({ tweetId });
        if (response.status !== 200) throw new Error(response.statusText);
        this.tweets.map((tweet) => {
          if (tweet.id === tweetId) {
            tweet.isLiked = !tweet.isLiked;
            tweet.like_count--;
          }
        });
        Toast.fire({
          icon: "success",
          title: "成功取消推文按讚",
        });
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取消推文按讚，請稍後再試",
        });
      }
    },
    handleTextareaFocused() {
      this.textareaRows = 15;
      this.isEditing = true;
    },
    handleTextareaBlurred() {
      this.textareaRows = 3;
      this.isEditing = false;
    },
    async fetchTweets() {
      try {
        this.isLoading = true;
        const { data } = await tweetsAPI.getTweets();
        if (!data) throw new Error();
        this.tweets = [...data];
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;

        console.log("error", error);
        Toast({
          icon: "error",
          title: "無法取得推文，請稍後再試!",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  overflow: overlay;
  background-color: $tweet-border;
  flex: 1;
  .main__navbar {
    height: 55px;
    font-size: 18px;
    font-weight: bold;
    line-height: 55px;
    padding-left: 1rem;
    background-color: $white;
  }
  .createTweet {
    height: 120px;
    display: flex;
    background-color: $white;
    margin-top: 2px;
    .createTweet__avatar--wrapper {
      position: relative;
      width: 75px;
      img {
        position: absolute;
        top: 9px;
        left: 50%;
        transform: translateX(-50%);
        height: 50px;
        width: 50px;
        border-radius: 50%;
      }
    }
    .form__group {
      flex: 1;
      position: relative;
      z-index: 2;
      textarea {
        resize: none;
        border: none;
        width: calc(100% - 100px);
        font-size: 16px;
        border-radius: 0 25px 25px 25px;
        padding: 1rem 1rem 2rem 0.5rem;
        &::placeholder {
          font-weight: bold;
          font-size: 18px;
        }
        &:focus {
          @extend %standard-boxshadow;
        }
      }
      button {
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 66px;
        height: 38px;
        font-size: 18px;
        font-weight: bold;
      }
      &.edit::before {
        content: "";
        position: absolute;
        z-index: -1;
        top: -1000%;
        left: -1000%;
        right: -1000%;
        bottom: -1022px;
        background-color: gray;
        opacity: 0.8;
      }
    }
  }
  .main__tweets--container {
    height: 1022px;
    .main__tweets {
      background-color: $white;
      margin-top: 10px;
      .main__tweet {
        display: flex;
        height: 145px;
        border: 1px solid $tweet-border;
        .tweet__avatar--wrapper {
          position: relative;
          width: 75px;
          img {
            position: absolute;
            top: 9px;
            left: 50%;
            transform: translateX(-50%);
            height: 50px;
            width: 50px;
            border-radius: 50%;
          }
        }
        .tweet__content {
          width: 100%;
          display: flex;
          flex-direction: column;
          .tweet__title {
            margin-top: 1rem;
            span {
              font-size: 15px;
              font-weight: 700;
              ~ span {
                font-weight: 500;
                color: $account;
              }
            }
            a {
              color: $account;
            }
          }
          .tweet__text--container {
            flex: 1;
            margin-top: 10px;
            .tweet__text {
              height: 100%;
              @include overflow-line-clamp(3);
            }
          }
          .tweet__content--interaction {
            display: flex;
            align-items: center;
            margin: 2px 0;
            height: 40px;
            > span {
              display: flex;
              align-items: center;
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
  }
}
</style>
