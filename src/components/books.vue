<template>
  <div>
    <el-breadcrumb style="height:50px" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="u1" :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item class="u1">图书列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
         <!--搜索 -->
         <el-row :gutter="70">
                <el-col :span="10">
                    <el-input clearable @clear="getBooksList" type="text" placeholder="请输入内容" v-model="qeury.bookName" class="input-with-select">
                        <el-button @click="getBooks" slot="append" icon="el-icon-search"></el-button>
                        </el-input>           
                </el-col>
                <el-col :span="4">
                    <el-button @click="drawer=true" class="b2" type="primary" round>添加图书</el-button>
                </el-col>
        </el-row>
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
                <el-table-column label="是否被借阅" prop="isBorrowing">
                    <template slot-scope="scope">
                         <el-switch
                          v-model="scope.row.isBorrowing"
                           active-color="#13ce66"
                           inactive-color="#ff4949"
                           :active-value="0"
                           :inactive-value="1"
                           disabled>
                         </el-switch>
                </template>
                </el-table-column> 
                <!-- 操作 -->
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <el-button type="primary" style="border-radius:10px" @click="showedialogVisible(scope.row)" size="mini" icon="el-icon-edit">借阅</el-button>                
                    </template>
                </el-table-column>
                 <!-- 借阅读者信息 --> 
        <el-dialog 
            title="借阅读者信息"
            :visible.sync="edialogVisible"
            width="35%" 
            :append-to-body="true"
            @close="eddDialogClose">
            <!--内容区 -->
        <el-form :model="userFrom"  ref="userFromRef" label-width="80px">
            <el-form-item label="用户名" prop="userId">
                <el-input v-model="userFrom.userId"></el-input>
            </el-form-item>
            <el-form-item label="图书编号" prop="serialId">
                <el-input v-model="userFrom.serialId"></el-input>
            </el-form-item>
        </el-form> 
        <!-- 底部区 -->
           <span slot="footer" class="dialog-footer">
             <el-button @click="edialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="addUserInfo()">确 定</el-button>
           </span>
        </el-dialog>    
            </el-table>
            <!-- 添加图书框 -->
        <el-drawer
            title="添加图书信息"
            :visible.sync="drawer"
            direction="rtl"
            :append-to-body="true"
            size="30%"
            :before-close="handleClose">        
            <!-- 内容主题区 -->
        <el-form :model="addBooks" :rules="addBooksRules" ref="addBooksRef" label-width="80px">
              <el-form-item class="b3" label="名称" prop="bookName">
                <el-input v-model="addBooks.bookName"></el-input>
              </el-form-item>
              <el-form-item class="b3" label="作者" prop="author">
                <el-input v-model="addBooks.author"></el-input>
              </el-form-item>
              <el-form-item class="b3" label="简介" prop="absrtact">
                <el-input v-model="addBooks.absrtact"></el-input>
              </el-form-item>
              <el-form-item class="b3" label="价格" prop="price">
                <el-input v-model="addBooks.price"></el-input>
              </el-form-item>   
        </el-form>
        <div class="demo-drawer__footer">           
              <el-button  @click="drawer = false">取 消</el-button>
              <el-button  type="primary" @click="addbook">确 定</el-button>
        </div> 
        </el-drawer>
        <!-- 借阅读者信息 --> 
        <el-dialog 
            title="借阅读者信息"
            :visible.sync="edialogVisible"
            width="35%" 
            :append-to-body="true"
            @close="eddDialogClose">
            <!--内容区 -->
        <el-form :model="userFrom"  ref="userFromRef" label-width="80px">
            <el-form-item label="用户名" prop="userId">
                <el-input v-model="userFrom.userId"></el-input>
            </el-form-item>
            <el-form-item label="图书编号" prop="serialId">
                <el-input v-model="userFrom.id"></el-input>
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
            /* 图书列表 */
            booksList:[],
            /*搜索图书参数  */
            qeury:{
                bookName:''
            },
             /* 读者信息对话框 */
             edialogVisible:false,
            /* 添加图书对话框 */
            drawer:false,
            /* 添加图书请求参数 */
            addBooks:{
                bookName:'',
                author:'',
                absrtact:'',
                price:''
            },
            /* 借阅信息 */
            userFrom:{
                userId:'',
                id:''
            },
            /* 验证添加图书 */
            addBooksRules:{
                bookName:[
                {required: true, message:'请输入图书名称',trigger:'blur'},],
                author:[
                {required: true,message:'输入作者名',trigger:'blur'},
                {min:5,max:8,message:'输入1-8个字符',trigger:'blur'}],
                price:[
                {required: true,message:'请输入价格',trigger:'blur'},]
        },
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
            console.log(res)
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
        /* 关闭添加框重置表单 */
        handleClose(){
            this.$refs.addBooksRef.resetFields()
        },
        /* 重置添加读者信息对话框 */
        eddDialogClose(){
            this.$refs.UserFromRef.resetFields()
        },
        /* 添加图书 */
        async addbook(){
            this.$refs.addBooksRef.validate(async valid=>{
                if(!valid) return;
            const{data:res} = await this.$https.post('/book',this.addBooks)
            if(res.code!==1){
                return this.$message.error('添加图书失败')
            }
            this.drawer = false
            this.getBooksList()
            })
        },
        /* 借阅对话框 */
       async showedialogVisible(row){
            const{data:res} = await this.$https.get(`/lend/${row.id}`)
            if(res.code!==1){
                return this.$message.error('获取id数据失败')
            }
            this.userFrom = res.data
            console.log(this.userFrom)
            this.edialogVisible = true
        },
        /* 提交借阅者 */
        async addUserInfo(){
            this.$refs.userFromRef.validate(async valid=>{
                if(!valid) return ;
            const{data:res} = await this.$https.post('/lend',{userId: this.userFrom.userId,id:this.userFrom.id})
            if(res.code!==1){
                return this.$message.error('提交借阅读者失败')
            }
            this.edialogVisible = false
            this.getBooksList()
            
            })
        },
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
    color:rgb(129, 163, 198);
    text-align: left;

}
    /deep/.el-input__inner{
    background-color: rgb(222, 216, 216);
    width: 250px;
    font-size: 20px;
    color: rgb(207, 33, 33);
    opacity: 0.5;
    }
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
