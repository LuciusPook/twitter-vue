<template>
  <AccountForm
    :Account="account"
    :Password="password"
    @after-submit="handleAfterSubmit"
    :is-processing="isProcessing"
  />
</template>

<script>
import AccountForm from "./../components/AccountForm";
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
// import Spinner from "./../components/Spinner";

export default {
  components: {
    AccountForm,
  },
  data() {
    return {
      account: "",
      password: "",
      isProcessing: false,
    };
  },
  methods: {
    async handleAfterSubmit() {
      try {
        if (!this.account || !this.password) {
          Toast.fire({
            icon: "warning",
            title: "請填入帳號和密碼",
          });
          return;
        }

        this.isProcessing = true;

        const { data } = await authorizationAPI.signIn({
          account: this.account,
          password: this.password,
         
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        if (data.user.role === "admin") {
          throw new Error(data.message);
        }

        localStorage.setItem("token", data.token);

        this.$store.commit("setCurrentUser, data.user");

        this.$router.push("/main");
      } catch (error) {
        this.password = "";
        this.isProcessing = false;

        Toast.fire({
          icon: "warning",
          title: "請確認您輸入正確的賬號密碼",
        });
      }
    },
  },
};
</script>
