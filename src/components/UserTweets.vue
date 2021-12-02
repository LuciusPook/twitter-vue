 <template>
  <ul class="user__tweets">
    <li v-for="tweet in tweets" :key="tweet.id">
      <div class="avatar__container">
        <img
          src="./../assets/Photo_avatar.png"
          alt=""
          class="user__tweet--avatar"
        />
      </div>
      <div class="user__tweet--content">
        <div class="tweet__content--title">
          <h3 class="tweet__user--name">{{ currentUser.name }}</h3>
          <span class="tweet__user--account">@{{ currentUser.account }}．{{ tweet.createAt }}</span>
        </div>
        <p class="tweet__content--text">
          {{ tweet.description }}
        </p>
        <div class="tweet__content--interaction">
          <span class="tweet__interaction--replies">
            <img
              src="./../assets/Vector_reply-icon.svg"
              alt=""
              class="interaction__replies--icon"
            />
            <span class="interaction__replies--counts">{{
              tweet.comments_count
            }}</span>
          </span>
          <span class="tweet__interaction--likes">
            <img
              src="./../assets/Vector_like-icon.svg"
              alt=""
              class="likes--icon"
            />
            <span class="likes--counts">{{ tweet.likes_count }}</span>
          </span>
        </div>
      </div>
    </li>
  </ul>
</template>

 <script>
const dummyUser = {
  id: 47,
  name: "daniel",
  account: "daniel1010",
  email: "daniel@example.com",
  cover:
    "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQfqVhftVmq27ogo9xRySbKOG6OHElHqrfwoO-g6Utm_uNhr_X5B_cBFLMgyT9pJ5UwrgEzCBkKl4rKnfb5_o8",
  avatar:
    "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQfqVhftVmq27ogo9xRySbKOG6OHElHqrfwoO-g6Utm_uNhr_X5B_cBFLMgyT9pJ5UwrgEzCBkKl4rKnfb5_o8",
};
const dummyData = [
  {
    tweetId: "1",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus numquam hic ullam deserunt adipisci doloremque, nemo iste optio cumque molestias?",
    likes_count: 76,
    comments_count: 13,
    createAt: "3 小時",
  },
  {
    tweetId: "2",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus numquam hic ullam deserunt adipisci doloremque, nemo iste optio cumque molestias?",
    likes_count: 76,
    comments_count: 13,
    createAt: "3 小時",
  },
  {
    tweetId: "3",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus numquam hic ullam deserunt adipisci doloremque, nemo iste optio cumque molestias?",
    likes_count: 76,
    comments_count: 13,
    createAt: "3 小時",
  },
  {
    tweetId: "4",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus numquam hic ullam deserunt adipisci doloremque, nemo iste optio cumque molestias?",
    likes_count: 76,
    comments_count: 13,
    createAt: "3 小時",
  },
  {
    tweetId: "5",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus numquam hic ullam deserunt adipisci doloremque, nemo iste optio cumque molestias?",
    likes_count: 76,
    comments_count: 13,
    createAt: "3 小時",
  },
  {
    tweetId: "6",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus numquam hic ullam deserunt adipisci doloremque, nemo iste optio cumque molestias?",
    likes_count: 76,
    comments_count: 13,
    createAt: "3 小時",
  },
  {
    tweetId: "7",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus numquam hic ullam deserunt adipisci doloremque, nemo iste optio cumque molestias?",
    likes_count: 76,
    comments_count: 13,
    createAt: "3 小時",
  },
  {
    tweetId: "8",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus numquam hic ullam deserunt adipisci doloremque, nemo iste optio cumque molestias?",
    likes_count: 76,
    comments_count: 13,
    createAt: "3 小時",
  },
];
export default {
  name: "UserTweets",
  data() {
    return {
      tweets: [],
      currentUser: {},
    };
  },
  created() {
    this.fetchUserTweets();
    this.fetchCurrentUser();
  },
  methods: {
    fetchUserTweets() {
      this.tweets = [...dummyData];
    },
    fetchCurrentUser() {
      this.currentUser = {
        ...this.currentUser,
        ...dummyUser,
      };
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
        .tweet__user--name{
          display: inline-block;
          font-size: 1rem;
        }
        .tweet__user--account{
          margin: 0 5px;
          font-size: 1rem;
          color: $account;
        }
      }
      .tweet__content--text {
        margin: 0.5rem 0;
      }
      .tweet__content--interaction {
        display: flex;
        margin: 0.5rem 0;
        > span{
          display: flex;
          margin-right: 3rem;
          img {
            height: 1rem;
            width: 1rem;
            margin-right: 0.5rem;
          }
        }
      }
    }
  }
}
</style>