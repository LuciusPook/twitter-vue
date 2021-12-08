<template>
  <div class="user__followship">
    <ul class="user__followPills">
      <li
        :class="[
          'user__followPills--followers',
          { active: displayMode === 'followers' },
        ]"
        @click="handleFollowersPillClicked(userId)"
      >
        跟隨者
      </li>
      <li
        :class="[
          'user__followPills--followings',
          { active: displayMode === 'followings' },
        ]"
        @click="handleFollowingsPillClicked(userId)"
      >
        正在跟隨
      </li>
    </ul>
    <div class="user__follow--container scroll">
      <ul
        v-show="displayMode === 'followers' && userFollowers"
        class="user__followers user__follow"
      >
        <li
          v-for="userFollower in userFollowers"
          :key="userFollower.followerId"
          class="user__follower user__follow"
        >
          <div class="follow__avatar--container">
            <router-link
                :to="{name:'user' , params:{id:userFollower.followerId}}"
              >
              <img
                :src="userFollower.followerAvatar"
                alt=""
                class="follow__avatar"
              />
            </router-link>
          </div>
          <div class="follow__info">
            <div class="follow__title">
              <h2 class="follow__name">{{ userFollower.followerName }}</h2>
              <router-link
                :to="{name:'user' , params:{id:userFollower.followerId}}"
              >
                <div class="follow__account">
                  @{{ userFollower.followerAccount }}
                </div>
              </router-link>
            </div>
            <p class="follow__introduction">
              {{ userFollower.Intro }}
            </p>
            <button
              v-if="userFollower.isFollowed"
              :class="['follow__btn', { active: userFollower.isFollowed }]"
              @click="handleUnfollowBtnClicked(userFollower.followerId, 'follower')"
            >
              正在跟隨
            </button>
            <button
              v-else
              :class="['follow__btn', { active: userFollower.isFollowed }]"
              @click="handleFollowBtnClicked(userFollower.followerId, 'follower')"
            >
              跟隨
            </button>
          </div>
        </li>
      </ul>
      <ul 
        v-show="displayMode === 'followings' && userFollowings" 
        class="user__followings user__follow"
      >
        <li
          v-for="userFollowing in userFollowings"
          :key="userFollowing.followingId"
          class="user__following user__follow"
        >
          <div class="follow__avatar--container">
             <router-link
                :to="{name:'user' , params:{id:userFollowing.followingId}}"
              >
              <img
                :src="userFollowing.followingAvatar"
                alt=""
                class="follow__avatar"
              />
            </router-link>
          </div>
          <div class="follow__info">
            <div class="follow__title">
              <h2 class="follow__name">{{ userFollowing.followingName }}</h2>
              <router-link
                :to="{name:'user' , params:{id:userFollowing.followingId}}"
              >
                <div class="follow__account">
                  @{{ userFollowing.followingAccount }}
                </div>
              </router-link>
            </div>
            <p class="follow__introduction">
              {{ userFollowing.followingIntro }}
            </p>
            <button
              v-if="userFollowing.isFollowed"
              :class="['follow__btn', { active: userFollowing.isFollowed }]"
              @click="handleUnfollowBtnClicked(userFollowing.followingId, 'following')"
            >
              正在跟隨
            </button>
            <button
              v-else
              :class="['follow__btn', { active: userFollowing.isFollowed }]"
              @click="handleFollowBtnClicked(userFollowing.followingId, 'following')"
            >
              跟隨
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import userAPI from "./../apis/users"
import { Toast } from "./../utils/helpers"
export default {
  name: "UserFollow",
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
    this.handleFollowersPillClicked(this.userId)
  },
  methods:{
    handleFollowersPillClicked(userId){
      this.displayMode = 'followers'
      this.fetchUserFollowers(userId)
    },
    handleFollowingsPillClicked(userId){
      this.displayMode = 'followings'
      this.fetchUserFollowings(userId)
    },
    async handleFollowBtnClicked(id , btnType){
      try{
        const response = await userAPI.followship.addFollowing({ userId: id})
        if(response.status !== 200) throw new Error(response.statusText)
        console.log(response)
        console.log('id',id,'btnType',btnType , typeof(btnType))
        if(btnType === 'follower'){
          this.userFollowers.map( userFollower => {
            if(userFollower.followerId === id){
              userFollower.isFollowed = true
              return userFollower       
            }
          })
        }else{
          this.userFollowings.map( userFollowing => {
            if(userFollowing.followingId === id){
              userFollowing.isFollowed = true
              return userFollowing
            }
          })
        } 
        Toast.fire({
          icon:'success',
          title:'成功追蹤使用者'
        })
      }catch(error){
        console.log('error' , error)
        Toast.fire({
          icon: 'error',
          title: '無法追蹤使用者，請稍後再試'
        })
      }
    },
    async handleUnfollowBtnClicked(id , btnType){
      try{
        const response = await userAPI.followship.deleteFollowing({ userId: id})
        if(response.status !== 200) throw new Error(response.statusText)
        console.log(response)
        console.log('id',id,'btnType',btnType , typeof(btnType))
        if(btnType === 'follower'){
          this.userFollowers.map( userFollower => {
            if(userFollower.followerId === id){
              userFollower.isFollowed = false  
              return userFollower    
            }          
          })
        }else{
          this.userFollowings.map( userFollowing => {
            if(userFollowing.followingId === id){
              userFollowing.isFollowed = false
              return userFollowing            
            }
          })
        } 
        if(response.status !== 200) throw new Error(response.statusText)
        Toast.fire({
          icon:'success',
          title:'成功取消追蹤使用者'
        })
      }catch(error){
        console.log('error' , error)
        Toast.fire({
          icon: 'error',
          title: '無法取取消追蹤使用者，請稍後再試'
        })
      }
    },
    async fetchUserFollowers(userId){
      try{
        const response = await userAPI.followship.getUserFollowers({ userId })
        const data = response.data
        console.log(data)
        if(response.status !== 200) throw new Error(response.statusText)
        this.userFollowers = data[0].followerId === null? [] : [...data]
      }catch(error){
        console('error' , error)
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者跟隨者資料，請稍後再試!'
        })
      }
    },
    async fetchUserFollowings(userId){
      try{
        const response = await userAPI.followship.getUserFollowings({ userId })
        const data = response.data
        console.log(data)
        if(response.status !== 200) throw new Error(response.statusText)
        this.userFollowings = data[0].followingId === null? []:[...data]
      }catch(error){
        console('error' , error)
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者正在跟隨者資料，請稍後再試!'
        })
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.user__followship {
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
  .user__followPills {
    display: flex;
    height: 54px;
    li {
      height: 100%;
      width: 130px;
      font-size: 15px;
      font-weight: bold;
      color: $navPills;
      text-align: center;
      line-height: 54px;
      cursor: pointer;
      &.active {
        color: $navPills-active;
        border-bottom: 2px solid $navPills-active;
      }
    }
  }
  .user__follow--container {
    height: 1000px;
    .user__follow {
      margin-top: 0.5rem;
      .user__follow {
        display: flex;
        border: 1px solid $tweet-border;
        height: 95px;
        .follow__avatar--container {
          position: relative;
          width: 4rem;
          img {
            position: absolute;
            @extend %position-center;
            top: 2rem;
            height: 50px;
            width: 50px;
          }
        }
        .follow__info {
          flex: 1;
          position: relative;
          display: flex;
          flex-direction: column;
          .follow__title {
            height: 2rem;
            margin: 0.5rem 0;
            .follow__name {
              font-size: 15px;
              font-weight: bold;
            }
            .follow__account {
              font-size: 15px;
              color: $account;
            }
          }
          .follow__introduction {
            flex: 1;
            margin-bottom: 0.5rem;
            @include overflow-line-clamp(2);
          }
          .follow__btn {
            position: absolute;
            top: 0.5rem;
            right: 1rem;
            height: 25px;
            width: 60px;
            font-weight: bold;
            font-style: 15px;
            color: $btn-color;
            background-color: #fff;
            border: 1px solid $btn-color;
            &.active {
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