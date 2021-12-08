<template>
  <div class="user">
    <ReplyModal
      v-if="isReplying"
      :tweetId="clickedTweetId"
      @after-submit-reply="afterSubmitReply"
    />
    <UserEditModal
      v-if="isEditing"
      :is-editing="isEditing"
      @after-cancel-edit="handleEditInfoToggle"
    />
    <div class="user__navbar" >
      <a 
        v-if="isDisplayFollow === false"      
        class="user__navbar--prev" 
        @click="$router.back()"
      ></a>
      <a 
        v-else
        class="user__navbar--prev" 
        @click="handleUserFollowshipClicked"
      ></a>
      <div class="user__navbar--info">
        <h2 class="user__navbar--userName">{{user.name}}</h2>
        <p class="user__navbar--totalTweetsCount">{{userTweets.length}}推文</p>
      </div>
    </div>
    <UserFollow
      v-if="isDisplayFollow === true"
      :userId="user.id"
    />
    <template v-else>
      <div class="user__page--container">
        <div class="userCard">
          <div class="user__card--bannerWrapper">
            <img
              class="user__card--banner"
              :src="user.cover | emptyImage"
              alt=""
            />
          </div>
          <img
            :src="user.avatar | emptyImage"
            alt=""
            class="user__card--avatar"
          />
          <div class="user__card--info">
            <div 
              v-if="user.id !== currentUser.id" 
              class="user__interaction--other"
            >
              <button class="mail__btn">
                <a href="mailto:email@example.com"
                  ><img src="./../assets/Vector_mail.svg" alt="" class="mail__icon"
                /></a>
              </button>
              <button :class="['notification__btn', { active: isNotificationOn }]">
                <img
                  src="./../assets/Vector_follow-bell.svg"
                  alt=""
                  class="notification__icon"
                />
              </button>
              <button
                v-if="user.isFollowed"
                type="submit"
                :class="['follow__btn', { active: user.isFollowed }]"
                @click.stop.prevent="handleUnfollowBtnClicked(user.id)"
              >
                正在跟隨
              </button>
              <button
                v-else
                type="submit"
                :class="['follow__btn', { active: user.isFollowed }]"
                @click.stop.prevent="handleFollowBtnClicked(user.id)"
              >
                跟隨
              </button>
            </div>
            <button 
              v-else 
              class="user__interaction--self"
              @click="handleEditInfoToggle"
            >編輯個人資料</button>
            <div class="userInfo__title">
              <h2 class="userInfo__title--name">{{user.name}}</h2>
              <p class="userInfo__title--account">@{{user.account}}</p>
            </div>
            <p class="userInfo__introduction">
              {{user.introduction}}
            </p>
            <div 
              class="userInfo__follow"
              @click.stop.prevent="handleUserFollowshipClicked"
            >
              <span class="userInfo__followings"
                ><span class="followingsCounts">{{user.following_count}}個</span>跟隨中</span
              >
              <span class="userInfo__followers"
                ><span class="followersCounts">{{user.follower_count}}位</span>跟隨者</span
              >
            </div>
          </div>
        </div>
        <ul class="user__navPills">
          <li 
            :class="['user__tweets' , { active: displayMode === 'tweets'}]"
            @click="switchDisplayMode('tweets' , user.id)"
          >推文</li>
          <li 
            :class="['user__tweetsPlusReplies' , { active: displayMode === 'repliedTweets'}]"
            @click="switchDisplayMode('repliedTweets', user.id)"
          >推文與回覆</li>
          <li 
            :class="['user__likedTweets' , { active: displayMode === 'likedTweets'}]"
            @click="switchDisplayMode('likedTweets' , user.id)"
          >喜歡的內容</li>
        </ul>
        <div class="user__tweetsContainer">
          <UserLikedTweets 
            v-if="displayMode ==='likedTweets'"
            :initial-liked-tweets="userLikedTweets"
            :user="user"
            @after-reply-clicked="handleReplyModalToggle"
          />
          <UserRepliedTweets 
            v-else-if="displayMode ==='repliedTweets'"
            :initial-replied="userRepliedTweets"
            :user="user"
          />
          <UserTweets 
            v-else
            :initial-tweets="userTweets"
            :user="user"
            @after-reply-clicked="handleReplyModalToggle"
          />
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import UserTweets from "./../components/UserTweets.vue";
import UserEditModal from "./../components/UserEditModal.vue"
import ReplyModal from './../components/ReplyModal.vue'
import UserRepliedTweets from "./../components/UserRepliedTweets.vue"
import UserLikedTweets from "./../components/UserLikedTweets.vue"
import UserFollow from "./../components/UserFollow.vue"
import { emptyImageFilter } from "../utils/mixins"
import userAPI from "./../apis/users"
import { Toast } from "./../utils/helpers"
import {mapState} from 'vuex'
export default {
  name: "User",
  components: { 
    UserTweets,
    UserEditModal,
    UserRepliedTweets,
    UserLikedTweets,
    UserFollow,
    ReplyModal
  },
  mixins:[emptyImageFilter],
  data() {
    return {
      user: {},
      userTweets:[],
      userRepliedTweets:[],
      userLikedTweets:[],
      isNotificationOn: false,
      isEditing:false,
      isDisplayFollow:false,
      displayMode:'tweets',
      clickedTweetId:undefined
    };
  },
  created(){
    const { id } = this.$route.params
    this.fetchUser(id)
    this.fetchUserTweets(id)
  },
  beforeRouteUpdate (to, from, next) {
    const {id} = to.params
    this.fetchUser(id)
    next()
  },
  computed:{
    ...mapState(['currentUser' , 'isReplying'])
  },
  methods: { 
    async fetchUser(userId){
      try{
        const response = await userAPI.getUsers({userId})
        const data = response.data
        console.log(data)
        if(response.status !== 200) throw new Error(response.statusText)
        const {
          id, 
          account,
          avatar,
          cover,
          email,
          introduction,
          name,
          role,
          following_count,
          follower_count,
          isFollowed } = data
        this.user = {
          ...this.user,
          id, 
          account,
          avatar,
          cover,
          email,
          introduction: introduction || '使用者未填寫自我介紹',
          name,
          role,
          following_count,
          follower_count,
          isFollowed
        }
      }catch(error){
        console.log('error' , error)
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試'
        })
      }
    },  
    async fetchUserTweets(userId){
      try{
        const response = await userAPI.tweets.getUserTweets({ userId })
        const data = response.data
        this.userTweets = [...data]
        if(response.status !== 200) throw new Error(response.statusText)
      }catch(error){
        console('error' , error)
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者推文，請稍後再試!'
        })
      }
    },
    async fetchUserRepliedTweets(userId){
      try{
        const response = await userAPI.tweets.getUserRepliedTweets({userId})
        const data = response.data
        if(response.status !== 200) throw new Error(response.statusText)
        this.userRepliedTweets = [...data]
      }catch(error){
        console('error' , error)
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者回覆推文，請稍後再試!'
        })
      }
    },
    async fetchUserLikedTweets(userId){
      try{
        const response = await userAPI.tweets.getUserLikedTweets({ userId })
        const data = response.data
        if(response.status !== 200) throw new Error(response.statusText)
        this.userLikedTweets = [...data]
      }catch(error){
        console('error' , error)
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者按讚推文，請稍後再試!'
        })
      }
    },
    handleEditInfoToggle(){
      this.isEditing = !this.isEditing
    },
    switchDisplayMode(mode , userId){
      this.displayMode = mode
      switch(mode){
        case 'tweets':
          this.fetchUserTweets(userId)
          break
        case 'repliedTweets':
          this.fetchUserRepliedTweets(userId)
          break
        case 'likedTweets':
          this.fetchUserLikedTweets(userId)
          break
      }
    },
    handleUserFollowshipClicked(){
      this.isDisplayFollow = !this.isDisplayFollow
    },
    async handleFollowBtnClicked(userId){
      try{
        const response = await userAPI.followship.addFollowing({ userId })
        const data = response.data  
        if(response.status !== 200) throw new Error(response.statusText)
        console.log(data)
        this.user.isFollowed = !this.user.isFollowed
        Toast.fire({
          icon: 'success',
          title: '成功追蹤使用者'
        })
      }catch(error){
        console('error' , error)
        Toast.fire({
          icon: 'error',
          title: '無法追蹤使用者，請稍後再試!'
        })
      }
    },
    async handleUnfollowBtnClicked(userId){
      try{
        const response = await userAPI.followship.deleteFollowing({ userId })
        const data = response.data
        if(response.status !== 200) throw new Error(response.statusText)
        console.log(data)
        this.user.isFollowed = !this.user.isFollowed
        Toast.fire({
          icon: 'success',
          title: '成功取消追蹤使用者'
        })
      }catch(error){
        console('error' , error)
        Toast.fire({
          icon: 'error',
          title: '無法取消追蹤使用者，請稍後再試!'
        })
      }
    },
    handleReplyModalToggle(tweetId){
      console.log(tweetId)
      this.$store.commit("toggleReplyModal")
      this.clickedTweetId = tweetId;
    },
    afterSubmitReply(payload) {
      console.log(payload);
      if (payload.status === 200) {
        this.userTweets.map((tweet) => {
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
  }
};
</script>
<style lang="scss" scoped>
.user {
  position: relative;
  flex: 1;
  .user__navbar {
    display: flex;
    padding: 0.5rem 0;
    height: 55px;
    .user__navbar--prev {
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
    .user__navbar--info {
      flex: 1;
      .user__navbar--userName {
        font-size: 19px;
        color: $title-color;
      }
      .user__navbar--totalTweetsCount {
        font-size: 13px;
        color: $account;
      }
    }
  } 
  .user__page--container{
    display: flex;
    flex-direction:column;
    .userCard {
      position: relative;
      height: 410px;
      display: flex;
      flex-direction: column;
      .user__card--bannerWrapper {
        flex-basis: 50%;
        width: 100%;
        img{
          height: 200px;
        }
      }
      .user__card--avatar {
        position: absolute;
        height: 140px;
        width: 140px;
        border-radius: 50%;
        top: calc(50% - 70px);
        left: 1.5rem;
        border: 5px solid $white;
      }
      .user__card--info {
        position: relative;
        flex:1;
        padding: 4.5rem 0 2rem 1rem;
        .user__interaction--other {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: grid;
          grid-auto-flow: column;
          grid-gap: 0 0.5rem;
          color: $btn-color;
          button {
            position: relative;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            border: 1px solid $btn-color;
            background-color: #fff;
            color: $btn-color;
            img {
              position: absolute;
              @extend %position-center;
              height: 20px;
              width: 20px;
            }
          }
          .follow__btn {
            width: 90px;
            height: 35px;
            border-radius: 100px;
            font-weight: bold;
          }
          button.active,
          button:hover {
            background-color: $btn-color;
            color: #fff;
            img {
              border: 1px solid #fff;
              z-index: 999;
            }
          }
        }
        .user__interaction--self {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 120px;
          height: 35px;
          border-radius: 100px;
          background-color: #fff;
          color: $btn-color;
          border: 1px solid $btn-color;
          font-weight: bold;
          &:hover {
            background-color: $btn-color;
            color: #fff;
          }
        }
        .userInfo__title--name {
          font-size: 19px;
          color: $title-color;
        }
        .userInfo__title--account {
          font-size: 15px;
          color: $account;
        }
        .userInfo__introduction {
          padding: 10px 0;
          font-size: 14px;
        }
        .userInfo__follow {
          font-size: 14px;
          color: $follow-text;
          cursor: pointer;
          > span {
            margin-right: 1rem;
            > span {
              color: #000;
              font-weight: bold;
              margin-right: 3px;
            }
          }
        }
      }
    }
    .user__navPills {
      height: 3rem;
      width: 100%;
      display: flex;
      justify-content: start;
      li {
        width: 20%;
        text-align: center;
        line-height: 3rem;
        color: $navPills;
        font-weight: bold;
        cursor: pointer;
        &.active ,&:hover {
          color: $navPills-active;
          border-bottom: 2px solid $navPills-active;
        }
      }
    }
    .user__tweetsContainer {
      height: calc(1200px - 55px - 3rem - 410px);
      padding-top: 1rem;
    }
  }
}
</style>