<template>
  <!-- Modal -->
  <div 
    :class="['user__edit--modal' , {edit:isEditing}]"
  >
    <div class="edit__modal--title">
      <span 
        class="modal__cancel"
        @click="handleCancelEditBtnCkicked"
      >&#215;</span>
      <h3 class="modal__name">編輯個人資料</h3>
      <button type="submit" class="modal__submit">儲存</button>
    </div>
    <div class="userCard">
      <div class="user__card--bannerWrapper">
        <img
          class="user__card--banner"
          :src="user.cover"
          alt=""
        />
      </div>
      <div class="avatar__wrapper">
        <img
          :src="user.avatar"
          alt=""
          class="user__card--avatar"
        />
        <label for="avatarImage">
          <img 
            src="./../assets/Group_edit-avatar.svg" 
            alt="" 
            class="avatar__edit"
          >
        </label>
        <input
            id="avatarImage"
            type="file"
            name="avatar-image"
            accept="image/*"
            class="form-control-file d-none"
            @change="handleAvatarFileChange"
          />
      </div>
      <div class="user__card--form">
        <div class="form-group">
          <label for="bannerImage">
            <img
              src="./../assets/Group_edit-avatar.svg"
              alt=""
              class="edit__banner"
            />
          </label>
          <img
            src="./../assets/Vector_cancel-icon.svg"
            alt=""
            class="edit__banner--cancel"
            @click="handleBannerCancelClicked"
          />
          <input
            id="bannerImage"
            type="file"
            name="banner-image"
            accept="image/*"
            class="form-control-file d-none"
            @change="handleBannerFileChange"
          />
        </div>
        <div class="form-group">
          <input
            id="name"
            type="text"
            class="form-control"
            name="name"
            placeholder="名稱"
            required
          />
          <span class="wordMax">8/50</span>
        </div>
        <div class="form-group">
          <textarea
            id="description"
            class="form-control"
            rows="3"
            name="description"
            placeholder="自我介紹"
          />
          <span class="wordMax">0/160</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import defaultBanner from './../assets/Cover Photo_banner.png'
import defaultAvatar from './../assets/Photo_avatar.png'
const dummyUser = {
  status: "success",
  message: "",
  id: 1,
  account: "123",
  name: "123",
  email: "123",
  password: "$2a$10$cP/f.QWf2RnjZKhQjD6CDuAQzOanuBdf1S48Akrp2el9jPzUzfBNu",
  role: null,
  cover: null,
  avatar: null,
  introduction: null,
  createdAt: "2021-12-01T08:01:39.000Z",
  updatedAt: "2021-12-01T08:01:39.000Z",
};
export default {
  name: "UserEditModal",
  data() {
    return {
      user:{}
    };
  },
  created(){
    this.fetchUser()
  },
  props:{
    isEditing:{
      type:Boolean,
      required:true
    }
  },
  methods: {
    fetchUser(){
      this.user = {
        ...this.user,
        ...dummyUser,
        cover: dummyUser.cover || defaultBanner,
        avatar: dummyUser.avatar || defaultAvatar
      }
    },
    handleCancelEditBtnCkicked(){
      this.$emit("after-cancel-edit");
    },
    handleBannerCancelClicked(e) {
      console.log(e);
      this.user.cover = ''
    },
    handleBannerFileChange(e) {
      const {files} = e.target
      const imgURL = window.URL.createObjectURL(files[0])
      this.user.cover = imgURL
    },
    handleAvatarFileChange(e) {
      const {files} = e.target
      const imgURL = window.URL.createObjectURL(files[0])
      this.user.avatar = imgURL
    },
  },
};
</script>
<style lang="scss" scoped>
.user__edit--modal {
  position: absolute;
  z-index: 2;
  @extend %standard-boxshadow;
  @extend %position-center;
  width: 600px;
  height: 657px;
  background-color: #fff;
  border-radius: 1rem;
  &.edit::before{
    content:'';
    position:absolute;
    z-index: -1;
    top: -1000%;
    left: -1000%;
    right: -1000%;
    bottom: -300px;
    background-color: gray;
    opacity: 0.8;
  }
  .edit__modal--title {
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-rows: 1fr;
    grid-template-columns: 3rem auto 5rem;
    grid-template-areas: "cancel  name  submit";
    height: 55px;
    background-color: #fff;

    .modal__cancel {
      grid-area: "cancel";
      line-height: 55px;
      font-size: 2rem;
      font-weight: bold;
      color: $btn-color;
      &:hover{
        cursor: pointer;
      }
    }
    .modal__name {
      grid-area: "name";
      padding-left: 1rem;
      font-weight: bold;
      justify-self: start;
    }
    .modal__submit {
      grid-area: "submit";
      height: 28px;
      width: 66px;
      font-size: 18px;
      font-weight: bold;
    }
  }
  .userCard {
    position: relative;
    height: calc(100% - 55px);
    display: flex;
    flex-direction: column;
    background-color: #fff;
    .user__card--bannerWrapper {
      height: 200px;
      width: 100%;
      // background-color: $dark-gray;
      img:hover{
        opacity: 0.5;
      }
    }
    .avatar__wrapper{
      position: absolute;
      height: 140px;
      width: 140px;
      border-radius: 50%;
      top: calc(200px - 70px);
      left: 1.5rem;
      border: 5px solid $white;
      background-color: $white;
      .user__card--avatar{
        border-radius: 50%;
        &:hover{
          opacity: 0.5;
        }
      }
      .avatar__edit {
        position: absolute; 
        @extend %position-center;
        height: 24px;
        width: 24px;
      }
    }
    .user__card--form {
      flex: 1;
      padding: 6rem 1rem 2rem;
      label {
        img {
          position: absolute;
          top: -200px;
          left: calc(50% - 2rem);
          height: 24px;
          width: 24px;
        }
      }
      .edit__banner--cancel {
        position: absolute;
        top: -200px;
        left: calc(50% + 2rem);
        height: 24px;
        width: 24px;
      }
      .form-group {
        position: relative;
        input,
        textarea {
          position: relative;
          width: 100%;
          height: 54px;
          border: none;
          border-bottom: 2px solid black;
          background-color: #f5f8fa;
          &::placeholder {
            position: absolute;
            top: 2px;
            left: 1rem;
            width: 4rem;
            height: 2rem;
            font-size: 15px;
            font-weight: bold;
          }
          + span {
            position: absolute;
            z-index: 3;
            top: 100%;
            right: 0px;
            color: $follow-text;
          }
        }
        textarea {
          height: 150px;
          margin-top: 2rem;
          resize: none;
        }
      }
    }
  }
}
</style>