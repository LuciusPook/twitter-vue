<template>
  <div class="container">
    <img src="https://i.ibb.co/WD1YSyW/Logo.jpg" alt="Logo" />
    <h2 class="form-title">登入 Alphitter</h2>
    <AccountForm
      :Account="account"
      :Password="password"
      @after-submit="handleAfterSubmit"
      :is-processing="isProcessing"
      :Checked="checked"
    />
    <div class="form-link">
      <router-link to="/register">註冊 Alphitter</router-link>
      <span></span>
      <router-link to="/admin/login">後台登入</router-link>
    </div>
  </div>
</template>

<script>
import AccountForm from "./../components/AccountForm";
import authorizationAPI from "./../apis/authorization";
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
    };
  },

  methods: {
    async handleAfterSubmit(data) {
      const { account, password } = data;

      if (!account || !password) {
        Toast.fire({
          icon: "warning",
          title: "請填入帳號和密碼",
        });
        this.checked = true;
        this.password = "";
        return;
      }

      try {
        this.isProcessing = true;

        const { data } = await authorizationAPI.signIn({
          account,
          password,
        });

        if (data.status === "error" || data.user.role === "Admin") {
          throw new Error(data.message);
        }

        localStorage.setItem("token", data.token);

        this.$store.commit("setCurrentUser", data.user);

        Toast.fire({
          icon: "success",
          title: `${data.user.name}, 歡迎回來`,
        });
        this.$router.push("/main");
      } catch (error) {
        this.checked = true;
        this.isProcessing = false;
        this.password = "";

        Toast.fire({
          icon: "warning",
          title: "請確認您輸入正確的賬號密碼",
        });
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
}

img {
  width: 40px;
  height: 40px;
  margin: 0 auto;
}

h2 {
  margin: 25px 0 8px;
}

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

.form-link {
  margin-left: 21rem;
}

span {
  display: inline-block;
  width: 4px;
  height: 4px;
  margin-bottom: 2px;
  background: #0099ff;
  border-radius: 50%;
}
</style>
