<template>
  <div id="upload">
    <el-button type="primary" class="fl" @click="openDialog">Upload</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="time" label="Time" width="110"> </el-table-column>
      <el-table-column prop="name" label="Name"> </el-table-column>
      <el-table-column prop="hash" label="Hash"> </el-table-column>
      <el-table-column label="status">
        <template v-slot="scope">
          <span>
            {{
              scope.row.status === 0
                ? "uploading"
                : scope.row.status === 1
                ? "upload done"
                : scope.row.status === 2
                ? "upload failed!!"
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
      title="Upload"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
    >
      <div>
        <div class="copy-number">
          Copy Number:
          <el-input-number v-model="form.CopyNumber" :min="0"></el-input-number>
        </div>
        <el-upload
          class="upload-demo"
          drag
          action=""
          :on-change="handleChange"
          :auto-upload="false"
          :show-file-list="false"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            <span v-if="!fileInfo">
              Drag the file here, or <em>click Upload</em>
            </span>
            <span v-if="fileInfo">{{ fileInfo.name }}</span>
          </div>
          <div class="el-upload__tip" slot="tip">
            <span v-if="!fileInfo">
              Please select the file to upload
            </span>
          </div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleUpload">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const { remote } = window.require("electron");

export default {
  name: "upload",
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      fileInfo: null,
      form: {
        CopyNumber: 0,
      },
    };
  },
  computed: {
    password() {
      return this.$store.state.password;
    },
  },
  methods: {
    openDialog() {
      this.fileInfo = null;
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleChange(fileInfo) {
      console.log(fileInfo);
      this.fileInfo = fileInfo;
    },

    async delFile(file) {
      await this.uploadFiles.delUploadFileById(file.id);
      this.$message.success("delete file success!!!");
      await this.getUploadList();
    },

    async getUploadList() {
      this.tableData = await this.uploadFiles.getUploadList();
    },

    async handleUpload() {
      if (!this.fileInfo) {
        this.$message.error("please select upload file!!!");
        return;
      }

      let info = await this.uploadFiles.addUploadFile({
        name: this.fileInfo.name,
      });

      // success
      this.$message.success("start upload file!!!");
      this.dialogVisible = false;
      this.getUploadList();
      console.log(this);

      this.$http
        .upload(this.fileInfo.raw.path, this.form.CopyNumber, 1, this.password)
        .then(async (res) => {
          if (res.error === 0) {
            info.hash = res.Result.Hash;
            info.status = 1;
            await this.uploadFiles.updateUploadFile(info.id, info);
            this.getUploadList();
          } else {
            this.$message.error(res.desc);
            info.status = 2;
            await this.uploadFiles.updateUploadFile(info.id, info);
            this.getUploadList();
          }
        });

      // this.$http
      //   .post(this.$api.upload, {
      //     Path: this.fileInfo.raw.path,
      //     Password: this.password,
      //   })
      //   .then(async (res) => {
      //     if (res.Error === 0) {
      //       info.hash = res.Result.Hash;
      //       info.status = 1;
      //       await this.uploadFiles.updateUploadFile(info.id, info);
      //       this.getUploadList();
      //     }
      //   });
    },
  },
  created() {
    this.getUploadList();
  },
};
</script>

<style lang="scss">
#upload {
  .profit-pagination {
    margin-top: 20px;
  }

  .copy-number {
    text-align: left;
    width: 360px;
    margin: 0 auto 10px;
  }
}
</style>
