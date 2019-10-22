<template>
  <div class="hello">
    <div>
      <el-input placeholder="请输入查询的学号" v-model="searchData" class="input-with-select">
        <el-button slot="append" icon="el-icon-refresh-left" @click="restore">重置</el-button>
        <el-button slot="append" icon="el-icon-search" @click="search">查找</el-button>
        <el-button slot="append" icon="el-icon-arrow-right" @click="go">进入组织管理界面</el-button>
      </el-input>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%;padding-top: 20px;"
      @sort-change='sort'
      ref="table">
      <el-table-column
        prop="id"
        label="学号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="class"
        label="班级"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mark1"
        label="高等数学"
        width="180"
        sortable='custom'>
      </el-table-column>
      <el-table-column
        prop="mark2"
        label="程序设计"
        width="180"
        sortable='custom'>
      </el-table-column>
      <el-table-column
        prop="mark3"
        label="数据结构"
        width="180"
        sortable='custom'>
      </el-table-column>
      <el-table-column
        prop="average"
        label="平均分"
        sortable='custom'>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getName} from '../utils'
export default {
  name: 'HelloWorld',
  data() {
    return {
      tableData: [],
      dataBackup: [],  //用于备份tableData还原
      searchData: "",
    }
  },
  methods: {
    /**
     * 随机生成数值
     * @param lower 最低值
     * @param upper 最高值
     * @returns {Number} 返回的数值
     */
    getRandom(lower, upper) {
      return Math.floor(Math.random() * (upper - lower+1)) + lower;
    },
    sortBy(arr, prop, desc){
      //将对象数组中指定的属性提取出来成为一个数组
      var props=[],
              ret=[],
              i=0,
              len=arr.length;
      if(typeof prop=='string') {
        for(; i<len; i++){
          var oI = arr[i];
          (props[i] = new Number(oI && oI[prop] || ''))._obj = oI;
        }
      }
      else if(typeof prop=='function') {
        for(; i<len; i++){
          var oI = arr[i];
          (props[i] = new Number(oI && prop(oI) || ''))._obj = oI;
        }
      }
      else {
        throw '参数类型错误';
      }
      //进行排序，这里使用的是快速排序的方法
      this.quickSort(props, 0, props.length - 1);
      //重新通过属性值，找回相对应的对象，建立对象数组
      for(i=0; i<len; i++) {
        ret[i] = props[i]._obj;
      }
      //是否倒序
      if(desc) ret.reverse();
      return ret;
    },
    /**
     * 监视table控件的排序事件
     * @param column
     * @param prop
     * @param order
     */
    sort(column, prop, order){
      //为升序排序的情况
      if(column.order === 'ascending'){
        this.tableData = this.sortBy(this.tableData, column.prop, false);
        //为默认排序的情况
      }else if(column.order === null){
        this.tableData = this.dataBackup;
        //为升序排序的情况
      }else{
        this.tableData = this.sortBy(this.tableData, column.prop, true);
      }
    },
    /**
     * 初始化生成假数据
     */
    getData(){
      for(let i = 0; i < 100; i++){
        let data = {
          id: (3117000680 + i),
          name: getName(),
          class: '170815',
          mark1: 0,
          mark2: 0,
          mark3: 0,
          average: 0,
        };
        data.mark1 = this.getRandom(60, 100);
        data.mark2 = this.getRandom(60, 100);
        data.mark3 = this.getRandom(60, 100);
        this.tableData.push(data);
      }
      //计算平均分
      for(let j in this.tableData){
        this.tableData[j].average = ((this.tableData[j].mark1 + this.tableData[j].mark2 + this.tableData[j].mark3) / 3).toFixed(2);
      }
      this.dataBackup = this.tableData;
    },
    /**
     * 快速排序算法
     * @param arr 需排序的数组
     * @param i 数组头位置start
     * @param j 数组尾位置end
     */
    quickSort(arr, i, j) {
      if(i < j) {
        let left = i;
        let right = j;
        let pivot = arr[left];  //令第一个数为基准
        while(i < j) {
          while(arr[j] >= pivot && i < j) {  // 从后往前找比基准小的数
            j--;
          }
          if(i < j) {
            arr[i++] = arr[j];
          }
          while(arr[i] <= pivot && i < j) {  // 从前往后找比基准大的数
            i++;
          }
          if(i < j) {
            arr[j--] = arr[i];
          }
        }
        arr[i] = pivot;
        this.quickSort(arr, left, i-1);
        this.quickSort(arr, i+1, right);
      }
    },
    /**
     * 折半查找算法
     * @param a 需要查找的数组（该数组需要进行排序）
     * @param key 关键字
     * @returns {number} 返回的数组下标
     */
    binarySearch(a, key){
      let low, mid, high;
      low = 0;// 最小下标
      high = a.length - 1;// 最大小标
      while (low <= high) {
        mid = Math.round((high + low) / 2);  //折半下标
        if (key > a[mid]) {
          low = mid + 1;   //关键字比折半值大，则最小下标值调成折半下标的下一位
        } else if (key < a[mid]) {
          high = mid - 1;  //关键字比折半值小，则最大下标值调成折半下标的前一位
        } else {
          return mid; // 当key == a[mid]，表示已经找到，返回下标
        }
      }
    },
    search(){
      let prop = "id";
      //因为折半查找算法需要在一个已经排序了的数组才能使用，所以这里使用备份数据作为数据源
      let arr = this.dataBackup;
      var props=[],
              ret=[],
              i=0,
              len=arr.length;
      if(typeof prop=='string') {
        for(; i<len; i++){
          var oI = arr[i];
          (props[i] = new Number(oI && oI[prop] || ''))._obj = oI;
        }
      }
      else if(typeof prop=='function') {
        for(; i<len; i++){
          var oI = arr[i];
          (props[i] = new Number(oI && prop(oI) || ''))._obj = oI;
        }
      }
      else {
        throw '参数类型错误';
      }
      //找到的数组下标
      let point = this.binarySearch(props, Number(this.searchData));
      if(point !== undefined){
        ret.push(props[point]._obj);
        this.tableData = ret;
      }else{
        this.$message.error('搜索不到相应值');
      }

    },
    restore(){
      this.tableData = this.dataBackup;
      this.$refs.table.clearSort();
      this.searchData = "";
    },
    go(){
      this.$router.push('relation');
    }
  },
  mounted() {
    this.getData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
