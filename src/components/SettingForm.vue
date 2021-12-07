<template>
  <form class="login-form" @submit.prevent.stop="handleSubmit" novalidate>
    <div class="form-group">
      <input
        type="text"
        class="form-input"
        v-model="account"
        :class="{ 'is-valid': accountError }"
        @keyup="accountErrorMsg"
        placeholder="帳號"
        autocomplete="account"
        autofocus
      />
      <div class="warning-group">
        <span class="invalid-feedback" v-show="accountError"
          >字數超出上限！</span
        >
        <span class="text-number">{{ accountRemaining }}/20</span>
      </div>
    </div>

    <div class="form-group">
      <input
        type="text"
        class="form-input"
        v-model="name"
        :class="{ 'is-valid': nameError }"
        @keyup="nameErrorMsg"
        placeholder="名稱"
        autocomplete="username"
      />
      <div class="warning-group">
        <span class="invalid-feedback" v-show="nameError">字數超出上限！</span>
        <span class="text-number">{{ nameRemaining }}/50</span>
      </div>
    </div>

    <div class="form-group">
      <input
        type="email"
        class="form-input"
        v-model="email"
        placeholder="Email"
        autocomplete="email"
      />
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-input"
        v-model="password"
        placeholder="密碼"
        autocomplete="password"
      />
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-input"
        v-model="checkPassword"
        placeholder="密碼確認"
        autocomplete="password"
      />
    </div>
    <button type="submit" :disabled="isProcessing">
      {{ isProcessing ? "處理中..." : "註冊" }}
    </button>
  </form>
</template>

<script>
export default {
  props: {
    Account: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    CheckPassword: {
      type: String,
      required: true,
    },
    accountError: {
      type: Boolean,
      require: true,
    },
    nameError: {
      type: Boolean,
      require: true,
    },
    isProcessing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      account: this.Account,
      name: this.Name,
      email: this.Email,
      password: this.Password,
      checkPassword: this.CheckPassword,
    };
  },
  methods: {
    handleSubmit() {
      const data = {
        account: this.account,
        name: this.name,
        email: this.email,
        password: this.password,
        checkPassword: this.checkPassword,
      };
      this.$emit("afterSubmit", data);
    },

    accountErrorMsg() {
      const data = {
        account: this.account,
      };
      this.$emit("accountMsg", data);
    },

    nameErrorMsg() {
      const data = {
        name: this.name,
      };
      this.$emit("nameMsg", data);
    },
  },
  computed: {
    accountRemaining() {
      return this.account.length;
    },
    nameRemaining() {
      return this.name.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-group {
  width: 540px;
  height: 52px;
  margin: 32px auto;
  border-radius: 4px 4px 0px 0px;
}

.form-input {
  width: 100%;
  height: 100%;
  padding-left: 10px;
  border: none;
  background-color: #f5f8fa;
  font-size: 19px;
  border-bottom: 2px solid #657786;
}

input:focus {
  border-bottom: 2px solid #50b5ff;
}

input::placeholder {
  position: absolute;
  padding: 5px 0;
  font-size: 15px;
}

.warning-group {
  display: flex;
  justify-content: space-between;
}

.text-number {
  margin-left: auto;
  font-size: 15px;
  color: #657786;
}

.invalid-feedback {
  font-size: 15px;
  color: #fc5a5a;
}

.is-valid {
  border-bottom-color: #fc5a5a;
}

button {
  width: 540px;
  height: 46px;
  font-size: 18px;
  margin-top: 10px;
}
</style>