<template>
  <div id="user">
    <template v-if="state === 1">
      <el-form ref="form" :model="form" label-width="110px">
        <el-form-item label="Wallet Address">
          <el-input type="textarea" v-model="form.walletAddr"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">Login</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template v-else-if="state === 2">
      <div class="user-info">
        <div class="option-item">
          <span class="option-title">
            Wallet Address:
          </span>
          <div class="option-item-input">
            Ahdknkjsndkjfnaksjdfnksndkfiiwer4123438t
          </div>
        </div>
        <div class="option-item">
          <span class="option-title">
            Balance:
          </span>
          <div class="option-item-input">
            123 ETH
          </div>
        </div>
        <el-button type="primary" class="fl">Logout</el-button>
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
      state: 2,
    };
  },
};
</script>

<style lang="scss">
#user {
  .user-info {
  }
}
</style>
