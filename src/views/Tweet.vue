<template>
  <div class="tweet__container">
    <div class="tweet__navbar">
      <a class="tweet__navbar--prev" @click="$router.back()"></a>
      <div class="tweet__navbar--info">推文</div>
    </div>
    <div class="tweet__card">
      <div class="tweet__title">
        <div class="tweet__avatar--container">
          <a href="">
            <img
              src="./../assets/Photo_avatar.png"
              alt=""
              class="tweet__avatar"
            />
          </a>
        </div>
        <div class="tweet__title--info">
          <h3 class="tweet__title--name">Apple</h3>
          <a href=""><p class="tweet__title--account">@apple</p></a>
        </div>
      </div>
      <p class="tweet__context">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem dolorum
        iusto dolor assumenda exercitationem unde sed commodi magni ex! Quas
        accusamus recusandae cum et voluptate magni quasi amet tempora, labore
        nobis natus enim ut, nemo hic dignissimos dolorem debitis repellat
        exercitationem facilis mollitia. Magnam, recusandae! Sit a hic id
        doloremque?
      </p>
      <span class="tweet__time">上午10:05．2020年6月10號</span>
      <div class="tweet__counts">
        <span class="tweet__commentCounts">34 <span>回覆</span></span>
        <span class="tweet__likeCounts">808<span>喜歡次數</span></span>
      </div>
      <div class="tweet__interactions">
        <img
          src="./../assets/Vector_reply-icon.svg"
          alt=""
          class="tweet__commentBtn"
        />
        <img
          src="./../assets/Vector_like-icon.svg"
          alt=""
          class="tweet__likeBtn"
        />
      </div>
    </div>
    <div class="tweet__replies--container scroll">
      <ul class="tweet__replies">
        <li class="tweet__reply">
          <div class="reply__avatar--container">
            <img src="./../assets/Photo_avatar.png" alt="" class="reply__avatar" />
          </div>
          <div class="tweet__reply--content">
            <div class="tweet__reply--title">
              <h3 class="reply__user--name">Mary Jane</h3>
              <span class="reply__user--account">
                <a href=""> 
                  <span>@mjjane</span>
                </a>
                <span>．3小時</span>
              </span>
            </div>
            <p class="tweet__reply--tag">
              <span>回覆</span>
              <a href="">
                <span class="tweet__account">
                  @apple
                </span> 
              </a>
            </p>
            <p class="tweet__reply--text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque ex enim facilis recusandae quae. Architecto suscipit fugiat nihil? Omnis, tempora.orem ipsum, dolor sit amet consectetur adipisicing elit. Cumque ex enim facilis recusandae quae. Architecto suscipit fugiat nihil? Omnis, tempora.orem ipsum, dolor sit amet consectetur adipisicing elit. Cumque ex enim facilis recusandae quae. Architecto suscipit fugiat nihil? Omnis, tempora.t nihil? Omnis, tempora.orem ipsum, dolor sit amet consectetur adipisicing elit. Cu
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tweet__container {
  flex: 1;
  .tweet__navbar {
    display: flex;
    height: 55px;
    border-bottom: 1px solid $tweet-border;
    .tweet__navbar--prev {
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
    .tweet__navbar--info {
      flex: 1;
      line-height: 55px;
      font-size: 18px;
      font-weight: 700;
    }
  }
  .tweet__card {
    display: flex;
    flex-direction: column;
    height: 399px;
    .tweet__title {
      display: flex;
      height: 5rem;
      .tweet__avatar--container {
        position: relative;
        width: 5rem;
        img {
          position: absolute;
          @extend %position-center;
          height: 50px;
          width: 50px;
        }
      }
      .tweet__title--info {
        flex: 1;
        padding: 18px 0;
        font-size: 15px;
        .tweet__title--name {
          font-weight: 700;
        }
        .tweet__title--account {
          font-weight: 500;
        }
      }
    }
    .tweet__context {
      flex: 1;
      font-size: 23px;
      line-height: 35px;
      padding: 0 15px;
      @include overflow-line-clamp(4);
    }
    .tweet__time {
      font-size: 15px;
      margin: 0.5rem 15px;
    }
    .tweet__counts {
      font-size: 19px;
      height: 68px;
      padding: 20px;
      margin: 0 15px;
      border-top: 1px solid $tweet-border;
      border-bottom: 1px solid $tweet-border;
      span {
        font-size: 19px;
        margin-right: 20px;
        span {
          color: $follow-text;
        }
      }
    }
    .tweet__interactions {
      display: flex;
      align-items: center;
      height: 68px;
      margin-left: 15px;
      img {
        height: 25px;
        width: 25px;
        margin-right: 155px;
      }
    }
  }
  .tweet__replies--container{
    height: 1000px;
    .tweet__replies{
      .tweet__reply{
        height: 105px;
        display: flex;
        border: 1px solid $tweet-border;
        .reply__avatar--container{
          position: relative;
          width: 5rem;
          img{
            position: absolute;
            top: 18px;
            left: 50%;
            transform: translateX(-50%);
            height: 50px;
            width: 50px;
          }
        }
        .tweet__reply--content{
          flex:1;
          .tweet__reply--title{
            display: flex;
            align-items: center;
            font-size: 15px;
            margin-top: 15px;
            margin-bottom: 4px;
            .reply__user--name{
              font-weight: 700;
              margin-right: 5px;
            }
            .reply__user--account{
              span{
                color:$account;
                vertical-align: middle;
              }
            }
          }
          .tweet__reply--tag{
            font-size: 15px;
            span{
              vertical-align: middle;
            }
            .tweet__account{
              color:$reply-account;
            }
          }
          .tweet__reply--text{
            flex:1;
            @include overflow-line-clamp(2);
          }
        }
      }
    }
  }
}
</style>