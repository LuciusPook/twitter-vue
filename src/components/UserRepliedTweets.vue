 <template>
  <ul class="user__repliedTweets scrollbar">
    <li v-for="repliedTweet in repliedTweets" :key="repliedTweet.id">
      <div class="avatar__container">
        <router-link
          :to="{ name: 'user' , params:{id: user.id}}"
        >
          <img
            :src="user.avatar | emptyImage"
            alt=""
            class="user__tweet--avatar"
          />
        </router-link>
      </div>
      <div class="user__repliedTweets--content">
        <div class="tweet__content--title">
          <h3 class="tweet__user--name">{{ user.name }}</h3>
          <span class="tweet__user--account">
            <router-link
              :to="{ name: 'user' , params: {id: user.id}}"
            >
              @{{ user.account }}
            </router-link>
            ．{{ repliedTweet.createdAt | fromNow}}
          </span>
        </div> 
        <p class="user__repliedTweets--tag">
          <span>回覆</span>  
          <router-link class="user__repliedTweets--owner"
            :to="{ name: 'user' , params: {id: repliedTweet.Tweet.User.id}}"
          >
            @{{repliedTweet.Tweet.User.account}}
          </router-link>
        </p>
        <p class="tweet__content--text">
        <router-link
          :to="{name:'tweet' , params:{id:repliedTweet.Tweet.id}}"
        >
          {{ repliedTweet.comment }}
        </router-link>
        </p>
      </div>
    </li>
  </ul>
</template>

 <script>
import { mapState } from 'vuex'
import {emptyImageFilter} from "../utils/mixins"
 import { fromNowFilter } from '../utils/mixins'
export default {
  name: "UserRepliedTweets",
  mixins:[emptyImageFilter , fromNowFilter],
  props:{
    initialReplied:{
      type:Array,
      default: () => []
    },
    user:{
      type:Object,
      required:true
    }
  },
  computed:{
    ...mapState(['currentUser'])
  },
  data() {
    return {
      repliedTweets: this.initialReplied,
    };
  },
  watch:{
    initialReplied(newValue){
      this.repliedTweets = [...newValue]
    }
  }
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
        flex:1;
        @include overflow-line-clamp(3);
      }
    }
  }
}
</style>

