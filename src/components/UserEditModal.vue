<template>
  <!-- Modal -->
  <form
    :class="['user__edit--modal', { edit: isEditing }]"
    @submit.stop.prevent="handleSubmit"
    enctype="multipart/form-data"
  >
    <div class="edit__modal--title">
      <span
        type="submit"
        class="modal__cancel"
        @click="handleCancelEditBtnClicked"
        >&#215;</span
      >
      <h3 class="modal__name">編輯個人資料</h3>
      <button type="submit" class="modal__submit">儲存</button>
    </div>
    <div class="userCard">
      <div class="user__card--bannerWrapper">
        <img 
          class="user__card--banner" 
          :src="user.cover | emptyImage" 
          alt="">
      </div>
      <div class="avatar__wrapper">
        <img
          :src="user.avatar | emptyImage"
          alt=""
          class="user__card--avatar"
        >
      </div>
      <div class="form__group">
        <label for="avatarImage">
          <img
            src="./../assets/Group_edit-avatar.svg"
            alt=""
            class="avatar__edit"
          />
        </label>
        <input
          id="avatarImage"
          type="file"
          name="avatar"
          accept="image/*"
          class="form-control-file d-none"
          @change="handleAvatarFileChange"
        />
      </div>
      <div class="form__group">
        <label for="bannerImage">
          <img
            src="./../assets/Group_edit-avatar.svg"
            alt=""
            class="edit__banner"
          />
        </label>
        <label 
          for="bannerImage"
          @click.stop.prevent="handleBannerCancelClicked"
        >
          <img
            src="./../assets/Vector_cancel-icon.svg"
            alt=""
            class="edit__banner--cancel"
          />
        </label>
        <input
          id="bannerImage"
          type="file"
          name="cover"
          accept="image/*"
          class="form-control-file d-none"
          @change="handleBannerFileChange"
        />
      </div>
      <div class="user__card--form">
        <div class="form__group">
          <input
            v-model="userName"
            id="name"
            type="text"
            class="form-control"
            name="name"
            placeholder="名稱"
            required
          />
          <span class="wordMax">{{ userName.length }}/50</span>
        </div>
        <div class="form__group">
          <textarea
            v-model="userIntro"
            id="introduction"
            class="form-control"
            rows="3"
            name="introduction"
            placeholder="自我介紹"
          />
          <span class="wordMax">{{ userIntro.length }}/160</span>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import { emptyImageFilter } from "./../utils/mixins";
export default {
  name: "UserEditModal",
  mixins: [emptyImageFilter],
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      user: {},
      userIntro: "",
      userName: "",
    };
  },
  created() {
    this.user = {
      ...this.user,
      ...this.initialUser
    }
    this.userIntro = this.initialUser.introduction;
    this.userName = this.initialUser.name;
  },
  methods: {
    handleCancelEditBtnClicked() {
      this.$emit("after-cancel-edit");
    },
    handleSubmit(e) {
      const form = e.target;
      const formData = new FormData(form);
      const payload = {
        formData,
        newName: this.userName,
        newIntro: this.userIntro,
        newUserCover: this.user.cover,
        newUserAvatar: this.user.avatar,
      };
      this.$emit("after-edit-submit", payload);
      this.handleCancelEditBtnClicked();
    },
    handleBannerCancelClicked() {
      // const bannerFile = document.querySelector('#bannerImage')
      // bannerFile.target.file = {}
      this.user.cover = "";
    },
    handleBannerFileChange(e) {
      const { files } = e.target;
      const imgURL = window.URL.createObjectURL(files[0]);
      this.user.cover = imgURL;
    },
    handleAvatarFileChange(e) {
      const { files } = e.target;
      const imgURL = window.URL.createObjectURL(files[0]);
      this.user.avatar = imgURL;
    },
  },
};
</script>
<style lang="scss" scoped>
.user__edit--modal {
  position: absolute;
  z-index: 999;
  @extend %standard-boxshadow;
  @extend %position-center;
  width: 600px;
  height: 657px;
  background-color: #fff;
  border-radius: 1rem;
  &.edit::before {
    content: "";
    position: absolute;
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
      &:hover {
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
      img:hover {
        opacity: 0.5;
      }
    }
    .avatar__wrapper {
      position: absolute;
      height: 140px;
      width: 140px;
      border-radius: 50%;
      top: calc(200px - 70px);
      left: 1.5rem;
      border: 5px solid $white;
      background-color: $white;
      .user__card--avatar {
        border-radius: 50%;
        &:hover {
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
    .form__group {
      label {
        img {
          position: absolute;
          z-index: 2;
          top: 100px;
          left: calc(50% - 2rem);
          height: 24px;
          width: 24px;
        }
      }
      .edit__banner--cancel {
        position: absolute;
        z-index: 2;
        top: 100px;
        left: calc(50% + 2rem);
        height: 24px;
        width: 24px;
      }
      .avatar__edit {
        top: 185px;
        left: 82px;
      }
    }
    .user__card--form {
      flex: 1;
      padding: 6rem 1rem 2rem;
      position: relative;
      .form__group{
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