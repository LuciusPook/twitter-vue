<template>
  <div class="container">
    <img src="https://i.ibb.co/WD1YSyW/Logo.jpg" alt="Logo" />
    <h2 class="form-title">建立你的帳號</h2>
    <SettingForm
      :Account="account"
      :Name="name"
      :Email="email"
      :Password="password"
      :CheckPassword="checkPassword"
      @afterSubmit="submitRegister"
      @accountMsg="accountMsg"
      @nameMsg="nameMsg"
      :account-error="accountError"
      :name-error="nameError"
      :is-processing="isProcessing"
    />

    <div class="form-link">
      <router-link to="/login">取消</router-link>
    </div>
  </div>
</template>

<script>
import SettingForm from "./../components/SettingForm";
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    SettingForm,
  },
  data() {
    return {
      account: "",
      name: "",
      email: "",
      password: "",
      checkPassword: "",
      accountError: false,
      nameError: false,
      isProcessing: false,
    };
  },
  methods: {
    async submitRegister(data) {
      const { account, name, email, password, checkPassword } = data;

      if (!account || !name || !email || !password || !checkPassword) {
        Toast.fire({
          icon: "warning",
          title: "請確認所有欄位",
        });
        this.isProcessing = false;
        return;
      }

      if (password.length < 8 || password.length > 12) {
        Toast.fire({
          icon: "warning",
          title: "密碼請設定在8-12字數內",
        });

        this.isProcessing = false;
        return;
      }

      if (account.length > 20) {
        Toast.fire({
          icon: "warning",
          title: "帳號限定字數20字數內",
        });
        this.isProcessing = false;
        return;
      }

      if (name.length > 50) {
        Toast.fire({
          icon: "warning",
          title: "名稱限定字數50個字內",
        });
        this.isProcessing = false;
        return;
      }

      if (password !== checkPassword) {
        Toast.fire({
          icon: "warning",
          title: "密碼與確認密碼不符",
        });
        this.isProcessing = false;
        return;
      }

      try {
        this.isProcessing = true;

        const { data } = await authorizationAPI.signUp({
          account,
          name,
          email,
          password,
          checkPassword,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        Toast.fire({
          icon: "success",
          title: "帳號註冊成功",
        });
        this.$router.push("/login");
        this.isProcessing = false;
      } catch (error) {
        console.log(error);
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: `${error.message}`,
        });
      }
    },

    accountMsg(data) {
      const { account } = data;
      if (account.length > 20) {
        this.accountError = true;
      } else if (account.length < 21) {
        this.accountError = false;
      }
      return;
    },

    nameMsg(data) {
      const { name } = data;
      if (name.length > 50) {
        this.nameError = true;
      } else if (name.length < 51) {
        this.nameError = false;
      }
      return;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
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

.form-link {
  margin-top: 20px;
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
</style>