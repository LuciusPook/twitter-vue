<template>
  <div class="container">
    <img src="https://i.ibb.co/WD1YSyW/Logo.jpg" alt="Logo" />
    <h2 class="form-title">登入 Alphitter</h2>
    <AccountForm
      :Email="email"
      :Password="password"
      @after-submit="handleAfterSubmit"
      :is-processing="isProcessing"
    />
    <div class="form-link">
      <router-link to="/register">註冊 Alphitter</router-link>
      <span></span>
      <router-link to="/adminlogin">後台登入</router-link>
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
      email: "",
      password: "",
      isProcessing: false,
    };
  },
  methods: {
    async handleAfterSubmit(data) {
      const { email, password } = data;

      try {
        if (!email || !password) {
          Toast.fire({
            icon: "warning",
            title: "請填入帳號和密碼",
          });
          return;
        }

        this.isProcessing = true;

        const { data } = await authorizationAPI.signIn({
          email,
          password,
        });
        console.log(data)
        if (data.status !== 200) {
          throw new Error(data.message);
        }

        // if (data.user.role === "admin") {
        //   throw new Error(data.message);
        // }

        localStorage.setItem("token", data.token);

        this.$store.commit("setCurrentUser", data.user);

        this.$router.push("/main");
      } catch (error) {
        this.password = "";
        this.isProcessing = false;
        console.log('errorrr' , error)
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
div.container {
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
