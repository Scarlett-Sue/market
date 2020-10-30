<template>
  <div class="cargo-wrapper">
    <div class="middle">
      <!-- <el-button
        type="primary"
        @click="gotoSave"
        icon="el-icon-plus"
        size="small"
        style="margin-right: 15px"
      >添加</el-button> -->
      <div></div>
      <el-input
        placeholder="输入名称进行查询"
        v-model="name"
        style="width: 350px"
        size="small"
        suffix-icon="el-icon-search"
        @input="clickTab(1)"
      ></el-input>
    </div>
    <div class="bottom">
      <div class="content" v-loading="loading">
        <el-table :data="todoData" style="width: 100%">
          <el-table-column prop="supplierName" label="供货商"></el-table-column>
          <el-table-column prop="name" label="商品名称"></el-table-column>
          <el-table-column prop="type" label="类型"></el-table-column>
          <el-table-column prop="brand" label="品牌"></el-table-column>
          <el-table-column prop="model" label="型号"></el-table-column>
          <el-table-column prop="unit" label="计量单位"></el-table-column>
          <el-table-column prop="num" label="数量"></el-table-column>
          <el-table-column prop="price" label="单价(元)"></el-table-column>
          <el-table-column prop="depotId" label="仓库"></el-table-column>
          <el-table-column prop="areaId" label="区域"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              {{ statusList[scope.row.status] }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status === '0'"
                type="text"
                style="font-size: 14px; font-weight: normal"
                @click.native.prevent="gotoSend(scope.row)"
                size="small"
                class="my-button"
                >分配</el-button
              >
              <!-- <el-button
                type="text"
                style="font-size: 14px; font-weight: normal; color: #f56c6c"
                @click.native.prevent="gotoDelete(scope.row)"
                size="small"
                class="my-button"
              >删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <div class="my-page">
          <el-pagination
            background
            :pager-count="5"
            @current-change="clickTab"
            :current-page.sync="pageNo"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="totalCount"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      class="pic-dialog"
      :before-close="reset"
      title="商品分配至仓库"
    >
      <el-form
        ref="baseInfo"
        :model="form"
        label-width="170px"
        :rules="rules"
        :label-position="'top'"
      >
        <el-form-item label="所在仓库" prop="depotId" :rules="rules.need">
          <el-select
            v-model="form.depotId"
            clearable
            placeholder="请选择"
            style="width: 100%"
            filterable
            remote
            @change="getAreas"
            :remote-method="getDepotList"
            :loading="depotLoading"
          >
            <el-option
              v-for="item in depotList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.type
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仓库区域" prop="areaId" :rules="rules.need">
          <el-select
            v-model="form.areaId"
            clearable
            placeholder="请选择"
            style="width: 100%"
            filterable
            remote
            :remote-method="getAreaList"
            :loading="areaLoading"
          >
            <el-option
              v-for="item in areaList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                '余量：' + item.margin + item.unit
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" @click="gotoSaveSend"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import manage from '@/api/manage';
export default {
  components: {},
  props: {},
  data() {
    return {
      name: '',
      pageSize: 10,
      pageNo: 1,
      totalCount: null,
      todoData: [],
      loading: false,
      statusList: {
        1: '已分配',
        0: '未分配',
      },
      dialogVisible: false,
      depotLoading: false,
      areaLoading: false,
      depotList: [],
      areaList: [],
      form: {
        id: '',
        num: '',
        depotId: '',
        areaId: '',
      },
      rules: {
        need: {
          required: true,
          message: '不能为空',
          trigger: 'blur',
        },
      },
    };
  },
  computed: {
    ...mapState('User', {
      userInfo: state => state.userInfo,
    }),
  },
  mounted() {
    this.clickTab();
  },
  methods: {
    async clickTab(pageNo) {
      this.loading = true;
      let param = {
        pageNo: pageNo || this.pageNo,
        pageSize: this.pageSize,
        name: this.name || undefined,
      };
      let res = await manage.cargoList(param);
      this.totalCount = res.total;
      this.todoData = res.list || [];
      this.loading = false;
    },
    gotoSave() {
      this.$router.push({
        name: 'cargoSave',
      });
    },
    gotoSend(item) {
      this.form.id = item.id;
      this.form.num = item.num;
      this.dialogVisible = true;
      this.getDepotList();
    },
    gotoDelete(item) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.deleteSelf(item);
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    async deleteSelf(item) {
      let res = await manage.cargoRemove({ id: item.id });
      if (res.code === '20000' && res.data === 1) {
        this.clickTab();
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
      } else {
        this.$message({
          type: 'error',
          message: '删除失败!',
        });
      }
    },
    reset(done) {
      this.form = {
        id: '',
        num: '',
        depotId: '',
        areaId: '',
      };
      done();
    },
    async getDepotList(query) {
      this.depotLoading = true;
      let param = {
        pageNo: 1,
        pageSize: 20,
        name: query || undefined,
      };
      let res = await manage.depotList(param);
      this.depotList = res.list;
      this.depotLoading = false;
    },
    getAreas() {
      this.getAreaList();
    },
    async getAreaList(query) {
      this.areaLoading = true;
      let param = {
        pageNo: 1,
        pageSize: 20,
        depotId: this.form.depotId,
        name: query || undefined,
      };
      let res = await manage.areaList(param);
      this.areaList = res.list;
      this.areaLoading = false;
    },
    async gotoSaveSend() {
      await this.validateForm('baseInfo');
      let res = await manage.cargoUpdate(this.form);
      if (res.code === '20000' && res.data === 1) {
        this.dialogVisible = false;
        this.clickTab();
        this.$message({
          type: 'success',
          message: '仓库分配成功!',
        });
      } else {
        this.$message({
          type: 'error',
          message: '仓库分配失败!',
        });
      }
    },
    validateForm(form) {
      return new Promise((resolve, reject) => {
        if (this.$refs[form]) {
          this.$refs[form].validate(valid => {
            if (valid) {
              resolve(true);
            } else {
              reject(false);
              this.$message({
                message: '请填写必填字段',
                type: 'warning',
              });
            }
          });
        } else {
          resolve(true);
        }
      });
    },
  },
  filters: {
    formatDate(date) {
      if (!date) {
        return '';
      }
      date = new Date(date);
      const addZero = val => {
        return val >= 10 ? val : `0${val}`;
      };
      const year = date.getFullYear();
      const month = addZero(date.getMonth() + 1);
      const day = addZero(date.getDate());
      // const hour = addZero(date.getHours());
      // const minute = addZero(date.getMinutes());
      // const second = addZero(date.getSeconds());
      return `${year}-${month}-${day}`;
    },
  },
};
</script>
<style lang="scss">
.cargo-wrapper {
  padding: 15px 20px;
  .el-button--mini,
  .el-button--small {
    font-size: 14px;
    font-weight: normal;
  }
  .el-button--primary {
    background-color: #545c64;
    border: none;
  }
  // .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  //   background-color: #545c64;
  //   border-color: #545c64;
  //   color: #fff;
  // }
  // .el-radio-button__inner:hover,
  // .el-button--text {
  //   color: #545c64;
  // }
  .el-radio-button--small .el-radio-button__inner {
    font-size: 14px;
    font-weight: normal;
  }
  .middle {
    margin-top: 15px;
    padding: 15px 25px;
    background-color: #fff;
    border-bottom: 1px #e1ecf5 solid;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .bottom {
    padding: 15px 25px;
    background-color: #fff;
    .el-form-item {
      margin-bottom: 15px;
    }
    .choose {
      margin: 0 0 0 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .content {
      .el-table {
        thead {
          tr,
          th {
            background-color: #f3f6fa;
            color: #000;
            font-weight: normal;
          }
        }
      }
    }
    .my-page {
      display: flex;
      justify-content: flex-end;
      margin: 15px 0 5px 0;
      .el-pagination {
        margin-top: 10px;
        margin-bottom: 0;
        .el-pager li {
          border: 1px #e1e9f4 solid;
          background-color: #fff;
        }
        .el-pager li:visited {
          background: #545c64;
        }
        .el-pager li:hover {
          border: 1px #545c64 solid;
          color: #545c64;
        }
        .btn-next,
        .btn-prev {
          border: 1px #e1e9f4 solid;
          background-color: #fff;
        }
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #545c64;
        border-color: #545c64;
        color: #ffffff;
      }
    }
  }
}
</style>
