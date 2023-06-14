<template>
    <div>
      <el-breadcrumb style="height:50px" separator-class="el-icon-arrow-right">
              <el-breadcrumb-item class="u1" :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item class="u1">借阅文件</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
      <el-card class="box-card">
                  <!-- 借阅文件 -->
              <el-table :data="getlist" stripe>
                  <el-table-column label="#" type="index"></el-table-column>
                  <el-table-column label="读者号" prop="userId" ></el-table-column>
                  <el-table-column label="图书名称" prop="bookName" ></el-table-column>
                  <el-table-column label="借出时间" prop="lendTime" >
                    <template slot-scope="scope">
                         {{ scope.row.lendTime[0]+'-'+scope.row.lendTime[1]+'-'+scope.row.lendTime[2]}}
                         <br>
                         {{ scope.row.lendTime[3]+':'+scope.row.lendTime[4] }}
                    </template>
                  </el-table-column>
                  <el-table-column label="归还时间" prop="returnTime" >
                    <template slot-scope="scope">
                         {{ scope.row.returnTime[0]+'-'+scope.row.returnTime[1]+'-'+scope.row.returnTime[2]}}
                         <br>
                         {{ scope.row.returnTime[3]+':'+scope.row.returnTime[4] }}
                    </template>
                  </el-table-column>
                  <!-- 操作 -->
              <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <el-button type="danger" style="border-radius:10px" size="mini" icon="el-icon-delete" @click="removeUserById(scope.row)">归还</el-button>                 
                    </template>
                </el-table-column>
              </el-table>
      </el-card>
    </div>
  </template>
  
  <script>
  export default {
      name:'Jbooks',
      data(){
          return{
            /* 读者信息 */
            getlist:[]
          }
      },
      created(){
          this.getlistsle()
  
      },
      methods:{
          /* 获取列表 */
          async getlistsle(){
            const{data:res} = await this.$https.get('/lend')
            if(res.code!==1){
                this.$message.error('借阅文档请求失败')
            }
            this.getlist = res.data
          },
          /* 归还图书 */
        async removeUserById(row){
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
        const{data:res} = await this.$https.delete(`/lend?userId=${row.userId}&bookName=${row.bookName}`)
        console.log(res.msg)
        if(res.msg!==null){
            return this.$message.error(res.msg)
        }
        this.$message.success('归还成功')
        this.getlistsle()
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
  /deep/ .el-button.el-button--default{
      border-radius: 30px;
      background-color: rgb(96, 105, 105);
      color: rgb(212, 92, 112);
      
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

  .b3{
      /deep/ .el-form-item__label{
      height: 50px;
      font-size: 20px;
      color:slategray;
      text-align: left;
  
  }
  }
  </style>
  