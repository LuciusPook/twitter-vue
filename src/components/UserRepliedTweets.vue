 <template>
  <ul class="user__repliedTweets">
    <li v-for="repliedTweet in repliedTweets" :key="repliedTweet.id">
      <div class="avatar__container">
        <img
          src="./../assets/Photo_avatar.png"
          alt=""
          class="user__tweet--avatar"
        />
      </div>
      <div class="user__repliedTweets--content">
        <div class="tweet__content--title">
          <h3 class="tweet__user--name">{{ currentUser.name }}</h3>
          <span class="tweet__user--account">@{{ currentUser.account }}．{{ repliedTweet.createdAt }}</span>
        </div> 
        <p class="user__repliedTweets--tag">
          <span>回覆</span>  
          <span class="user__repliedTweets--owner">
            @{{repliedTweet.Tweet.User.account}}
          </span>
        </p>
        <p class="tweet__content--text">
          {{ repliedTweet.comment }}
        </p>
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
        "id": 1, //此 reply Id
        "UserId": 1,
        "TweetId": 1,
        "comment": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus numquam hic ullam deserunt adipisci doloremque, nemo iste optio cumque molestias?",
        "createdAt": "2021-12-01T08:01:39.000Z",
        "updatedAt": "2021-12-01T08:01:39.000Z",
        "Tweet": {
            "id": 1,
            "description": "cooool~",
            "UserId": 1, //發文者Id
            "createdAt": "2021-12-01T08:01:39.000Z",
            "updatedAt": "2021-12-01T08:01:39.000Z",
            "User": {
                "id": 1, //發文者 Id
                "account": "Daniel",
                "name": "123",
                "email": "123",
                "password": "$2a$10$cP/f.QWf2RnjZKhQjD6CDuAQzOanuBdf1S48Akrp2el9jPzUzfBNu",
                "role": null,
                "cover": null,
                "avatar": null,
                "introduction": null,
                "createdAt": "2021-12-01T08:01:39.000Z",
                "updatedAt": "2021-12-01T08:01:39.000Z"
            }
        }
    },
    {
        "id": 2, //此 reply Id
        "UserId": 1,
        "TweetId": 1,
        "comment": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus numquam hic ullam deserunt adipisci doloremque, nemo iste optio cumque molestias?",
        "createdAt": "2021-12-01T08:01:39.000Z",
        "updatedAt": "2021-12-01T08:01:39.000Z",
        "Tweet": {
            "id": 1,
            "description": "cooool~",
            "UserId": 1, //發文者Id
            "createdAt": "2021-12-01T08:01:39.000Z",
            "updatedAt": "2021-12-01T08:01:39.000Z",
            "User": {
                "id": 1, //發文者 Id
                "account": "Daniel",
                "name": "123",
                "email": "123",
                "password": "$2a$10$cP/f.QWf2RnjZKhQjD6CDuAQzOanuBdf1S48Akrp2el9jPzUzfBNu",
                "role": null,
                "cover": null,
                "avatar": null,
                "introduction": null,
                "createdAt": "2021-12-01T08:01:39.000Z",
                "updatedAt": "2021-12-01T08:01:39.000Z"
            }
        }
    },
    {
        "id": 3, //此 reply Id
        "UserId": 1,
        "TweetId": 1,
        "comment": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus numquam hic ullam deserunt adipisci doloremque, nemo iste optio cumque molestias?",
        "createdAt": "2021-12-01T08:01:39.000Z",
        "updatedAt": "2021-12-01T08:01:39.000Z",
        "Tweet": {
            "id": 1,
            "description": "cooool~",
            "UserId": 1, //發文者Id
            "createdAt": "2021-12-01T08:01:39.000Z",
            "updatedAt": "2021-12-01T08:01:39.000Z",
            "User": {
                "id": 1, //發文者 Id
                "account": "Daniel",
                "name": "123",
                "email": "123",
                "password": "$2a$10$cP/f.QWf2RnjZKhQjD6CDuAQzOanuBdf1S48Akrp2el9jPzUzfBNu",
                "role": null,
                "cover": null,
                "avatar": null,
                "introduction": null,
                "createdAt": "2021-12-01T08:01:39.000Z",
                "updatedAt": "2021-12-01T08:01:39.000Z"
            }
        }
    },
    {
        "id": 4, //此 reply Id
        "UserId": 1,
        "TweetId": 1,
        "comment": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus numquam hic ullam deserunt adipisci doloremque, nemo iste optio cumque molestias?",
        "createdAt": "2021-12-01T08:01:39.000Z",
        "updatedAt": "2021-12-01T08:01:39.000Z",
        "Tweet": {
            "id": 1,
            "description": "cooool~",
            "UserId": 1, //發文者Id
            "createdAt": "2021-12-01T08:01:39.000Z",
            "updatedAt": "2021-12-01T08:01:39.000Z",
            "User": {
                "id": 1, //發文者 Id
                "account": "Daniel",
                "name": "123",
                "email": "123",
                "password": "$2a$10$cP/f.QWf2RnjZKhQjD6CDuAQzOanuBdf1S48Akrp2el9jPzUzfBNu",
                "role": null,
                "cover": null,
                "avatar": null,
                "introduction": null,
                "createdAt": "2021-12-01T08:01:39.000Z",
                "updatedAt": "2021-12-01T08:01:39.000Z"
            }
        }
    },
    {
        "id": 5, //此 reply Id
        "UserId": 1,
        "TweetId": 1,
        "comment": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus numquam hic ullam deserunt adipisci doloremque, nemo iste optio cumque molestias?",
        "createdAt": "2021-12-01T08:01:39.000Z",
        "updatedAt": "2021-12-01T08:01:39.000Z",
        "Tweet": {
            "id": 1,
            "description": "cooool~",
            "UserId": 1, //發文者Id
            "createdAt": "2021-12-01T08:01:39.000Z",
            "updatedAt": "2021-12-01T08:01:39.000Z",
            "User": {
                "id": 1, //發文者 Id
                "account": "Daniel",
                "name": "123",
                "email": "123",
                "password": "$2a$10$cP/f.QWf2RnjZKhQjD6CDuAQzOanuBdf1S48Akrp2el9jPzUzfBNu",
                "role": null,
                "cover": null,
                "avatar": null,
                "introduction": null,
                "createdAt": "2021-12-01T08:01:39.000Z",
                "updatedAt": "2021-12-01T08:01:39.000Z"
            }
        }
    },
    {
        "id": 6, //此 reply Id
        "UserId": 1,
        "TweetId": 1,
        "comment": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus numquam hic ullam deserunt adipisci doloremque, nemo iste optio cumque molestias?",
        "createdAt": "2021-12-01T08:01:39.000Z",
        "updatedAt": "2021-12-01T08:01:39.000Z",
        "Tweet": {
            "id": 1,
            "description": "cooool~",
            "UserId": 1, //發文者Id
            "createdAt": "2021-12-01T08:01:39.000Z",
            "updatedAt": "2021-12-01T08:01:39.000Z",
            "User": {
                "id": 1, //發文者 Id
                "account": "Daniel",
                "name": "123",
                "email": "123",
                "password": "$2a$10$cP/f.QWf2RnjZKhQjD6CDuAQzOanuBdf1S48Akrp2el9jPzUzfBNu",
                "role": null,
                "cover": null,
                "avatar": null,
                "introduction": null,
                "createdAt": "2021-12-01T08:01:39.000Z",
                "updatedAt": "2021-12-01T08:01:39.000Z"
            }
        }
    },
    {
        "id": 7, //此 reply Id
        "UserId": 1,
        "TweetId": 1,
        "comment": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus numquam hic ullam deserunt adipisci doloremque, nemo iste optio cumque molestias?",
        "createdAt": "2021-12-01T08:01:39.000Z",
        "updatedAt": "2021-12-01T08:01:39.000Z",
        "Tweet": {
            "id": 1,
            "description": "cooool~",
            "UserId": 1, //發文者Id
            "createdAt": "2021-12-01T08:01:39.000Z",
            "updatedAt": "2021-12-01T08:01:39.000Z",
            "User": {
                "id": 1, //發文者 Id
                "account": "Daniel",
                "name": "123",
                "email": "123",
                "password": "$2a$10$cP/f.QWf2RnjZKhQjD6CDuAQzOanuBdf1S48Akrp2el9jPzUzfBNu",
                "role": null,
                "cover": null,
                "avatar": null,
                "introduction": null,
                "createdAt": "2021-12-01T08:01:39.000Z",
                "updatedAt": "2021-12-01T08:01:39.000Z"
            }
        }
    },
];
export default {
  name: "UserRepliedTweets",
  data() {
    return {
      repliedTweets: [],
      currentUser: {},
    };
  },
  created() {
    this.fetchUserRepliedTweets();
    this.fetchCurrentUser();
  },
  methods: {
    fetchUserRepliedTweets() {
      this.repliedTweets = [...dummyData];
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
.user__repliedTweets {
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
    .user__repliedTweets--content {
      display: flex;
      flex-direction: column;
      padding: 0.5rem; 
      .tweet__content--title {
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
      .user__repliedTweets--tag{
        height: 22px;
        color: $account;
        margin-top: 2px;
        font-size: 15px;
        span{
          vertical-align: middle;
        }
        .user__repliedTweets--owner{
          color: $reply-account;
          font-weight: bold;
          
        }
      }
      .tweet__content--text {
        margin: 0.5rem 0;
      }
    }
  }
}
</style>

