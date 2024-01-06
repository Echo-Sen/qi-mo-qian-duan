<template>
  <div class="app-container">
    <el-row>
      <el-button
        style="float: right"
        type="primary"
        @click="
          dialogFormVisible = true
          currentRow = {}
        "
        >+ 新增学生</el-button
      >
    </el-row>
    <br />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="no" label="学号" width="180"> </el-table-column>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>学号: {{ scope.row.no }}</p>

            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="180"></el-table-column>
      <el-table-column prop="age" label="年龄" width="180"></el-table-column>
      <el-table-column prop="phone" label="电话" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="180"
      ></el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="保存部门" :visible.sync="dialogFormVisible">
      <el-form :model="currentRow">
        <el-form-item label="部门名称" :label-width="'120px'">
          <el-input
            v-model="currentRow.no"
            placeholder="请输入学生学号"
            autocomplete="off"
          ></el-input>
          <el-input
            v-model="currentRow.name"
            placeholder="请输入学生姓名"
            autocomplete="off"
          ></el-input>
          <el-input
            v-model="currentRow.sex"
            placeholder="请输入学生性别"
            autocomplete="off"
          ></el-input>
          <el-input
            v-model="currentRow.age"
            placeholder="请输入学生年龄"
            autocomplete="off"
          ></el-input>
          <el-input
            v-model="currentRow.address"
            placeholder="请输入学生地址"
            autocomplete="off"
          ></el-input>

          <el-input
            v-model="currentRow.phone"
            placeholder="请输入学生电话"
            autocomplete="off"
          ></el-input>
          <el-input
            v-model="currentRow.email"
            placeholder="请输入学生邮箱"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import {
  getStudents,
  deleteStudentById,
  getStudentById,
  addStudent,
} from '@/api/student'
export default {
  name: 'Student',
  data() {
    return {
      token: { token: getToken() },
      tableData: [],
      dialogFormVisible: false, //控制对话框是否可见
      currentRow: {},
    }
  },
  methods: {
    async handleDelete(a, b) {
      let id = b.id
      let result = await deleteStudentById(id)
      if (result.data.code !== 1) {
        this.$message({
          message: '删除学生信息失败',
          type: 'error',
        })
      }
      this.$message({
        message: '删除学生信息成功',
        type: 'success',
      })
      // 删除选中的行
      this.tableData.splice(a, 1)
    },
    async handleEdit(a, b) {
      this.dialogFormVisible = true
      // 回显数据
      let no = b.no
      let result = await getStudentById(no)
      if (result.data.code !== 1) {
        this.$message({
          message: '获取学生信息失败',
          type: 'error',
        })
      }
      this.currentRow = result.data.data
    },
    getStudentData() {
      getStudents().then((res) => {
        if (res.data.code !== 1) {
          this.$message({
            message: '获取学生信息失败',
            type: 'error',
          })
        }
        this.$message({
          message: '获取学生信息成功',
          type: 'success',
        })
        // 将sex字段的0和1转换为男和女
        let result = res.data.data
        result.forEach((item) => {
          item.sex == '1' ? (item.sex = '男') : (item.sex = '女')
        })
        this.tableData = res.data.data
      })
    },
    add() {
      if (this.currentRow.id) {
        //存在id就是更新
        console.log('更新')
        return
      } else {
        addStudent(this.currentRow).then((res) => {
          if (res.data.code !== 0) {
            this.$message({
              message: '保存学生信息失败',
              type: 'error',
            })
          }
          this.$message({
            message: '保存学生信息成功',
            type: 'success',
          })
        })
      }
      // 新增
      this.dialogFormVisible = false
      this.getStudentData()
    },
  },
  mounted() {
    this.getStudentData()
  },
}
</script>

<style scoped>
.app-container {
  margin-top: 20px;
  margin: 50px;
  margin-right: 100px;
}
</style>
