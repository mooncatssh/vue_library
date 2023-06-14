<template>
    <div>
      <el-breadcrumb style="height:50px" separator-class="el-icon-arrow-right">
              <el-breadcrumb-item class="u1" :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item class="u1">下架图书</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
      <el-card class="box-card">
                  <!-- 图书列表 -->
              <el-table :data="booksList" stripe>
                  <el-table-column label="#" type="index"></el-table-column>
                  <el-table-column label="图书名称" prop="bookName" ></el-table-column>
                  <el-table-column label="作者" prop="author" ></el-table-column>
                  <el-table-column label="简介" prop="absrtact" >
                      <template slot-scope="scope">
                          <a :href="scope.row.absrtact">{{ scope.row.absrtact }}</a>
                      </template>
                  </el-table-column>
                  <el-table-column label="价格" prop="price" ></el-table-column>
                  <el-table-column label="上架时间" prop="buyTime" >
                    <template slot-scope="scope">
                         {{ scope.row.buyTime[0]+'-'+scope.row.buyTime[1]+'-'+scope.row.buyTime[2]}}
                         <br>
                         {{ scope.row.buyTime[3]+':'+scope.row.buyTime[4] }}
                    </template>
                  </el-table-column>
                <el-table-column label="下架" width="180px">
                    <template slot-scope="scope">
                        <el-button type="warning" style="border-radius:10px" size="mini" icon="el-icon-setting" @click="removeBooks(scope.row)"></el-button>                 
                    </template>
                </el-table-column>
              </el-table>  
      </el-card>
    </div>
  </template>
  
  <script>
  export default {
      name:'books',
      data(){
          return{
              /* 图书列表 */
              booksList:[],
              /*搜索图书参数  */
              qeury:{
                  bookName:''
              },
              /* 开关 */
              value:'',
              /* 下架图书 */
              value1:''
          }
      },
      created(){
          this.getBooksList()
  
      },
      methods:{
          /* 获取图书列表 */
         async getBooksList(){
              const{data:res} = await this.$https.get(`/book`)
              if(res.code!==1){
                  return this.$message.error('请求用户失败')
              }
              this.booksList = res.data
          },
          /* 查询图书 */
          async getBooks(){
              const{data:res} = await this.$https.get(`/book/${this.qeury.bookName}`)
              if(res.code!==1){
                  return this.$message.error('请求用户失败')
              }
              this.booksList = 0
              this.booksList = res.data
          },
          /* 下架图书 */
          async removeBooks(row){
            const confirmResult = await this.$confirm('欧尼酱,消灭该敌人, 嗯?', '询问QAQ', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
        ).catch(err => err)
        //如果用户确认删除，则返回值为字符串 confirm
        //如果用户取消删除，则返回值为字符串 cancel
        if(confirmResult !=='confirm'){
            return this.$message.info('已取消删除')
        }
            const{data:res} = await this.$https.delete(`/book/${row.id}`)
            if(res.code!==1){
                return this.$message.error('下架图书失败')
            }
            this.$message.success('成功删除')
            this.getBooksList()
          }
      }
  
  }
  </script>
  
  <style lang="less" scoped>
  .u1{
      font-style: italic;
      color: aqua;
      font-size: 30px;
  }
  .box-card{
      padding:-10px;
      border-bottom:2px solid rgb(212, 92, 112);
      border-radius: 20px;
      opacity: 0.7;
  }
  .el-table{
      margin-top: 20px;
  }
  /deep/ .el-form-item__label{
      height: 50px;
      font-size: 18px;
      color: aqua;
      text-align: left;
  
  }
  /deep/.el-input__inner{
      background-color: rgb(115, 234, 108);
      font-size: 20px;
      color: red;
      opacity: 0.3;
  }
  /deep/.el-input__inner:hover{
      background-color: yellow;
  }
  
  /deep/ .el-button.el-button--default{
      border-radius: 30px;
      background-color: rgb(96, 105, 105);
      color: rgb(212, 92, 112);
      
  }
  /deep/ .el-button.el-button--primary{
      border-radius: 30px;
      background-color: rgb(53, 219, 219);
      color: rgb(146, 197, 108);
  
  }
  .el-table{
      margin-top: 20px;
  }
  /deep/ .el-form-item__label{
      height: 50px;
      font-size: 18px;
      color: aqua;
      text-align: left;
  
  }
  /deep/ .el-drawer{
      background-image: url('../assets/F38E275BCB5F3E291BBC99A932971ECE.jpg');
      background-size: cover;
      opacity: 0.7;
  }
  /deep/.el-drawer{
      span{
      margin-left: 100px;
      line-height: 80px;
      font-size: 30px;
      color: #2d2e30;
      font-style: italic;
      opacity: 0.8;
      }
  
  }
  .b3{
      /deep/ .el-form-item__label{
      height: 50px;
      font-size: 20px;
      color:slategray;
      text-align: left;
  
  }
      /deep/.el-input__inner{
      background-color: rgb(222, 216, 216);
      width: 250px;
      font-size: 20px;
      color: rgb(65, 63, 137);
      opacity: 0.3;
      }
  }
  
  
  </style>>
  