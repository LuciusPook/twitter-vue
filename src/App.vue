<template>
  <div id="twitter">
    <Navbar
      v-if="isAuthenticated"
      @show-create-modal="toggleCreateTweetModal"
    />

    <router-view />

    <PopularList v-if="isAuthenticated && currentUser.role !== 'admin'" />

    <NewPostModal
      v-if="isEditingCreateModal"
      :checked="checked"
      @afterSubmit="createNewTweet"
      @close-btn-clicked="toggleCreateTweetModal"
      @checkedMsg="checkedMsg"
    />
  </div>
</template>


<script >
import Navbar from "./components/Navbar.vue";
import PopularList from "./components/PopularList.vue";
import { mapState } from "vuex";
import NewPostModal from "./components/NewPostModal.vue";
import { Toast } from "./utils/helpers";
import tweetsAPI from "./apis/tweets.js";

export default {
  components: {
    Navbar,
    PopularList,
    NewPostModal,
  },

  data() {
    return {
      isEditingCreateModal: false,
      checked: false,
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  methods: {
    toggleCreateTweetModal() {
      this.isEditingCreateModal = !this.isEditingCreateModal;
    },
    async createNewTweet(payload) {
      console.log(payload);
      try {
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
        if (response.status !== 200) throw new Error(response.statusText);
        Toast.fire({
          icon: "success",
          title: "成功新增推文",
        });
        this.toggleCreateTweetModal();
      } catch (error) {
        console.log("error", error);
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
#twitter {
  max-height: 1200px;
  display: flex;
  position: relative;
}
</style>
