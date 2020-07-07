<template>
  <div id="miner">
    <el-button type="primary" class="fl" @click="openDialog">Pledge</el-button>
    <el-button
      class="fr"
      type="primary"
      v-if="!userInfo || userInfo.NodeState !== 1"
      @click="openMining"
      >Open Mining</el-button
    >
    <el-button class="fr" type="danger" v-else @click="closeMining"
      >Close Mining</el-button
    >
    <el-table :data="tableData" style="width: 100%" height="100%">
      <el-table-column prop="Name" label="Name" width="180"> </el-table-column>
      <el-table-column prop="Hash" label="Hash" width="180"> </el-table-column>
      <el-table-column prop="Profit" label="Profit"> </el-table-column>
    </el-table>

    <el-dialog
      title="Set Pledge"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
    >
      <div class="pledge-wrap">
        <el-form :model="form" label-width="120px">
          <el-form-item label="Pledge Account:">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="Pledge Amount:">
            <el-input-number v-model="form.amount" :min="0"></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="setPledge">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const { ipcRenderer } = window.require("electron");

export default {
  name: "miner",
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      form: {
        amount: 0,
        address: "",
      },
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
    openDialog() {
      this.form.amount =
        (this.$store.state.userInfo && this.$store.state.userInfo.pledge) || 0;
      this.form.address = "";
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    getMinerList() {
      this.$http.minerList().then((res) => {
        if (res.error === 0) {
          this.tableData = res.result;
        } else {
          this.$message.error(res.desc);
        }
      });
    },
    async openMining() {
      let state = ipcRenderer.sendSync("startIpfs", this.password);
      this.$store.dispatch("getUserInfo");
    },
    async closeMining() {
      let state = ipcRenderer.sendSync("stopIpfs", this.password);
      this.$store.dispatch("getUserInfo");
    },
    async setPledge() {
      this.$http
        .pledge(this.form.amount, this.password, this.form.address)
        .then((res) => {
          if (res.error === 0) {
            this.$message.success("set pledge success!!!");
            this.$store.dispatch("getUserInfo");
            this.dialogVisible = false;
          } else {
            this.$message.error(res.desc);
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

  .miner-pledge {
    float: left;
    margin-right: 20px;
  }

  .fr {
    float: right;
  }

  .pledge-btn {
    margin-left: 20px;
  }

  .pledge-wrap {
    width: 360px;
    margin: 0 auto;
    text-align: left;
  }
}
</style>
