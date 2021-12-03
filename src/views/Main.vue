<template>
  <div class="main">
    <div class="main__navbar">首頁</div>
    <div class="createTweet">
      <div class="createTweet__avatar--wrapper">
        <a href="">
          <img src="./../assets/Photo_avatar.png" alt="" class="createTweet__avatar" />
        </a>
      </div>
      <div class="form__group">
        <textarea
          class="newTweet form__control"
          :rows="textAreaRows"
          name="newTweet"
          id="newTweet"
          placeholder="有什麼新鮮事?"
          @focus="handleInputFocus"
          @blur="handleInputBlur"
        />
        <button type="submit">推文</button>
      </div>
    </div>
    <ul class="main__tweets">
      <li class="main__tweet">
        <div class="tweet__avatar--wrapper">
          <a href="">
            <img src="./../assets/Photo_avatar.png" alt="" class="tweet__avatar" />
          </a>
        </div>
        <div class="tweet__content">
          <p class="tweet__title">
            <span class="tweet__tweeter--name"> Apple </span>
            <a href="" class="tweet__tweeter--account">@apple</a>
            <span class="tweet__createdTime">．3小時</span>
          </p>
          <p class="tweet__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed natus unde eaque dicta ipsa earum. Repellat fugiat ratione, provident cum tempora omnis! Molestiae facere at eligendi sapiente quam. Voluptatibus velit aspernatur consequatur voluptate inventore distinctio, consectetur qui ipsam et assumenda ducimus impedit commodi dolorem nobis debitis porro accusamus neque iure.
          <div class="tweet__content--interaction">
            <span class="tweet__interaction--replies">
              <img
                src="./../assets/Vector_reply-icon.svg"
                alt=""
                class="interaction__replies--icon"
              />
              <span class="interaction__replies--counts">101</span>
            </span>
            <span class="tweet__interaction--likes">
              <img
                src="./../assets/Vector_like-icon.svg"
                alt=""
                class="likes--icon"
              />
              <span class="likes--counts">101</span>
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

  <script>
  export default {
    name: 'Main',
    data(){
      return {
        textAreaRows:3,
      }
    },
    methods:{
      handleInputFocus(){
        this.textAreaRows = 15
      },
      handleInputBlur(){
        this.textAreaRows = 3
      }
    }
  
  }
  </script>

<style lang="scss" scoped>
.main {
  background-color: $tweet-border;
  flex:1;
  .main__navbar{
    height: 55px;
    font-size: 18px;
    font-weight: bold;
    line-height: 55px;
    padding-left: 1rem;
    background-color: $white;
  }
  .createTweet{
    height: 120px;
    display: flex;
    background-color: $white;
    margin-top: 2px;
    .createTweet__avatar--wrapper{
      position: relative;
      width: 75px;
      img{
        position: absolute;
        top: 9px;
        left: 50%;
        transform: translateX(-50%);
        height: 50px;
        width: 50px;
      }
    }
    .form__group{
      position: relative;
      flex:1;
      textarea{
        resize:none;
        border:none;
        width: calc(100% - 100px);
        font-size: 16px;
        border-radius: 0 25px 25px 25px;
        padding: 1rem 1rem 2rem 0.5rem;
        &::placeholder{
          font-weight: bold;
          font-size: 18px;
        }
        &:focus{
          @extend %standard-boxshadow; 
        }
      }
      button{
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 66px;
        height: 38px;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
  .main__tweets {
    background-color: $white;
    margin-top: 10px;
    .main__tweet {
      display: flex;
      height: 145px;
      .tweet__avatar--wrapper{
        position: relative;
        width: 75px;
        img{
          position: absolute;
          top: 9px;
          left: 50%;
          transform: translateX(-50%);
          height: 50px;
          width: 50px;
        }
      }
      .tweet__content {
        width: 100%;
        display: flex;
        flex-direction: column;
        .tweet__title{
          margin-top: 1rem;
          span{
            font-size: 15px;
            font-weight: 700;
            ~span{
              font-weight: 500;
              color: $account;
            }
          }
          a{
            color: $account;
          }
        }
        .tweet__text{
          margin-top: 10px;
          flex:1;
          @include overflow-line-clamp(3);
        }
        .tweet__content--interaction {
          display: flex;
          align-items: center;
          margin: 2px 0;
          height: 40px;
          > span {
            display: flex;
            margin-right: 3rem;
            img {
              height: 1rem;
              width: 1rem;
              margin-right: 0.5rem;
            }
          }
        }
      }
    }
  }
}
</style>
