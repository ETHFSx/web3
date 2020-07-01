<template>
  <div id="user">
    <div class="login-wrap" v-if="loginState === 0">
      <el-form ref="form" :model="form" label-width="110px">
        <el-form-item label="Wallet Address">
          <el-input type="textarea" v-model="form.walletAddr"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">Login</el-button>
        </el-form-item>
      </el-form>
    </div>
    <template v-else-if="loginState === 1">
      <div class="user-info">
        <div class="option-item">
          <span class="option-title">
            Wallet Address:
          </span>
          <div class="option-item-input">
            {{ userInfo && userInfo.Address }}
          </div>
        </div>
        <div class="option-item">
          <span class="option-title">
            Balance:
          </span>
          <div class="option-item-input">
            {{ userInfo && userInfo.Balance }} {{ userInfo && userInfo.Assets }}
          </div>
        </div>
        <el-button type="primary" class="fl" @click="logout">Logout</el-button>
      </div>
    </template>
    <template v-else>
      <p>
        loading...
      </p>
    </template>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      form: {
        walletAddr: "",
        password: "",
      },
    };
  },
  computed: {
    loginState() {
      return this.$store.state.loginState;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    password() {
      return this.$store.state.password;
    },
  },
  watch: {
    loginState(val) {
      if (val === 0) {
        this.form = {
          walletAddr: "",
          password: "",
        };
      }
    },
  },
  methods: {
    login() {
      this.$http.login(this.form.walletAddr, this.form.password).then((res) => {
        if (res.error === 0) {
          this.$store.commit("SET_LOGIN_STATE", 1);
          this.$store.commit("SET_PASSWORD", this.form.password);
          this.$store.dispatch("getUserInfo");
        } else {
          this.$message.error(res.desc);
        }
      });

      // this.$http
      //   .post(this.$api.login, {
      //     Address: this.form.walletAddr,
      //     Password: this.form.password,
      //   })
      //   .then((res) => {
      //     if (res.Error === 0) {
      // this.$store.commit("SET_LOGIN_STATE", 1);
      // this.$store.commit("SET_PASSWORD", this.form.password);
      // this.$store.dispatch("getUserInfo");
      //     }
      //   });
    },
    logout() {
      this.$http.logout(this.password).then((res) => {
        if (res.errror === 0) {
          this.$store.commit("SET_LOGIN_STATE", 0);
        } else {
          this.$message.error(res.desc);
        }
      });

      // this.$http.post(this.$api.logout).then((res) => {
      //   if (res.Error === 0) {
      //     this.$store.commit("SET_LOGIN_STATE", 0);
      //   }
      // });
    },
  },
};
</script>

<style lang="scss">
#user {
  .login-wrap {
    width: 400px;
    margin: 0 auto;
  }
}
</style>
