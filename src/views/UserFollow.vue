<template>
  <div class="user__follow">
    <div class="user__navbar">
      <a class="user__navbar--prev" @click="$router.back()"></a>
      <div class="user__navbar--info">
        <h2 class="user__navbar--userName">John Doe</h2>
        <p class="user__navbar--totalTweetsCount">25推文</p>
      </div>
    </div>
    <ul class="user__followPills">
      <li class="user__followPills--followers active">
        跟隨者
      </li>
      <li class="user__followPills--followings">
        正在跟隨
      </li>
    </ul>
    <ul class="user__follow--followers">
      <li class="user__follow--follower">
        <div class="follower__avatar--container">
          <img src="./../assets/Photo_avatar.png" alt="" class="follower__avatar">
        </div>
        <div class="follower__info">
          <div class="follower__title">
            <h2 class="follower__name">Laure</h2>
            <div class="follower__account">@LaureBill</div>
          </div>
          <p class="follower__introduction">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem magnam molestiae mollitia sit nisi repellendus nam, vel vero. Aliquam maiores magnam dolorum voluptas porro neque perspiciatis ratione, provident sunt laboriosam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, accusantium tempore quibusdam architecto ut quisquam repellat eum dolore facilis delectus.
          </p>
          <button
            :class="['follow__btn', { active: isFollowed }]"
            @click="handleFollowBtnClicked"
          >
            {{ isFollowed ? "正在跟隨" : "跟隨" }}
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UserFollow",
  data(){
    return {
      isFollowed: true
    }
  },
  methods:{
    handleFollowBtnClicked(){
      this.isFollowed = ! this.isFollowed
    }
  }
};
</script>

<style lang="scss" scoped>
.user__follow{
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
  .user__follow--followers{
    margin-top: 0.5rem;
    .user__follow--follower{
      display: flex;
      border: 1px solid $tweet-border;
      height: 95px;
      .follower__avatar--container{
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
      .follower__info{
        flex:1;
        position: relative;
        display: flex;
        flex-direction: column;
        .follower__title{
          height: 2rem;
          margin: 0.5rem 0;
          .follower__name{
            font-size: 15px; 
            font-weight: bold;
          }
          .follower__account{
            font-size: 15px; 
            color: $account;
          }
        }
        .follower__introduction{
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
</style>