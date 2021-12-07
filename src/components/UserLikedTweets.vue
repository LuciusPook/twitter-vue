 <template>
  <ul class="user__tweets">
    <li v-for="likedTweet in likedTweets" :key="likedTweet.id">
      <div class="avatar__container">
        <router-link
          :to="{name:'user' , params:{id:likedTweet.tweet_user_id}}"
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
              :to="{name:'user' , params:{id:likedTweet.tweet_user_id}}"
            >
              @{{ likedTweet.tweet_user_account }}
            </router-link>
            ．{{ likedTweet.createdAt | fromNow}}</span>
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
            <span class="interaction__replies--counts">{{likedTweet.reply_count}}</span>
          </span>
          <span class="tweet__interaction--likes">
            <img
              src="./../assets/Vector_redLike-icon.svg"
              alt=""
              class="likes--icon"
            />
            <span class="likes--counts">{{likedTweet.like_count}}</span>
          </span>
        </div>
      </div>
    </li>
  </ul>
</template>

 <script>
  import { emptyImageFilter } from '../utils/mixins'
  import { fromNowFilter } from '../utils/mixins'


export default {
  name: "UserLikedTweets",
  mixins:[emptyImageFilter , fromNowFilter],
  props:{
    initialLikedTweets:{
      type:Array,
      default: () => []
    },
    user:{
      type:Object,
      required:true
    }
  },
  data() {
    return {
      likedTweets: this.initialLikedTweets,
    };
  },
  watch:{
    initialLikedTweets(newValue){
      this.likedTweets = [...newValue]
    }
  }
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
        font-size: 15px;
        margin-top:0.5rem;
        flex:1;
        @include overflow-line-clamp(3);
      }
      .tweet__content--interaction {
        display: flex;
        padding: 1.2rem 0 0;
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