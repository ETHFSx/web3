<template>
  <div id="miner">
    <el-button
      class="fl"
      type="primary"
      v-if="!userInfo || userInfo.NodeState !== 1"
      @click="openMining"
      >Open Mining</el-button
    >
    <el-button class="fl" type="danger" v-else @click="closeMining"
      >Close Mining</el-button
    >
    <el-table :data="tableData" style="width: 100%" height="100%">
      <el-table-column prop="Name" label="Name" width="180"> </el-table-column>
      <el-table-column prop="Hash" label="Hash" width="180"> </el-table-column>
      <el-table-column prop="Profit" label="Profit"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "miner",
  data() {
    return {
      tableData: [],
    };
  },
  computed: {
    password() {
      return this.$store.state.password || "";
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  methods: {
    getMinerList() {
      this.$http
        .get(this.$api.minerList, {
          Password: this.password,
        })
        .then((res) => {
          if (res.Error === 0) {
            this.tableData = res.Result;
          }
        });
    },
    async openMining() {
      this.$http
        .post(this.$api.nodeStart, {
          Password: this.password,
        })
        .then((res) => {
          if (res.Error === 0) {
            this.$store.dispatch("getUserInfo");
          }
        });
    },
    async closeMining() {
      this.$http
        .post(this.$api.nodeStop, {
          Password: this.password,
        })
        .then((res) => {
          if (res.Error === 0) {
            this.$store.dispatch("getUserInfo");
          }
        });
    },
  },
  created() {
    this.getMinerList();
  },
};
</script>

<style lang="scss">
#miner {
  height: calc(100% - 50px);
}
</style>
