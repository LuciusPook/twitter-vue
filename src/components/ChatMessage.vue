<template>
  <ul class="chats__content">
    <Spinner v-if="isLoading"/>
    <li
      v-else
      v-for="chat in chats"
      :key="chat.id"
      :class="['chat__content', { user__chat: chat.UserId && chat.UserId !== currentUser.id }]"
    >
      <div 
        v-show="!chat.loginMsg && !chat.logoutMsg"
        class="chat__container">
        <div
          v-if=" chat.UserId && chat.UserId !== currentUser.id"
          class="chat__avatar--container"
        >
          <img
            class="chat__avatar"
            :src="chat.avatar | emptyImage"
            alt=""
          />
        </div>
        <div class="chat__content--info">
          <p class="chat__content--message">{{ chat.content }}</p>
          <span class="chat__content--createdAt">{{
            chat.createdAt | fromNow
          }}</span>
        </div>
      </div>
      <template>
        <div class="logMessageContainer">
          <span v-show="chat.loginMsg" class="chat__logMsg">{{
            chat.loginMsg
          }}</span>
          <span v-show="chat.logoutMsg" class="chat__logMsg">{{
            chat.logoutMsg
          }}</span>
        </div>
      </template>
    </li>
  </ul>
</template>

<script>
// import { io }  from 'socket.io-client';
import { mapState } from "vuex";
import { fromNowFilter, emptyImageFilter } from "./../utils/mixins";
import chatAPI from "./../apis/chat"
import Spinner from "./../components/Spinner.vue"
export default {
  name: "ChatMessage",
  components:{
    Spinner
  },
  props:{
    roomName:{
      type: String,
      required: true,
    }
  },
  watch:{
    roomName(){
      this.fetchHistoryMessage(this.roomName)     
    }
  },
  data() {
    return {
      chats: [],
      isLoading: false,
    };
  },
  mixins: [fromNowFilter, emptyImageFilter],
  computed: mapState({
    currentUser: (state) => state.currentUserModule.currentUser,
  }),
  // {
  //   // ...mapState(["currentUser"]),
  // },
  created(){
    this.fetchHistoryMessage(this.roomName)
  },
  // 當資料被更新時，觸發updated裡的函式
  updated(){
    this.$emit('after-retrieve-allMessage')
  },
  methods:{
    async fetchHistoryMessage(roomName){
      try{
        this.isLoading = true
        const response = await chatAPI.getHistory({roomName})
        if (response.status !== 200) throw new Error(response.statusText);
        this.chats = [...response.data];
        this.isLoading = false
      }catch(error){
        this.isLoading = false
        console.log(error)
      }
    }
  },
  sockets: {
    connect() {
      console.log("socket connected");
    },
    // allMessage(allMessage) {
    //   this.isLoading = true
    //   this.chats = [...allMessage];
    //   this.isLoading = false
    // },
    newMessage(newMessage){
      this.chats.push(newMessage)
      console.log(newMessage)
    },
    loginMsg(loginMsg){
      this.chats.push({loginMsg})
    },
    logoutMsg(logoutMsg){
      this.chats.push({logoutMsg})
    },
    disconnected() {  
      this.$socket.emit("disconnect", this.currentUser.id);
    },
    // messageNotRead(data) {
      // 	this.$store.commit("updateReadMessage",data)
    // },
  },
};
</script>

<style lang="scss" scoped>
.chats__content {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  li {
    // width: 100%;
    margin: 1rem 0.5rem;
    .chat__container {
      display: flex;
      justify-content: flex-end;
      .chat__avatar--container {
        position: relative;
        width: 50px;
        img {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .chat__content--info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .chat__content--message {
          max-width: 400px;
          overflow-wrap: break-word;
          background-color: #ff6600;
          color: $white;
          font-size: 15px;
          padding: 10px;
          border-radius: 25px 25px 0px 25px;
        }
        .chat__content--createdAt {
          color: #657786;
          font-size: 13px;
        }
      }
    }
    .logMessageContainer{
      width: 100%;
      display: flex;
      justify-content: center;
      .chat__logMsg{
        height: 29px;
        background-color: #E5E5E5;
        border-radius: 50px;
        padding: 7px 14px;
        border-radius: 50px;
        color: #657786;
        font-weight: 500;
        font-size: 15px;
        line-height: 15px;
      }
    }
  }
  li.user__chat {
    .chat__container {
      justify-content: flex-start;
      .chat__content--info {
        align-items: flex-start;
        .chat__content--message {
          background-color: #e6ecf0;
          color: black;
          border-radius: 25px 25px 25px 0px;
        }
      }
    }
  }
}
</style>