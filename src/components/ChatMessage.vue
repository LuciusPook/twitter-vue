<template>
  <ul class="chats__content">
    <li 
      v-for="chat in chats" 
      :key="chat.id"
      :class="['chat__content',{user__chat:chat.name !== currentUser.name}]">
      <div class="chat__container">
        <div
          v-if="chat.name !== currentUser.name" 
          class="chat__avatar--container"
        >
          <img class="chat__avatar" src="./../assets/Photo_avatar.png" alt="">
        </div>
        <div class="chat__content--info">
          <p class="chat__content--message">{{chat.message}}</p>
          <span class="chat__content--createdAt">few second ago...</span>
        </div>
      </div> 
    </li>
  </ul>
</template>

<script>
const dummyData =[
  {
    id:1,
    name:'user1',
    message:'hellohellohellohellohellohellhellohellohellohellhellohellohellohellhellohellohellohellhellohellohellohellohellohello'
  },
  {
    id:2,
    name:'user2',
    message:'hello'
  },
  {
    id:3,
    name:'user3',
    message:'hello'
  },
  {
    id:4,
    name:'user4',
    message:'hello'
  }
]
import { mapState } from "vuex";
export default {
  name: "ChatMessage",
  props: {
    allMessage: {
      type: Array,
      required: false,
    },
    newMessage: {
      type: Object,
      required: false,
    },
  },
  data(){
    return{
      chats:[]
    }
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    this.chats = [...dummyData]
  },
  watch:{
    newMessage(newValue){
      this.chats.push(newValue)
    }
  },
};
</script>

<style lang="scss" scoped>
.chats__content{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  li{
    width: 100%;
    margin: 1rem .5rem;
    .chat__container{
      display: flex;
      justify-content: flex-end;
      .chat__avatar--container{
        position: relative;
        width: 50px;
        img{
          position:absolute;
          left: 50%;
          transform: translateX(-50%);
          top:0;
          width: 40px;
          height: 40px;
        }
      }
      .chat__content--info{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .chat__content--message{
          max-width: 400px;
          overflow-wrap: break-word;
          background-color: #FF6600;
          color:$white;
          font-size: 15px;
          padding: 10px;
          border-radius: 25px 25px 0px 25px;
        }
        .chat__content--createdAt{
          color:#657786;
          font-size: 13px;

        }
      }
    }

  }
  li.user__chat{
    .chat__container{
      justify-content: flex-start;
      .chat__content--info{
        align-items: flex-start;
        .chat__content--message{
          background-color: #E6ECF0;
          color:black;
          border-radius: 25px 25px 25px 0px ;
        }
      }
    }
  }
}
</style>