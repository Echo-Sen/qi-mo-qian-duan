<template>
  <div class="scoreManage">
    <h1>学生成绩管理</h1>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="no" label="学号" width="180">
      </el-table-column>
      <el-table-column prop="studentName" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="courseName" label="学科">
      </el-table-column>
      <el-table-column prop="grade" label="成绩"></el-table-column>
    </el-table>
  </div>
</template>


<script>
import { getAllGrades } from '@/api/student'
export default {
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    async getData() {
      let result = await getAllGrades()
      if (result.data.code !== 1) {
        this.$message({
          message: '获取学生成绩信息失败',
          type: 'error',
        })
      }
      this.tableData = result.data.data
    }
    // 合并学号相同的对象
  },
  mounted() {
    this.getData()
  }
}
</script>

<style scoped lang="scss">
.scoreManage {
  padding: 20px;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
