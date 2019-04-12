<template>
  <div class="menu-control">
    <el-card class="screen-card" v-for="screen in screenList" :key="screen.id">
      <div slot="header" class="card-header">
        <span>{{ screen.name }}</span>
        <el-button size="mini" circle type="primary" icon="el-icon-plus" @click="showSelectDialog(screen)" />
      </div>
      <el-table size="mini" stripe :data="screen.beerList">
        <el-table-column label="编号" prop="number" width="50"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="厂牌" prop="brand"></el-table-column>
        <el-table-column label="操作" width="50">
          <template slot-scope="scope">
            <el-button size="mini" circle type="danger" icon="el-icon-minus" @click="removeBeerFromScreen(scope.row, screen)"/>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="selectDialogTitle" :visible.sync="isSelectDialogVlisble">
      <el-table size="mini" stripe :data="selectTableData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="编号" prop="number" width="50"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="厂牌" prop="brand"></el-table-column>
        <el-table-column label="价格" prop="price" width="60"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="isSelectDialogVlisble = false">取消</el-button>
        <el-button size="mini" type="primary" @click="submitSelected">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/screen'
import * as beerApi from '@/api/beer'

export default {
  data () {
    return {
      screenList: [],
      selectTableData: [],
      isSelectDialogVlisble: false,
      selectDialogTitle: '选择要展示的啤酒',
      selectedList: [],
      currentScreen: {}
    }
  },
  mounted () {
    this.getScreenList()
  },
  methods: {
    // 查询屏幕列表
    async getScreenList () {
      try {
        const res = await api.getScreenList()
        const result = res.data.data
        if (result.code) {
          this.$message({
            type: 'error',
            message: result.msg
          })
          return
        }
        this.screenList = result
      } catch (e) {
        console.log(e)
        this.$message({
          type: 'error',
          message: '更新屏幕信息失败'
        })
      }
    },
    // 查询可用啤酒列表
    async getAvailableBeerList () {
      try {
        const res = await beerApi.getBeerList({
          status: 1,
          currentPage: 1,
          pageSize: 1000
        })
        const result = res.data.data
        if (result.code) {
          this.$message({
            type: 'error',
            message: result.msg
          })
          return
        }
        const screenBeerIds = this.currentScreen.beerList.map(beer => beer.id)
        this.selectTableData = result.iData.filter(beer => !screenBeerIds.includes(beer.id))
      } catch (e) {
        console.log(e)
        this.$message({
          type: 'error',
          message: '更新可用啤酒列表失败'
        })
      }
    },
    // 打开选择啤酒表单
    async showSelectDialog (screen) {
      this.currentScreen = screen
      await this.getAvailableBeerList()
      this.isSelectDialogVlisble = true
    },
    // 啤酒选中回调
    handleSelectionChange (val) {
      this.selectedList = val
    },
    // 提交选择啤酒表单
    async submitSelected () {
      if (!this.selectedList.length) {
        this.$message({
          type: 'warning',
          message: '尚未选择任何啤酒'
        })
        return
      }
      try {
        const res = await api.addToScreen({
          screenId: this.currentScreen.id,
          beerIds: this.selectedList.map(beer => beer.id)
        })
        const result = res.data
        if (result.code) {
          this.$message({
            type: 'error',
            message: result.msg
          })
          return
        }
        this.isSelectDialogVlisble = false
        this.getScreenList()
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      } catch (e) {
        console.log(e)
        this.$message({
          type: 'error',
          message: '添加失败'
        })
      }
    },
    // 从屏幕移除啤酒
    async removeBeerFromScreen (beer, screen) {
      try {
        const res = await api.removeFromScreen({
          screenId: screen.id,
          beerId: beer.id
        })
        const result = res.data
        if (result.code) {
          this.$message({
            type: 'error',
            message: result.msg
          })
          return
        }
        this.getScreenList()
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      } catch (e) {
        console.log(e)
        this.$message({
          type: 'error',
          message: '删除失败'
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import './style.scss';
</style>
