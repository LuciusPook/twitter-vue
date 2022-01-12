<template>
  <div class="home">
    <Navbar @show-create-modal="toggleCreateTweetModal" />
    <router-view />
    <NewPostModal
      v-if="isEditingCreateModal"
      :checked="checked"
      :is-processing="isProcessing"
      @afterSubmit="createNewTweet"
      @close-btn-clicked="toggleCreateTweetModal"
      @checkedMsg="checkedMsg"
    />
  </div>
</template>

<script>
import Navbar from "./../components/Navbar.vue";
import NewPostModal from "./../components/NewPostModal.vue";
import { Toast } from "./../utils/helpers";
import tweetsAPI from "./../apis/tweets";

export default {
  name: "Main",
  components: {
    Navbar,
    NewPostModal,
  },

  data() {
    return {
      isEditingCreateModal: false,
      checked: false,
      isProcessing: false,
    };
  },

  methods: {
    toggleCreateTweetModal() {
      this.isEditingCreateModal = !this.isEditingCreateModal;
    },
    async createNewTweet(payload) {
      try {
        this.isProcessing = true;
        if (payload.length === 0) {
          Toast.fire({
            icon: "warning",
            title: "內文不能留白！",
          });
          return;
        }
        if (payload.length > 140) {
          Toast.fire({
            icon: "warning",
            title: "推文只限140個字數內！",
          });
          return;
        }
        const response = await tweetsAPI.postTweet({ description: payload });
        this.$router.push({ name: "main" });
        if (response.status !== 200) throw new Error(response.statusText);
        Toast.fire({
          icon: "success",
          title: "成功新增推文",
        });
        this.toggleCreateTweetModal();
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法新增推文，請稍後再試",
        });
      }
    },
    checkedMsg(data) {
      const { description } = data;
      if (description.length > 140) {
        this.checked = true;
      } else if (description.length < 141) {
        this.checked = false;
      }
      return;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  display: flex;
  flex-direction: row;
}
</style>