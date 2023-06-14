<template>
    <div>
      <el-breadcrumb style="height:50px" separator-class="el-icon-arrow-right">
              <el-breadcrumb-item class="u1" :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item class="u1">读者信息</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
        <el-card class="box-card">
         <!--搜索 -->
         <el-row :gutter="70">
                <el-col :span="4">
                    <el-button @click="edialogVisible=true" class="b2" type="primary" round>添加读者</el-button>
                </el-col>
        </el-row>
           <!--读者列表 -->
           <el-table :data="userList" stripe>
                  <el-table-column label="#" type="index"></el-table-column>
                  <el-table-column label="读者名字" prop="userId" ></el-table-column>
                  <el-table-column label="读者密码" prop="password" ></el-table-column>
                  <el-table-column label="读者最大借书量" prop="maxBooks" ></el-table-column>
                  <el-table-column label="读书信息是否失效" prop="isLogout" >
                    <template slot-scope="scope">
                         <el-switch
                          v-model="scope.row.isLogout"
                           active-color="#13ce66"
                           inactive-color="#ff4949"
                           :active-value="0"
                           :inactive-value="1"
                           disabled>
                         </el-switch>
                </template>
                  </el-table-column>
                </el-table>
        <!-- 添加读者对话框 -->
        <el-dialog 
            title="添加读者信息"
            :visible.sync="edialogVisible"
            width="35%" 
            :append-to-body="true"
            @close="eddDialogClose">
            <!--内容区 -->
        <el-form :model="userFrom"  ref="userFromRef" label-width="80px">
            <el-form-item label="用户名" prop="userId">
                <el-input v-model="userFrom.userId"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="userFrom.password"></el-input>
            </el-form-item>
            <el-form-item label="最大借书量" prop="maxBooks">
                <el-input v-model="userFrom.maxBooks"></el-input>
            </el-form-item>
        </el-form> 
        <!-- 底部区 -->
           <span slot="footer" class="dialog-footer">
             <el-button @click="edialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="addUserInfo()">确 定</el-button>
           </span>
        </el-dialog>    
      </el-card>
    </div>
  </template>
  
  <script>
  export default {
      name:'books',
      data(){
          return{
              /* 读者信息列表 */
              userList:[],
              /* 查询读者请求参数 */
              qury:{
                userId:''
              },
              /* 添加读者对话框 */
              edialogVisible:false,
              /* 添加读者信息 */
              userFrom:{
                userId:'',
                password:'',
                maxBooks:''
              }
          }
      },
      created(){
          this.getUsersList()
      },
      methods:{
          /* 获取读者信息列表 */
          async getUsersList(){
            const{data:res} = await this.$https.get('/user')
            if(res.code!==1){
                return this.$message.error('读者信息请求失败')
            }
            this.userList = res.data
          },
          /* 重置添加读者表 */
          eddDialogClose(){
            this.$refs.userFromRef.resetFields()
          },
          /* 提交读者信息 */
          async addUserInfo(){
            this.$refs.userFromRef.validate(async valid=>{
            const{data:res} = await this.$https.post('/user',this.userFrom)
            if(res.code!==1){
                this.$message.error('增加读者失败')
            }
            this.edialogVisible = false
            this.getUsersList()
            })
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
  /deep/ .el-dialog__wrapper{
    width: 1500px;
    opacity: 0.5;
}
/deep/ .el-dialog{
    border-radius: 50px;
}
/deep/ .el-dialog__header{
    padding: 1vh 1vw 0 1vw;
    background-image: url('../assets/E624A820181D9856AA0ED0F782385C1B.jpg');
    background-size: cover;
    border-radius: 50px;
    opacity: 0.5;
}
/deep/ .el-dialog__title {
    margin-left: 90px;
    line-height: 80px;
    font-size: 50px;
    color: #596bcc;
    font-style: italic;
    opacity: 0.8;
    }
/deep/ .el-dialog__body{
    line-height: 20px;
    font-style: italic;
    opacity: 0.5;
    background-image: url('../assets/E624A820181D9856AA0ED0F782385C1B.jpg');
    background-size:cover;
}
/deep/ .el-dialog__footer{
    background-image: url('../assets/E624A820181D9856AA0ED0F782385C1B.jpg');
    background-size:cover;
    border-radius: 50px;
    opacity: 0.5;
}
  
  </style>>
  