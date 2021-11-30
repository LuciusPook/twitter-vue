<template>
  <div class="user">
    <div class="user__navbar">
      <a 
        class="user__navbar--prev"
        @click="$router.back()"  
      ></a>
      <div class="user__navbar--info">
        <h2 class="user__navbar--userName">John Doe</h2>
        <p class="user__navbar--totalTweetsCount"> 25推文</p>
      </div>
    </div>
     <div class="userCard">
       <div class="user__card--bannerWrapper">
         <img class="user__card--banner" src="./../assets/Cover Photo_banner.png" alt="">
       </div>
       <img src="./../assets/Photo_avatar.png" alt="" class="user__card--avatar">
       <div class="user__card--info">
         <button class="user__edit">編輯個人資料</button>
         <div class="userInfo__title">
          <h2 class="userInfo__title--name">John Doe</h2>
          <p class="userInfo__title--account">@heyjohn</p>
         </div>
         <p class="userInfo__introduction">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni neque eum quos!</p>
         <div class="userInfo__follow">
           <span class="userInfo__followings"><span class="followingsCounts">34個</span>跟隨中</span>
           <span class="userInfo__followers"><span class="followersCounts">59位</span>跟隨者</span>
         </div>
         
       </div>
     </div>
     <ul class="user__navPills">
       <li class="user__tweets">推文</li>
       <li class="user__tweetsPlusReplies active">推文與回覆</li>
       <li class="user__likedTweets">喜歡的內容</li>
     </ul>
     <div class="user__tweetsContainer scrollbar">
       <UserTweets/>
     </div>
  </div>
</template>
<script>
import UserTweets from './../components/UserTweets.vue'
export default {
  name:'User',
  components: {
    UserTweets
  }
}
</script>
<style lang="scss" scoped>
.user {
  flex:1;
  .user__navbar{
    display: flex;
    padding: 0.5rem 0;
    height: 55px;
    .user__navbar--prev{
      position: relative;
      flex-basis: 5rem;
      &::before{
        content:'\279C';
        position: absolute;
        top: 50%;
        left: 30%;
        transform: translateX(-50%) translateY(-50%) rotate(180deg);
      }
    }
    .user__navbar--info{
      flex: 1;
      .user__navbar--userName{
        font-size: 19px;
        color: $title-color;
      }
      .user__navbar--totalTweetsCount{
        font-size: 13px;
        color: $account;
      }
    }
  }
  .userCard{
    position: relative;
    height: 33%;
    display: flex; 
    flex-direction: column;
    .user__card--bannerWrapper{
      height: 50%;
      width: 100%;
    }
    .user__card--avatar{
      position: absolute;
      height: 140px;
      width: 140px;
      border-radius: 50%;
      top: calc(50% - 70px);
      left: 1.5rem;
      border: 5px solid $white;
    }
    .user__card--info{
      position: relative;
      height: 50%;
      padding: 4.5rem 0 2rem 1rem;
      .user__edit{
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
      }
      .userInfo__title--name{
        font-size: 19px;
        color: $title-color;
      }
      .userInfo__title--account{
        font-size: 15px;
        color: $account;
      }
      .userInfo__introduction{
        padding: 10px 0;
        font-size: 14px;
      }
      .userInfo__follow{
        font-size: 14px;
        color:$follow-text;
        > span{
          margin-right: 1rem;
          > span{
            color: #000;
            font-weight: bold;
            margin-right: 3px;
          }
        }
      }
    }
  }
  .user__navPills{
    height: 3rem;
    width: 100%;
    display: flex;
    justify-content: start;
    li{
      width: 20%;
      text-align: center;
      line-height: 3rem;
      color:$navPills;
      font-weight: bold;
      &.active{
        color: $navPills-active;
        border-bottom: 2px solid $navPills-active;
      }
    }

  }
  .user__tweetsContainer{
    height: 720px;
    padding-top: 1rem;
  }
}
</style>