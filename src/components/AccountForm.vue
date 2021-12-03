<template>
  <form @submit.prevent.stop="handleSubmit">
    <div class="form-group">
      <input
        id="email"
        type="email"
        v-model="email"
        placeholder="Email"
        autocomplete="email"
        required
        autofocus
      />
    </div>

    <div class="form-group">
      <input
        id="password"
        type="password"
        v-model="password"
        placeholder="Password"
        autocomplete="current-password"
        required
      />
    </div>
    <button type="submit" :disabled="isProcessing">
      {{ isProcessing ? "處理中..." : "登入" }}
    </button>
  </form>
</template>

<script>
export default {
  props: {
    Email: {
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
      email: this.Email,
      password: this.Password,
    };
  },
  methods: {
    handleSubmit() {
      const data = {
        email: this.email,
        password: this.password,
      };
      this.$emit("after-submit", data);
    },
  },
};
</script>


<style lang="scss" scoped>
.form-group {
  width: 540px;
  height: 52px;
  border-bottom: 2px solid #657786;
  margin: 32px auto;
}

input {
  width: 100%;
  height: 100%;
  padding-left: 10px;
  background: #f5f8fa;
  font-size: 19px;
  border: none;
  border-radius: 0 0 4px 4px;
}

input::placeholder {
  position: absolute;
  padding: 5px 0;
  font-size: 15px;
}

button {
  width: 540px;
  height: 46px;
  padding: 10px 200px;
  font-size: 18px;
  margin: 10px 0 20px;
}
</style>