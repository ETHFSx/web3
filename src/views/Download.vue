<template>
  <div id="download">
    <el-button type="primary" class="fl" @click="openDialog"
      >Download</el-button
    >
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="time" label="Time" width="110"> </el-table-column>
      <el-table-column prop="name" label="Name"> </el-table-column>
      <el-table-column prop="hash" label="Hash"> </el-table-column>
      <el-table-column label="status">
        <template v-slot="scope">
          <span>
            {{
              scope.row.status === 0
                ? "downloading"
                : scope.row.status === 1
                ? "download done"
                : scope.row.status === 2
                ? "download failed!!"
                : ""
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <span>
            <i class="iconfont el-icon-delete" @click="delFile(scope.row)"></i>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="Download"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
    >
      <div>
        <el-form :model="form" label-width="80px">
          <el-form-item label="Hash">
            <el-input v-model="form.hash"></el-input>
          </el-form-item>
          {{ this.form.name }}
          <!-- <el-form-item label="name">asda </el-form-item> -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleDownload">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "download",
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      form: {
        hash: "",
        name: "",
      },
    };
  },
  watch: {
    "form.hash"(val) {
      this.setTimeObj = setTimeout(() => {
        this.getDonwloadFile();
      }, 100);
    },
  },
  methods: {
    openDialog() {
      this.form.hash = "";
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    async getDownloadList() {
      this.tableData = await this.downloadFiles.getDownloadList();
    },

    async handleDownload() {
      if (!this.form.hash || !this.form.name) {
        this.$message.error("please fill valid hash!!!");
        return;
      }

      await this.downloadFiles.addDownloadFile(this.form);

      this.$message.success("start download file!!!");
      this.dialogVisible = false;
      this.getDownloadList();
    },

    async getDonwloadFile() {
      if (!this.form.hash) {
        this.form.name = "";
        return;
      }
      this.$http
        .get(this.$api.getDownloadInfo, {
          hash: this.hash,
        })
        .then((data) => {
          this.form.name = data.name;
        });
    },

    async delFile(file) {
      await this.downloadFiles.delDownloadFileById(file.id);
      this.$message.success("delete file success!!!");
      this.getDownloadList();
    },
  },
  created() {
    this.getDownloadList();
  },
};
</script>

<style lang="scss">
#download {
  .profit-pagination {
    margin-top: 20px;
  }
}
</style>
