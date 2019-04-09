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
export default {
  data () {
    return {
      screenList: [],
      selectTableData: [],
      isSelectDialogVlisble: false,
      selectDialogTitle: '选择要展示的啤酒',
      selectedList: [],
      currentScreen: null
    }
  },
  mounted () {
    this.getScreenList()
    this.getAvailableBeerList()
  },
  methods: {
    getScreenList () {
      this.screenList = [
        { id: 0,
          name: '屏幕一',
          beerList: [
            { id: 0, number: 4, brand: '气泡实验室', name: '及时雨浑浊IPA' },
            { id: 0, number: 4, brand: '气泡实验室', name: '及时雨浑浊IPA' },
            { id: 0, number: 4, brand: '气泡实验室', name: '及时雨浑浊IPA' }
          ]
        },
        { id: 1, name: '屏幕二', beerList: [ { id: 0, number: 4, brand: '气泡实验室', name: '及时雨浑浊IPA' } ] },
        { id: 2, name: '屏幕三', beerList: [ { id: 0, number: 4, brand: '气泡实验室', name: '及时雨浑浊IPA' } ] }
      ]
    },
    getAvailableBeerList () {
      this.selectTableData = [
        {
          id: 0,
          number: 4,
          brand: '气泡实验室',
          name: '及时雨浑浊IPA',
          price: 40
        },
        {
          id: 1,
          number: 4,
          brand: '气泡实验室',
          name: '及时雨浑浊IPA',
          price: 40
        },
        {
          id: 2,
          number: 4,
          brand: '气泡实验室',
          name: '及时雨浑浊IPA',
          price: 40
        },
        {
          id: 3,
          number: 4,
          brand: '气泡实验室',
          name: '及时雨浑浊IPA',
          price: 40
        }
      ]
    },
    removeBeerFromScreen (beer, screen) {
      console.log(beer)
      console.log(screen)
      this.$message({
        type: 'success',
        message: '删除成功！'
      })
    },
    showSelectDialog (screen) {
      this.currentScreen = screen
      this.isSelectDialogVlisble = true
    },
    handleSelectionChange (val) {
      this.selectedList = val
      console.log(this.selectedList)
    },
    submitSelected () {
      console.log('submit!')
      this.isSelectDialogVlisble = false
      this.$message({
        type: 'success',
        message: '更新成功！'
      })
    }
  }
}
</script>

<style lang="scss">
@import './style.scss';
</style>
