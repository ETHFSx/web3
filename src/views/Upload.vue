<template>
  <div id="upload">
    <el-button type="primary" class="fl" @click="dialogVisible = true"
      >Upload</el-button
    >
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="time" label="Time" width="180"> </el-table-column>
      <el-table-column prop="address" label="Hash"> </el-table-column>
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
        <i class="iconfont el-icon-delete"></i>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      background
      class="profit-pagination"
      layout="prev, pager, next"
      :total="total"
      :page-size="10"
      :hide-on-single-page="true"
    >
    </el-pagination> -->
    <el-dialog
      title="Upload"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
    >
      <div>
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
            Drag the file here, or <em>click Upload</em>
          </div>
          <div class="el-upload__tip" slot="tip">
            Please select the file to upload
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
      tableData: [
        {
          time: "2014-12-1",
          amount: 123,
          status: 1,
          address: "Afjksadfasfdasdf",
        },
        {
          time: "2014-10-1",
          amount: 12,
          status: 0,
          address: "Ajk24bhsb23467fsd",
        },
      ],
      total: 11,
      fileInfo: null,
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    handleChange(fileInfo) {
      console.log(fileInfo);
      this.fileInfo = fileInfo;
    },
    handleUpload() {
      if (!this.fileInfo) {
        this.$message.error("please select upload file");
        return;
      }
    },
  },
  mounted() {
    const test = remote.getGlobal("FileDB");
    console.log(test);
  },
};
</script>

<style lang="scss">
#upload {
  .profit-pagination {
    margin-top: 20px;
  }
}
</style>
