 <template>
  <ul class="user__tweets">
    <li v-for="likedTweet in likedTweets" :key="likedTweet.id">
      <div class="avatar__container">
        <img
          src="./../assets/Photo_avatar.png"
          alt=""
          class="user__tweet--avatar"
        />
      </div>
      <div class="user__tweet--content">
        <div class="tweet__content--title">
          <h3 class="tweet__user--name">{{ likedTweet.name }}</h3>
          <span class="tweet__user--account">@{{ likedTweet.account }}．{{ likedTweet.createdAt }}</span>
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
            />
            <span class="interaction__replies--counts">{{
              likedTweet.comments_count
            }}</span>
          </span>
          <span class="tweet__interaction--likes">
            <img
              src="./../assets/Vector_redLike-icon.svg"
              alt=""
              class="likes--icon"
            />
            <span class="likes--counts">{{ likedTweet.likedCounts }}</span>
          </span>
        </div>
      </div>
    </li>
  </ul>
</template>

 <script>
const dummyData = [
    {
      "id": 1, // 這則 like 所屬的 TweetId
      "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus numquam hic ullam deserunt adipisci doloremque, nemo iste optio cumque molestias?", // 這則 tweet 所屬的 內文
      "UserId": 2,   // 這則 tweet 所屬的發文者 Id
      "name":'Devon Lane',
      "account": 'DL',
      "avatar": 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQfqVhftVmq27ogo9xRySbKOG6OHElHqrfwoO-g6Utm_uNhr_X5B_cBFLMgyT9pJ5UwrgEzCBkKl4rKnfb5_o8',
      "likedCounts": 76,
      "commentCounts":13,
      "createdAt": "2021-12-01T08:20:39.000Z",
      "updatedAt": "2021-12-01T08:01:39.000Z"
    },
    {
      "id": 2, // 這則 like 所屬的 TweetId
      "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus numquam hic ullam deserunt adipisci doloremque, nemo iste optio cumque molestias?", // 這則 tweet 所屬的 內文
      "UserId": 2,   // 這則 tweet 所屬的發文者 Id
      "account": 'DL',
      "avatar": 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQfqVhftVmq27ogo9xRySbKOG6OHElHqrfwoO-g6Utm_uNhr_X5B_cBFLMgyT9pJ5UwrgEzCBkKl4rKnfb5_o8',
      "likedCounts": 76,
      "commentCounts":13,
      "createdAt": "2021-12-01T08:20:39.000Z",
      "updatedAt": "2021-12-01T08:01:39.000Z"
    },
    {
      "id": 3, // 這則 like 所屬的 TweetId
      "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus numquam hic ullam deserunt adipisci doloremque, nemo iste optio cumque molestias?", // 這則 tweet 所屬的 內文
      "UserId": 2,   // 這則 tweet 所屬的發文者 Id
      "account": 'DL',
      "avatar": 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQfqVhftVmq27ogo9xRySbKOG6OHElHqrfwoO-g6Utm_uNhr_X5B_cBFLMgyT9pJ5UwrgEzCBkKl4rKnfb5_o8',
      "likedCounts": 76,
      "commentCounts":13,
      "createdAt": "2021-12-01T08:20:39.000Z",
      "updatedAt": "2021-12-01T08:01:39.000Z"
    },
    {
      "id": 4, // 這則 like 所屬的 TweetId
      "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus numquam hic ullam deserunt adipisci doloremque, nemo iste optio cumque molestias?", // 這則 tweet 所屬的 內文
      "UserId": 2,   // 這則 tweet 所屬的發文者 Id
      "account": 'DL',
      "avatar": 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQfqVhftVmq27ogo9xRySbKOG6OHElHqrfwoO-g6Utm_uNhr_X5B_cBFLMgyT9pJ5UwrgEzCBkKl4rKnfb5_o8',
      "likedCounts": 76,
      "commentCounts":13,
      "createdAt": "2021-12-01T08:20:39.000Z",
      "updatedAt": "2021-12-01T08:01:39.000Z"
    },
    {
      "id": 5, // 這則 like 所屬的 TweetId
      "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus numquam hic ullam deserunt adipisci doloremque, nemo iste optio cumque molestias?", // 這則 tweet 所屬的 內文
      "UserId": 2,   // 這則 tweet 所屬的發文者 Id
      "account": 'DL',
      "avatar": 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQfqVhftVmq27ogo9xRySbKOG6OHElHqrfwoO-g6Utm_uNhr_X5B_cBFLMgyT9pJ5UwrgEzCBkKl4rKnfb5_o8',
      "likedCounts": 76,
      "commentCounts":13,
      "createdAt": "2021-12-01T08:20:39.000Z",
      "updatedAt": "2021-12-01T08:01:39.000Z"
    },
    {
      "id": 6, // 這則 like 所屬的 TweetId
      "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus numquam hic ullam deserunt adipisci doloremque, nemo iste optio cumque molestias?", // 這則 tweet 所屬的 內文
      "UserId": 2,   // 這則 tweet 所屬的發文者 Id
      "account": 'DL',
      "avatar": 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQfqVhftVmq27ogo9xRySbKOG6OHElHqrfwoO-g6Utm_uNhr_X5B_cBFLMgyT9pJ5UwrgEzCBkKl4rKnfb5_o8',
      "likedCounts": 76,
      "commentCounts":13,
      "createdAt": "2021-12-01T08:20:39.000Z",
      "updatedAt": "2021-12-01T08:01:39.000Z"
    },
    {
      "id": 7, // 這則 like 所屬的 TweetId
      "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus numquam hic ullam deserunt adipisci doloremque, nemo iste optio cumque molestias?", // 這則 tweet 所屬的 內文
      "UserId": 2,   // 這則 tweet 所屬的發文者 Id
      "account": 'DL',
      "avatar": 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQfqVhftVmq27ogo9xRySbKOG6OHElHqrfwoO-g6Utm_uNhr_X5B_cBFLMgyT9pJ5UwrgEzCBkKl4rKnfb5_o8',
      "likedCounts": 76,
      "commentCounts":13,
      "createdAt": "2021-12-01T08:20:39.000Z",
      "updatedAt": "2021-12-01T08:01:39.000Z"
    },
    {
      "id": 8, // 這則 like 所屬的 TweetId
      "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus numquam hic ullam deserunt adipisci doloremque, nemo iste optio cumque molestias?", // 這則 tweet 所屬的 內文
      "UserId": 2,   // 這則 tweet 所屬的發文者 Id
      "account": 'DL',
      "avatar": 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQfqVhftVmq27ogo9xRySbKOG6OHElHqrfwoO-g6Utm_uNhr_X5B_cBFLMgyT9pJ5UwrgEzCBkKl4rKnfb5_o8',
      "likedCounts": 76,
      "commentCounts":13,
      "createdAt": "2021-12-01T08:20:39.000Z",
      "updatedAt": "2021-12-01T08:01:39.000Z"
    },
];
export default {
  name: "UserLikedTweets",
  data() {
    return {
      likedTweets: [],
    };
  },
  created() {
    this.fetchUserTweets();
    this.fetchCurrentUser();
  },
  methods: {
    fetchUserTweets() {
      this.likedTweets = [...dummyData];
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
        .likes--counts{
          color:#E0245E;
        }
      }
    }
  }
}
</style>  