<template>
  <div class="form" @submit.prevent.stop="handleSubmit">
    <form>
      <img src="https://i.ibb.co/WD1YSyW/Logo.jpg" alt="Logo" />
      <h2 class="form-title">登入</h2>
      <div class="form-group">
        <input
          id="email"
          type="email"
          v-model="email"
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
          v-model="password"
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
export default {
  props: {
    Account: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    isProcessing: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      account: this.Account,
      password: this.Password,
    };
  },
  methods: {
    handleSubmit() {
      const data = {
        account: this.account,
        password: this.password,
      };
      this.$emit("after-submit", data);
    },
  },
};
</script>


<style lang="scss" scoped>
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