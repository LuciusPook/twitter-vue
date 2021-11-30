<template>
  <div class="form" @submit.prevent.stop="handleSubmit">
    <form>
      <img src="https://i.ibb.co/WD1YSyW/Logo.jpg" alt="Logo" />
      <h2>登入 Aplhitter</h2>
      <div class="form-group">
        <input
          id="email"
          type="email"
          class="form-control"
          placeholder="Email"
          autocomplete="username"
          required
          autofocus
        />
      </div>

      <div class="form-group">
        <input
          id="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="current-password"
          required
        />
      </div>
      <button type="submit" :disabled="isProcessing">
        {{ isProcessing ? "處理中..." : "登入" }}
      </button>
      <div class="form-link">
        <router-link to="/register">註冊 Alphitter</router-link>
        <span></span>
        <router-link to="/adminlogin">後台登入</router-link>
      </div>
      <div class="form-link">
        <router-link to="/login" class="d-none">前台登入</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";

export default {
  props: {
    initialAccount: {
      type: Object,
      default: () => ({
        email: "",
        password: "",
      }),
    },
    isProcessing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.email || !this.password) {
          Toast.fire({
            icon: "warning",
            title: "請填入 email 和 password",
          });
          return;
        }

        this.isProcessing = true;

        const response = await authorizationAPI.signIn({
          email: this.email,
          password: this.password,
        });

        const { data } = response;

        if (data.status !== "success") {
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


<style scoped>
div.form {
  padding-top: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

form {
  text-align: center;
}

img {
  width: 40px;
  height: 40px;
  margin: 0 auto;
}

h2 {
  margin: 25px;
}

.form-group {
  width: 540px;
  height: 52px;
  border-bottom: 2px solid #657786;
  margin: 32px auto;
}

input {
  width: 100%;
  height: 100%;
  background: #f5f8fa;
  font-size: 25px;
  border: none;
  border-radius: 0 0 4px 4px;
}

input::placeholder {
  position: absolute;
  font-size: 15px;
}

button {
  width: 540px;
  height: 46px;
  padding: 10px 200px;
  font-size: 18px;
  margin: 10px;
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
  text-align: end;
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