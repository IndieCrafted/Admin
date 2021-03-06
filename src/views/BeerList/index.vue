<template>
  <div class="beer-list">
    <el-row type="flex" justify="space-between" style="margin-bottom: 20px;">
      <el-button size="mini" type="primary" icon="el-icon-circle-plus" @click="showAddForm">新增</el-button>
      <el-button size="mini" type="primary" icon="el-icon-refresh" @click="queryBeerList">刷新</el-button>
    </el-row>
    <el-table size="mini" border stripe :data="tableData">
      <el-table-column label="编号" prop="number" width="50"></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="厂牌" prop="brand"></el-table-column>
      <el-table-column label="风格" prop="style" width="100"></el-table-column>
      <el-table-column label="规格" prop="spec" width="60"></el-table-column>
      <el-table-column label="价格" width="60">
        <template slot-scope="scope">
          {{ ~~scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="showUpdateForm(scope.row)">修改</el-button>
          <el-button size="mini" type="text" @click="deleteBeer(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-footer">
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-size="pagination.pageSize"
          :page-sizes="[10, 20, 30, 50]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>
    </div>
    <el-dialog :title="beerFormTitle" :visible.sync="isBeerFormVisible">
      <el-form size="mini" :model="beerForm" ref="beerForm" :rules="beerFormRule">
        <el-form-item label="编号" prop="number" label-width="80px">
          <el-input v-model="beerForm.number" placeholede="请输入编号"></el-input>
        </el-form-item>
        <el-form-item label="厂牌" prop="brand" label-width="80px">
          <el-input v-model="beerForm.brand" placeholede="请输入厂牌"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name" label-width="80px">
          <el-input v-model="beerForm.name" placeholede="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="英文名" prop="enName" label-width="80px">
          <el-input v-model="beerForm.enName" placeholede="请输入英文名"></el-input>
        </el-form-item>
        <el-form-item label="产地" prop="origin" label-width="80px">
          <el-input v-model="beerForm.origin" placeholede="请输入产地"></el-input>
        </el-form-item>
        <el-form-item label="风格" prop="style" label-width="80px">
          <el-input v-model="beerForm.style" placeholede="请输入风格"></el-input>
        </el-form-item>
        <el-form-item label="酒精度" prop="vol" label-width="80px">
          <el-input v-model="beerForm.vol" placeholede="请输入酒精度">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="规格" prop="spec" label-width="80px">
          <el-input v-model="beerForm.spec" placeholede="请输入规格">
            <template slot="append">ml</template>
          </el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price" label-width="80px">
          <el-input v-model="beerForm.price" placeholede="请输入价格">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="isBeerFormVisible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="submitBeerForm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/beer'

export default {
  data () {
    return {
      tableData: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      currentBeer: {},
      isBeerFormVisible: false,
      beerFormType: 'add',
      beerFormTitle: '新增啤酒信息',
      beerForm: {
        number: null,
        brand: null,
        name: null,
        enName: null,
        origin: null,
        style: null,
        vol: null,
        spec: null,
        price: null
      },
      beerFormRule: {
        number: { required: true, message: '请输入编号' },
        brand: { required: true, message: '请输入厂牌' },
        name: { required: true, message: '请输入名称' },
        enName: { required: true, message: '请输入英文名' },
        origin: { required: true, message: '请输入产地' },
        style: { required: true, message: '请输入风格' },
        vol: { required: true, message: '请输入酒精度' },
        spec: { required: true, message: '请输入规格' },
        price: { required: true, message: '请输入价格' }
      }
    }
  },
  mounted () {
    this.queryBeerList()
  },
  methods: {
    async queryBeerList () {
      try {
        const { currentPage, pageSize } = this.pagination
        const res = await api.getBeerList({
          currentPage,
          pageSize
        })
        const result = res.data.data
        if (result.code) {
          this.$message({
            type: 'error',
            message: result.msg
          })
          return
        }
        this.tableData = result.iData
        this.pagination.total = result.total
      } catch (e) {
        console.log(e)
        this.$message({
          type: 'error',
          message: '更新列表失败'
        })
      }
    },
    showAddForm () {
      this.beerFormType = 'add'
      this.beerFormTitle = '新增啤酒信息'
      this.beerForm = {
        number: null,
        brand: null,
        name: null,
        enName: null,
        origin: null,
        style: null,
        vol: null,
        spec: null,
        price: null
      }
      this.isBeerFormVisible = true
      this.$refs.beerForm && this.$refs.beerForm.resetFields()
    },
    showUpdateForm (row) {
      this.beerFormType = 'update'
      this.beerFormTitle = '修改啤酒信息'
      this.currentBeer = { ...row }
      this.beerForm = { ...row }
      this.isBeerFormVisible = true
    },
    async addBeer () {
      try {
        const res = await api.addBeer({
          ...this.beerForm
        })
        const result = res.data.data
        if (result.code) {
          this.$message({
            type: 'error',
            message: result.msg
          })
          return
        }
        this.isBeerFormVisible = false
        this.queryBeerList()
        this.$message({
          type: 'success',
          message: '新增啤酒信息成功'
        })
      } catch (e) {
        console.log(e)
        this.$message({
          type: 'error',
          message: '新增啤酒信息失败'
        })
      }
    },
    async updateBeer () {
      try {
        const res = await api.updateBeer({
          ...this.beerForm,
          id: this.currentBeer.id
        })
        const result = res.data.data
        if (result.code) {
          this.$message({
            type: 'error',
            message: result.msg
          })
          return
        }
        this.isBeerFormVisible = false
        this.queryBeerList()
        this.$message({
          type: 'success',
          message: '更新啤酒信息成功'
        })
      } catch (e) {
        console.log(e)
        this.$message({
          type: 'error',
          message: '更新啤酒信息失败'
        })
      }
    },
    submitBeerForm () {
      this.$refs.beerForm.validate(valid => {
        if (valid) {
          this.beerFormType === 'add' ? this.addBeer() : this.updateBeer()
        }
      })
    },
    deleteBeer (row) {
      this.$confirm(`确定要删除「${row.name}」吗?`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const res = await api.deleteBeer({
            id: row.id
          })
          const result = res.data.data
          if (result.code) {
            this.$message({
              type: 'error',
              message: result.msg
            })
            return
          }
          this.queryBeerList()
          this.$message({
            type: 'success',
            message: `删除成功`
          })
        } catch (e) {
          console.log(e)
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        }
      })
    },
    handleCurrentChange (current) {
      this.pagination.currentPage = current
      this.queryBeerList()
    },
    handleSizeChange (size) {
      this.pagination.pageSize = size
      this.queryBeerList()
    }
  }
}
</script>

<style lang="scss">
@import './style.scss';
</style>
