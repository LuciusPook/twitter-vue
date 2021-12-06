<template>
  <div class="reply__modal">
    <div class="reply__modal--nav">
      <span class="cancel-btn">&#215;</span>
    </div>
    <div class="replyModal__tweet">
      <div class="replyModal__avatar--container">
        <img src="./../assets/Photo_avatar.png" alt="" class="reply__avatar">
        <span class="connect__line"></span>
      </div>
      <div class="replyModal__tweet--content">
        <div class="replyModal__title">
          <h3 class="replyModal__title--name">Apple</h3>
          <a href=""><p class="replyModal__title--account">@apple</p></a>
          <span class="replyModal__title--time">．3小時</span>
        </div>
        <p class="replyModal__tweet--text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur amet ea ad cumque ullam natus provident doloremque et hic corrupti eum illo quam a beatae voluptate perferendis facilis, veritatis n amet ea ad cumque ullam natus provident doloremque et hic corrupti eum illo quam a beatae voluptate perferendis facilis, veritatis neque.
        </p>
        <div class="replyModal__tweet--account">回覆給<span>@apple</span></div>
      </div>
    </div>
    <div class="replyModal__input--container">
      <div class="replyModal__input--avatarContainer">
        <img src="./../assets/Photo_avatar.png" alt="" class="replyModal__input--avatar">
      </div>
      <div class="form__group">
        <textarea name="tweet__reply" id="tweet__reply" cols="30" rows="10" placeholder="推你的回覆"></textarea>
      </div>
    </div>
    <button class="reply__btn">回覆</button>
  </div>
</template>

<script>
export default {
  name: 'ReplyModal'
}
</script>

<style lang="scss" scoped>
.reply__modal{
  position:absolute;
  @extend %standard-boxshadow;
  @extend %position-center;
  z-index: 2;
  width: 600px;
  height: 450px;
  border-radius: 14px;
  background-color: $white;
  .reply__modal--nav{
    height: 55px;
    @extend %standard-boxshadow;
    .cancel-btn{
      line-height: 55px;
      font-size: 2rem;
      font-weight: bold;
      color: $btn-color;
      margin: 20px;
    &:hover{
        cursor: pointer;
      }
    }
  }
  .replyModal__tweet{
    height: 10rem;
    display: flex;
    margin-top: 18px;
    .replyModal__avatar--container{
      position: relative;
      width: 5rem;
      .reply__avatar{
        margin: 0 auto;
        height: 50px;
        width: 50px;
        border-radius: 50%;
      }
      .connect__line{
        position:absolute;
        top: 100px;
        transform: rotate(90deg);
        width: 80px;
        height: 2px;
        background-color: #CCD6DD;
      }
    }
    .replyModal__tweet--content{
      flex:1;
      display: flex;
      height: 163px;
      flex-direction: column;
      .replyModal__title{
        display: flex;
        align-items: center;
        .replyModal__title--name{
          font-size: 15px;
          font-weight: bold;
          margin-right: 5px;
        }
        .replyModal__title--account{
          font-size: 15px;   
          color:$account;  
        }
        .replyModal__title--time{
          font-size: 15px;
          color:$account;  
        }
      }
      .replyModal__tweet--text{
        flex:1;
        line-height: 22px;
        padding: 0.5rem 0 ;
        font-size: 15px;
        @include overflow-line-clamp(3);
      }
      .replyModal__tweet--account{
        margin: 1.5rem 0;
        display: flex;
        align-items: center;
        span{
          color:$reply-account;
          font-weight: bold;
          margin-left: 3px;
          vertical-align: bottom;
        }
      }
    }
  }
  .replyModal__input--container{
    height: 160px;
    display: flex;
    .replyModal__input--avatarContainer{
      width: 5rem;
      img{
        height: 50px;
        width: 50px;
        margin: 0 auto;
        border-spacing: 50%;
      }
    }
    .form__group{
      flex:1;
      #tweet__reply{
        position: relative;
        border:none;
        height: 100%;
        width: 100%;
        font-size: 18px;
        resize: none;
        &::placeholder{
          position: absolute;
          top:0.8rem;
          font-size: 18px;
          color:#9197A3;
          font-weight: bold;
        }

      }
    }
  }
  .reply__btn{
    position:absolute;
    width: 66px;
    height: 38px;
    border-radius: 100px;
    font-size: 18px;
    font-weight: bold;
    bottom: 15px;
    right: 15px;
  }
}
</style>