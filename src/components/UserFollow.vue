<template>
  <div class="user__followship">
    <ul class="user__followPills">
      <li 
        :class="['user__followPills--followers' , {active: displayMode === 'followers'}]"
        @click="handleFollowersClicked"
      >
        跟隨者
      </li>
      <li 
        :class="['user__followPills--followings' , {active: displayMode === 'followings'}]"
        @click="handleFollowingsClicked"
      >
        正在跟隨
      </li>
    </ul>
    <div class="user__follow--container">
      <ul
        v-if="displayMode === 'followers'"
        class="user__followers user__follow"
      >
        <li 
          v-for="userFollower in userFollowers"
          :key="userFollower.followerId"
          class="user__follower user__follow"
        >
          <div class="follow__avatar--container">
            <img 
              :src="userFollower.followerAvatar" alt="" class="follow__avatar"
            >
          </div>
          <div class="follow__info">
            <div class="follow__title">
              <h2 class="follow__name">{{userFollower.followerName}}</h2>
              <div class="follow__account">@{{userFollower.followerAccount}}</div>
            </div>
            <p class="follow__introduction">
              {{userFollower.Intro}}
            </p>
            <button
              :class="['follow__btn', { active: userFollower.isFollowed }]"
              @click="handleFollowBtnClicked"
            >
              {{ isFollowed ? "正在跟隨" : "跟隨" }}
            </button>
          </div>
        </li>
      </ul>
      <ul 
        else
        class="user__followings user__follow"
      >
        <li 
          v-for="userFollowing in userFollowings"
          :key="userFollowing.followingId"
          class="user__following user__follow"
        >
          <div class="follow__avatar--container">
            <img 
              :src="userFollowing.followingAvatar" alt="" class="follow__avatar"
            >
          </div>
          <div class="follow__info">
            <div class="follow__title">
              <h2 class="follow__name">{{userFollowing.followingName}}</h2>
              <div class="follow__account">@{{userFollowing.followingAccount}}</div>
            </div>
            <p class="follow__introduction">
              {{userFollowing.followingIntro}}
            </p>
            <button
              :class="['follow__btn', { active: isFollowed }]"
              @click="handleFollowBtnClicked(userFollowing.followingId)"
            >
              {{ isFollowed ? "正在跟隨" : "跟隨" }}
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import userAPI from "../apis/users"
import { Toast } from "../utils/helpers"
import { mapState } from 'vuex'
export default {
  name: "UserFollow",
  computed:{
    ...mapState(['userTweetsCount'])
  },
  props:{
    userId:{
      type:Number,
      required:true
    }
  },
  data(){
    return {
      displayMode:'followers',
      isFollowed: true,
      userFollowers:[],
      userFollowings:[]
    }
  },
  created(){
    this.fetchUserFollowers(this.userId)
  },
  methods:{
    handleFollowersClicked(){
      this.displayMode = 'followers'
      this.fetchUserFollowers(this.userId)
    },
    handleFollowingsClicked(){
      this.displayMode = 'followings'
      this.fetchUserFollowings(this.userId)
    },
    async handleFollowBtnClicked(followingId){
      try{
        const { data } = await userAPI.followship.addFollowing({ userId : followingId})
        // if(data.status !== 'success') throw new Error(data.message)
        console.log(data)
      }catch(error){
        console.log('error' , error)
        Toast({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試'
        })
      }
      this.isFollowed = ! this.isFollowed
    },
    async fetchUserFollowers(userId){
      try{
        const { data } = await userAPI.followship.getUserFollowers({ userId })
        // if(data.status !== 'success') throw new Error(data.message)
        this.userFollowers = [...data]
      }catch(error){
        console('error' , error)
        Toast({
          icon: 'error',
          title: '無法取得使用者跟隨者資料，請稍後再試!'
        })
      }
    },
    async fetchUserFollowings(userId){
      try{
        const { data } = await userAPI.followship.getUserFollowings({ userId })
        // if(data.status !== 'success') throw new Error(data.message)
        this.userFollowings = [...data]
      }catch(error){
        console('error' , error)
        Toast({
          icon: 'error',
          title: '無法取得使用者正在跟隨者資料，請稍後再試!'
        })
      }
    },
  }
};
</script>

<style lang="scss" scoped>
  .user__followship{
    flex:1;
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
    .user__followPills{ 
      display: flex;
      height: 54px;
      li{
        height: 100%;
        width: 130px;
        font-size: 15px;
        font-weight: bold;
        color: $navPills;
        text-align: center;
        line-height: 54px;
        &.active{
          color: $navPills-active;
          border-bottom: 2px solid $navPills-active;
        }
      }
    }
    .user__follow--container{
      height: 1000px;
      .user__follow{
        margin-top: 0.5rem;
        .user__follow{
          display: flex;
          border: 1px solid $tweet-border;
          height: 95px;
          .follow__avatar--container{
            position: relative;
            width: 4rem;
            img{
              position: absolute;
              @extend %position-center;
              top:2rem;
              height: 50px;
              width: 50px;
            }
          }
          .follow__info{
            flex:1;
            position: relative;
            display: flex;
            flex-direction: column;
            .follow__title{
              height: 2rem;
              margin: 0.5rem 0;
              .follow__name{
                font-size: 15px; 
                font-weight: bold;
              }
              .follow__account{
                font-size: 15px; 
                color: $account;
              }
            }
            .follow__introduction{
              flex:1;
              margin-bottom: 0.5rem;
              @include overflow-line-clamp(2);
            }
            .follow__btn{
              position:absolute;
              top:0.5rem;
              right: 1rem;
              height: 25px;
              width: 60px;
              font-weight: bold;
              font-style: 15px;
              color: $btn-color;
              background-color: #fff;
              border: 1px solid $btn-color;
              &.active{
                width: 90px;
                color: #fff;
                background-color: $btn-color;
              }
            }
          }
        }
      }
    }
  }

</style>