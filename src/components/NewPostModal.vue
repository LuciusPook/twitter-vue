<template>
  <div class="tweet-create-modal">
    <div class="modal-container">
      <div class="modal-box">
        <div class="modal-cancel">
          <img
            src="./../assets/Vector_close-icon.svg"
            class="cancel-icon"
            alt="cancel"
            @click="closeButton"
          />
        </div>
        <div class="tweet-create-container">
          <div class="profile-image">
            <img
              :src="this.currentUserData.avatar | emptyImage"
              class="user-img"
              alt="avatar"
            />
          </div>
          <form class="tweet-input">
            <textarea
              name="input-area"
              class="tweet-input-content scrollbar"
              id=""
              v-model="description"
              cols="30"
              rows="10"
              placeholder="有什麼新鮮事？"
            ></textarea>
            <button
              type="submit"
              class="tweet-create-btn"
              @click.stop.prevent="handleSubmit"
            >
              推文
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { emptyImageFilter } from "./../utils/mixins";
export default {
  mixins: [emptyImageFilter],
  props: {
    newDescription: {
      type: String,
      required: true,
    },
    currentUserData: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  data() {
    return {
      description: this.newDescription,
    };
  },
  methods: {
    closeButton() {
      this.$emit("close-after-create");
    },
    handleSubmit() {
      const newDescription = this.description;
      console.log(newDescription);
      this.$emit("afterSubmit", newDescription);
    },
    finishCreate() {
      this.$emit("close-after-create");
    },
  },
};
</script>

<style lang="scss" scoped>
.tweet-create-modal {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 99;
}

.modal-container {
  margin-top: 54px;
  width: 600px;
  height: 300px;
  background-color: white;
  border-radius: 14px;
}

.modal-cancel {
  border-bottom: 1px solid #e6ecf0;
}

.cancel-icon {
  width: 24px;
  height: 24px;
  display: inline-block;
  margin: 15px;
  cursor: pointer;
}

.tweet-create-container {
  display: flex;
  height: 245px;
  overflow: auto;
}

.profile-image {
  margin: 15px 10px 0 15px;
}

.user-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.tweet-input {
  margin-top: 27px;
  width: 510px;
  height: 150px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.tweet-input-content {
  width: 510px;
  height: 165px;
  resize: none;
  border: none;
  font-size: 18px;
  font-weight: 500;
  color: #9197a3;
}

.tweet-input-content:focus {
  color: black;
}

button {
  width: 66px;
  height: 38px;
  font-size: 18px;
  margin-right: 15px;
  margin-bottom: 15px;
}
</style>