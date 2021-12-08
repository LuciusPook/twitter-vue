<template>
  <div id="twitter">
    <Navbar @showCreateModal="showCreateModal" />

    <router-view />

    <PopularList />

    <NewPostModal
      v-if="createNewModal"
      :currentUserData="currentUserData"
      :newDescription="newDescription"
      :checked="checked"
      @afterSubmit="createNewTweet"
      @close-after-create="closeButton"
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
import usersAPI from "./apis/users.js";
import tweetsAPI from "./apis/tweets.js";

export default {
  components: {
    Navbar,
    PopularList,
    NewPostModal,
  },

  data() {
    return {
      createNewModal: false,
      checked: false,
      newDescription: "",
      currentUserData: {
        id: "",
        name: "",
        account: "",
        avatar: "",
      },
    };
  },

  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },

  created() {
    this.fetchCurrentUserData(this.currentUser.id);
  },

  methods: {
    showCreateModal() {
      this.createNewModal = true;
    },

    closeButton() {
      this.createNewModal = false;
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

    async fetchCurrentUserData(id) {
      const { data } = await usersAPI.getUsers({ userId: id });
      const { account, name, avatar } = data;
      this.currentUserData.account = account;
      this.currentUserData.name = name;
      this.currentUserData.avatar = avatar;
    },

    async createNewTweet(newDescription) {
      try {
        if (newDescription.length === 0) {
          Toast.fire({
            icon: "warning",
            title: "內文不能留白！",
          });
          return;
        }
        if (newDescription.length > 140) {
          Toast.fire({
            icon: "warning",
            title: "推文只限140個字數內！",
          });
          return;
        }

        const { data } = await tweetsAPI.postTweet({
          description: this.newDescription,
        });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.tweets.splice(0, 0, {
          id: data.id,
          createdAt: new Date(),
          description: newDescription,
          User: {
            id: data.UserId,
            name: this.currentUser.name,
            account: this.currentUser.account,
            avatar: this.currentUser.avatar,
          },
          Likes: [],
        });

        Toast.fire({
          icon: "success",
          title: "推文發送成功！",
        });

        this.closeButton();
        this.description = "";
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法新增推文，請稍後再試看",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#twitter {
  height: 100%;
  display: flex;
}
</style>
