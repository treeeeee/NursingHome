<style>
  .el-pagination {
    float: inherit!important;
    text-align: center;
  }
</style>

<template>
  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="手机号码：">
          <el-input v-model="formInline.phone" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </h3>
    <div slot="body">
      <el-table
        :data="tableData.rows"
        border
        style="width: 100%"
        v-loading="listLoading"
        @selection-change="handleSelectionChange">
        <el-table-column
          prop="id"
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="角色">
        </el-table-column>
        <el-table-column label="操作" width="285">
          <template slot-scope="scope">
            <a @click.prevent="handleEdit(scope.$index, scope.row)">编辑</a>
            <a class="color-primary" @click.prevent="handleDelete(scope.$index, scope.row)">删除</a>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableData.pagination.pageNo"
        :page-sizes="[5, 10, 20]"
        :page-size="tableData.pagination.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="tableData.pagination.total">
      </el-pagination>

      <el-dialog title="配置用户角色" v-model="dialogVisible" size="tiny">
        <div class="select-tree">
          <el-scrollbar
            tag="div"
            class='is-empty'
            wrap-class="el-select-dropdown__wrap"
            view-class="el-select-dropdown__list">
            <el-tree
              ref="roleTree"
              :data="roleTree"
              show-checkbox
              check-strictly
              node-key="id" v-loading="dialogLoading"
              :props="defaultProps">
            </el-tree>
          </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="configUserRoles">确 定</el-button>
          </span>
      </el-dialog>
    </div>


  </imp-panel>
</template>

<script>
  import panel from "../components/panel.vue"
  import * as api from "../api"
  import testData from "../../static/data/data.json"
  import * as sysApi from '../services/sys'

  export default {
    components: {
      'imp-panel': panel
    },
    data(){
      return {
        formInline: {
          phone: ''
        },
        currentRow: {},
        dialogVisible: false,
        dialogLoading: false,
        defaultProps: {
          children: 'children',
          label: 'name',
          id: "id",
        },
        roleTree: [],
        listLoading: false,
        searchKey: '',
        tableData: {
          pagination: {
            total: 0,
            pageNo: 1,
            pageSize: 10,
            parentId: 0
          },
          rows: []
        }
      }
    },
    methods: {
      search(target){
        this.loadData();
      },
      configUserRoles(){
        let checkedKeys = this.$refs.roleTree.getCheckedKeys();
          this.$http.get(api.SYS_SET_USER_ROLE + "?userId=" + this.currentRow.id + "&roleIds="+checkedKeys.join(','))
          .then(res => {
              this.$message('修改成功');
              this.dialogVisible = false;
          })
      },
      handleSizeChange(val) {
        this.tableData.pagination.pageSize = val;
        this.loadData();
      },
      handleCurrentChange(val) {
        this.tableData.pagination.pageNo = val;
        this.loadData();
      },
      handleEdit(index, row){
        this.$router.push({path: 'userAdd', query: {id: row.id}})
      },
      handleDelete(index, row){
        this.$http.get(api.SYS_USER_DELETE + "?userIds=" + row.id).then(res => {
          this.loadData();
        });
      },
      loadData(){
          sysApi.userList({
            key: this.searchKey,
            pageSize: this.tableData.pagination.pageSize,
            pageNo: this.tableData.pagination.pageNo
          })
          .then(res => {
            this.tableData.rows = res.records;
            this.tableData.pagination.total = res.total;
          });
      }
    },
    created(){
      this.loadData();
    }
  }
</script>
<style>
  .el-pagination {
    float: right;
    margin-top: 15px;
  }
</style>
