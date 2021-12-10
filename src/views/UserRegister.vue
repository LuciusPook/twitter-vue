<template>
  <div class="container">
    <img src="https://i.ibb.co/WD1YSyW/Logo.jpg" alt="Logo" />
    <h2 class="form-title">建立你的帳號</h2>
    <form class="login-form" @submit.prevent.stop="handleSubmit" novalidate>
      <div class="form-group">
        <input
          v-model="account"
          :class="{ isValid: accountError }"
          type="text"
          class="form-input"
          placeholder="帳號"
          autocomplete="account"
          autofocus
          @keydown="accountMsg"
        />
        <div class="warning-group">
          <span 
            v-show="accountError" 
            class="invalid-feedback"
          >字數超出上限！
          </span>
          <span 
            :class="['text-number' , { isValid: accountError }]"
          >{{ account.length }}/20</span>
        </div>
      </div>

      <div class="form-group">
        <input
          v-model="name"
          :class="{ isValid: nameError }"
          type="text"
          class="form-input"
          placeholder="名稱"
          autocomplete="username"
          @keydown="nameMsg"
        />
        <div class="warning-group">
          <span 
            v-show="nameError"
            class="invalid-feedback" 
          >字數超出上限！</span
          >
          <span 
            :class="['text-number' , { isValid: nameError }]"
          >{{ name.length }}/50</span>
        </div>
      </div>

      <div class="form-group">
        <input
          v-model="email"
          type="email"
          class="form-input"
          placeholder="Email"
          autocomplete="email"
        />
      </div>
      <div class="form-group">
        <input
          v-model="password"
          type="password"
          class="form-input"
          placeholder="密碼"
          autocomplete="password"
        />
      </div>
      <div class="form-group">
        <input
          v-model="checkPassword"
          type="password"
          class="form-input"
          placeholder="密碼確認"
          autocomplete="password"
        />
      </div>
      <button 
        type="submit" 
        :disabled="isProcessing"
      >
        {{ isProcessing ? "處理中..." : "註冊" }}
      </button>
    </form>
    <div class="form-link">
      <router-link to="/login">取消</router-link>
    </div>
  </div>
</template>

<script>
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";

export default {
  name: "",
  data() {
    return {
      account: "",
      name: "",
      email: "",
      password: "",
      checkPassword: "",
      accountError:false,
      nameError:false,
      isProcessing:false
    };
  },
  methods: {
    async handleSubmit() {
      this.isProcessing = true
      if (!this.account || !this.name || !this.email || !this.password || !this.checkPassword) {
        Toast.fire({
          icon: "warning",
          title: "請確認所有欄位",
        });
        this.isProcessing = false;
        return;
      }

      if (this.password.length < 8 || this.password.length > 12) {
        Toast.fire({
          icon: "warning",
          title: "密碼請設定在8-12字數內",
        });

        this.isProcessing = false;
        return;
      }

      if (this.account.length > 20) {
        Toast.fire({
          icon: "warning",
          title: "帳號限定字數20字數內",
        });
        this.isProcessing = false;
        return;
      }

      if (this.name.length > 50) {
        Toast.fire({
          icon: "warning",
          title: "名稱限定字數50個字內",
        });
        this.isProcessing = false;
        return;
      }

      if (this.password !== this.checkPassword) {
        Toast.fire({
          icon: "warning",
          title: "密碼與確認密碼不符",
        });
        this.isProcessing = false;
        return;
      }

      try {
        const response = await authorizationAPI.signUp({
          account:this.account,
          name:this.name,
          email:this.email,
          password:this.password,
          checkPassword:this.checkPassword,
        });
        console.log('response', response)
        const data  = response.data
        if(data.status !== 200){
          Toast.fire({
            icon: "error",
            title: data.message,
          });
          throw new Error(data.message)
        } 
        this.$router.push("/login");
        Toast.fire({
          icon: "success",
          title: "帳號註冊成功",
        });
        this.isProcessing = false;  
      }catch (error) {
        this.isProcessing = false;
        console.log('Error' , error);
      }
    },
    accountMsg(e) {
      if (this.account.length >= 20 && e.keyCode !== 8) {
        this.accountError = true;
        e.returnValue = false
        Toast.fire({
          icon:'warning',
          title:'帳號字數超過20上限'
        })
      }else{
        this.accountError = false;
      }
      return;
    },
    nameMsg(e) {
      if (this.name.length >= 50 &&  e.keyCode !== 8) {
        this.nameError = true
        e.returnValue = false
        Toast.fire({
          icon:'warning',
          title:'名字字數超過50上限'
        })
      }else{
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
  &.isValid{
    color:red
  }
}

.invalid-feedback {
  font-size: 15px;
  color: #fc5a5a;
}

.isValid {
  border-bottom-color: #fc5a5a;
}

button {
  width: 540px;
  height: 46px;
  font-size: 18px;
  margin-top: 10px;
}
</style>