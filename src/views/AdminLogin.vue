<template>
  <div class="container">
    <img src="https://i.ibb.co/WD1YSyW/Logo.jpg" alt="Logo" />
    <h2 class="form-title">後台登入</h2>
    <AccountForm
      :Account="account"
      :Password="password"
      @after-submit="handleAfterSubmit"
      :is-processing="isProcessing"
      :checked="checked"
      :warningMessage="warningMessage"
    />
    <div class="form-link">
      <router-link to="/login">前台登入</router-link>
    </div>
  </div>
</template>

<script>
import AccountForm from "./../components/AccountForm.vue";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    AccountForm,
  },
  data() {
    return {
      account: "",
      password: "",
      isProcessing: false,
      checked: false,
      warningMessage:''
    };
  },
  methods: {
    async handleAfterSubmit(data) {
      const { account, password } = data;
      // if (!account || !password) {
      //   Toast.fire({
      //     icon: "warning",
      //     title: "請填入帳號和密碼",
      //   });
      //   this.checked = true;
      //   this.password = "";
      //   return;
      // }
      try {
        this.isProcessing = true;
        const { data } = await adminAPI.signIn({
          account,
          password,
        });
        if (data.status !== 200) {
          this.warningMessage = data.message
          Toast.fire({
            icon: "error",
            title: data.message
          });
          throw new Error(data.message);
        }
        localStorage.setItem("token", data.token);
        this.$store.commit("setCurrentUser", data.user);

        Toast.fire({
          icon: "success",
          title: `${data.user.name}, 歡迎回來`,
        });

        this.$router.push("/admin/tweets");
      } catch (error) {
        this.password = "";
        this.checked = true;
        this.isProcessing = false;
        console.log('error' , error)
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.container {
  text-align: center;
  padding-top: 4rem;
  flex: 1;
  img {
    width: 40px;
    height: 40px;
    margin: 0 auto;
  }
  h2 {
    margin: 25px 0 8px;
  }
  .form-link {
    margin-left: 29rem;
    a {
      font-weight: bold;
      font-size: 18px;
      margin: 5px;
      color: #0099ff;
      text-decoration: underline;
      transition: all 0.3s ease-in-out;
    }

    a:hover {
      color: #0051ff;
    }
  }
}
</style>