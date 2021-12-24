<template>
  <div class="container">
    <Spinner v-if="isLoading" />
    <div class="account-container">
      <div class="account-setting">
        <div class="account-title">
          <p>帳號設定</p>
        </div>
        <div class="form-part">
          <form
            class="form-login"
            @submit.stop.prevent="handleSubmit(currentUser.id)"
            novalidate
          >
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
                ><span class="text-number">{{ accountRemaining }}/20</span>
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
                <span class="invalid-feedback" v-show="nameError"
                  >字數超出上限！</span
                ><span class="text-number">{{ nameRemaining }}/50</span>
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
              {{ isProcessing ? "儲存中" : "儲存" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import usersAPI from "./../apis/users";
import Spinner from "./../components/Spinner.vue";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  components: {
    Spinner,
  },
  data() {
    return {
      currentPage: "setting",
      id: "",
      account: "",
      name: "",
      email: "",
      password: "",
      checkPassword: "",
      accountError: false,
      nameError: false,
      isProcessing: false,
      isLoading: true,
    };
  },

  computed: {
    ...mapState({
      currentUser: (state) => state.currentUserModule.currentUser,
      // currentUser:"currentUser"
    }),
    accountRemaining() {
      return this.account.length;
    },
    nameRemaining() {
      return this.name.length;
    },
  },
  created() {
    this.$store.commit(
      "statusControlModule/toggleTopUsersDisplayStatus",
      "setting"
    );
    const { id } = this.$route.params;
    this.fetchUserData(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchUserData(id);
    next();
  },

  methods: {
    async fetchUserData(id) {
      this.isLoading = true;
      try {
        const { data } = await usersAPI.getCurrentUser({ id });
        const { account, name, email } = data;
        this.id = id;
        this.account = account;
        this.name = name;
        this.email = email;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
      }
    },
    async handleSubmit(id) {
      this.isProcessing = true;
      try {
        if (
          this.account.trim().length < 1 ||
          this.name.trim().length < 1 ||
          this.account.trim().length < 1 ||
          this.email.trim().length < 1 ||
          this.password.trim().length < 1 ||
          this.checkPassword.trim().length < 1
        ) {
          Toast.fire({
            icon: "warning",
            title: "欄位不可留白",
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
        if (!this.account || !this.name || !this.email) {
          Toast.fire({
            icon: "warning",
            title: "請確認所有欄位",
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
        this.isProcessing = true;
        const formData = {
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          checkPassword: this.checkPassword,
        };
        const response = await usersAPI.updateUserAccont({ formData });
        const data = response.data;
        console.log(response);
        console.log(data);
        if (data.status !== "success") {
          Toast.fire({
            icon: "error",
            title: data.message,
          });
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: "儲存完成",
        });
        this.$router.push({ name: "user", params: { id } });
        this.isProcessing = false;
      } catch (error) {
        console.log("error", error);
        this.isProcessing = false;
      }
    },
    accountErrorMsg() {
      const account = this.account;
      if (account.length > 20) {
        this.accountError = true;
      } else if (account.length < 21) {
        this.accountError = false;
      }
      return;
    },

    nameErrorMsg() {
      const name = this.name;
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
  width: 100%;
  height: 1200px;
  display: flex;
  flex-direction: row;
  flex: 1;
}

.account-container {
  height: 100%;
}

.account-title {
  font-size: 19px;
  font-weight: bold;
  border-bottom: 1px solid #e6ecf0;
}

.account-title p {
  padding: 14px 20px;
}

.account-setting {
  display: flex;
  flex-direction: column;
}

.form-login {
  margin-left: 10px;
}

.form-group {
  width: 642px;
  height: 52px;
  margin: 32px 10px;
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
  width: 122px;
  height: 50px;
  font-size: 18px;
  margin-top: 10px;
  margin-left: 530px;
}
</style>
