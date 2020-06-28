<template>
  <div id="profit">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="time" label="Time" width="180"> </el-table-column>
      <el-table-column prop="amount" label="Amount" width="180">
      </el-table-column>
      <el-table-column prop="address" label="Address"> </el-table-column>
    </el-table>

    <el-pagination
      background
      class="profit-pagination"
      layout="prev, pager, next"
      :total="total"
      :page-size="10"
      :hide-on-single-page="true"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "profit",
  data() {
    return {
      tableData: [
        {
          time: "2014-12-1",
          amount: 123,
          address: "Afjksadfasfdasdf",
        },
        {
          time: "2014-10-1",
          amount: 12,
          address: "Ajk24bhsb23467fsd",
        },
      ],
      total: 11,
    };
  },
};
</script>

<style lang="scss">
#profit {
  .profit-pagination {
    margin-top: 20px;
  }
}
</style>
