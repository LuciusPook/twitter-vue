<template>
  <div class="reply__modal">
    <div class="reply__modal--nav">
      <span 
        class="cancel-btn"
        @click="handleCancelReplyModal"
      >&#215;</span>
    </div>
    <div class="replyModal__tweet">
      <div class="replyModal__avatar--container">
        <img :src="tweet.User.avatar | emptyImage" alt="" class="reply__avatar">
        <span class="connect__line"></span>
      </div>
      <div class="replyModal__tweet--content">
        <div class="replyModal__title">
          <h3 class="replyModal__title--name">{{tweet.User.name}}</h3>
          <a href=""><p class="replyModal__title--account">@{{tweet.User.account}}</p></a>
          <span class="replyModal__title--time">．{{tweet.createdAt | fromNow}}</span>
        </div>
        <p class="replyModal__tweet--text">
         {{tweet.description}}
        </p>
        <div class="replyModal__tweet--account">回覆給<span>@{{tweet.User.account}}</span></div>
      </div>
    </div>
    <div class="replyModal__input--container">
      <div class="replyModal__input--avatarContainer">
        <img :src="currentUser.avatar | emptyImage" alt="" class="replyModal__input--avatar">
      </div>
      <div class="form__group--reply">
        <textarea 
          name="tweet__reply" 
          id="tweet__reply" 
          cols="30" 
          rows="10" 
          placeholder="推你的回覆"
          v-model="replyText"
          ></textarea>
      </div>
    </div>
    <button 
      class="reply__btn"
      @click="submitReply(tweetId)"
    >回覆</button>
  </div>
</template>

<script>
import { Toast } from '../utils/helpers'
import tweetAPI from './../apis/tweets'
import { fromNowFilter } from './../utils/mixins'
import { emptyImageFilter } from './../utils/mixins'
import { mapState } from 'vuex'
export default {
  name: 'ReplyModal',
  mixins:[fromNowFilter , emptyImageFilter],
  props:{
    tweetId:{
      type:Number,
      required:true
    }
  },
  data(){
    return {
      replyText:'',
      tweet:{}
    }
  },
  computed:{
    ...mapState(['currentUser'])
  },
  created(){
    this.fetchTweet(this.tweetId)
  },
  methods:{
    handleCancelReplyModal(){
      this.$store.commit('toggleReplyModal')
    },
    async submitReply(tweetId){
      try{
        const response = await tweetAPI.reply.addReply({tweetId , comment:this.replyText})
        const payload = {status:response.status , tweetId}
        this.$emit('after-submit-reply' , payload)
        this.handleCancelReplyModal()
        if(response.status !== 200) throw new Error(response.statusText)  
      }catch(error){
        console.log('error' , error)
      }
    },
    async fetchTweet(tweetId){
      try{
        const response = await tweetAPI.getTweet({ tweetId })
        const data = response.data
        if(response.status !== 200) throw new Error(response.statusText)
        this.tweet = {...data}
      }catch(error){
        console.log('error' , error)
        Toast.fire({
          icon:'error',
          title:'無法取得推文資料，請稍後再試!'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .reply__modal{
    position:absolute;
    z-index:999;
    top:54px;
    left:50%;
    transform: translateX(-50%);
    width: 600px;
    height: 450px;
    border-radius: 14px;
    background-color:$white;
    @extend %standard-boxshadow;
    &::before{
      content:'';
      position:absolute;
      z-index: -1;
      top: -1000%;
      left: -1000%;
      right: -1000%;
      bottom: -725px;
      background-color: gray;
      opacity: 0.8;
    }
    .reply__modal--nav{
      height: 55px;
      background-color:$white;
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
      display: flex;
      height: 10rem;
      border-top: 2px solid $tweet-border;
      padding-top: 1rem;
      background-color:$white;
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
          color:$account;
          font-weight: bold;
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
      display: flex;
      padding-top: 0.5rem;
      background-color: $white;
      .replyModal__input--avatarContainer{
        width: 5rem;
        img{
          height: 50px;
          width: 50px;
          margin: 0 auto;
          border-radius: 50%;
        }
      }
      .form__group--reply{
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
      bottom: 15px;
      right: 15px;
      width: 66px;
      height: 38px;
      border-radius: 100px;
      font-size: 18px;
      font-weight: bold;
    }
  }
</style>