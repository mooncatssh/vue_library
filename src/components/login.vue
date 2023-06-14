<template>
  <div class="login_container">
    <div class="h3">You Shall Die</div>
    <div class="login_box">
        <!-- 头像区 -->
        <div class="avatar_box">
            <div class="img"></div>
        </div>
        <!-- 登录区 -->
        <el-form  ref="loginfromRef" :model="loginFrom" :rules="loginFromRules" label-width="0px" class="login_form">
            <div class="w">HI,GOAT</div>
            <br><br>
            <div class="w">Welcome Back</div>
            <!-- 用户名 -->
            <el-form-item class="input" prop="username">
                <el-input v-model="loginFrom.username" prefix-icon="el-icon-user" style="border-radius:10px" ></el-input>
            </el-form-item>
            <br>
            <!-- 密码 -->
            <el-form-item class="input" prop="password">
                <el-input show-password v-model="loginFrom.password" prefix-icon="el-icon-lock" style="border-radius:10px" ></el-input>
            </el-form-item>
            <div class="text">这是一场试炼</div>
            <!-- 按钮 -->
            <el-button  round @click="login" >登录</el-button>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
    name:'login',
    data() {
        return {
            loginFrom:{
                username:'',
                password:''
            },
            loginFromRules:{
                /* 验证用户 */
                userId:[
                { required: true, message: '请输入正确的用户名', trigger: 'blur' },
                { min: 3, max: 8, message: '长度在 3到 6个字符', trigger: 'blur' }
                ],
                /* 验证密码 */
                password:[
                { required: true, message: '请输入正确的密码', trigger: 'blur'},
                { min: 3, max: 6, message: '长度在 3到 6个字符', trigger: 'blur'}
                ]
            }      
    }
},
methods:{
    async login(){
        this.$refs.loginfromRef.validate(async valid=>{
            if(!valid) return;
            const{data:res} = await this.$https.post('/root/login',this.loginFrom)
            if(res.code!==1){
                return this.$message.error('登录失败')
            }
            this.$router.push({path:'/home',query:{username:this.loginFrom.username}})
        })
        }
        }
    }
</script>

<style lang="less" scoped>
.login_container{
    height: 100%;
    background-color: blanchedalmond;
}
.h3{
    margin-left: 500px;
    /* 文字透明 */
    color: transparent;
    background: url('../assets/E624A820181D9856AA0ED0F782385C1B.jpg');
    animation: animate 5s infinite alternate linear;
    /* 文字背景 */
    -webkit-background-clip :text;
    font-size: 80px;
    font-style: italic;
}

.login_box{
    width: 800px;
    height: 500px;
    border-radius: 10px;
    opacity: 0.8;
    position:absolute;
    left: 53%;
    top:60%;
    box-shadow: 0 5px 10px rgb(206, 151, 151);
    transform: translate(-50%,-50%);
}
.avatar_box{
    height: 500px;
    width: 400px;
    margin-top:-10px;
    margin-left: -11px;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 0 10px white;
    border: 1px solid white;
    .img{
        background: url("../assets/106449882_p0_master1200.jpg");
        animation: animate 2s infinite alternate linear;
        height: 100%;
        width: 100%;
    }
}
/deep/ .el-input__prefix{
    margin-left: -10px;
}
/deep/.el-input__inner{
    border-radius: 30px;
    border: 0px;
    box-shadow: 0 2px pink;
}
/deep/.el-input{
    height: 50px;
    outline: none;
    font-size: 35px;
    border: 0px;
}
.login_form{
    width: 300px;
    height: 200px;
    position: absolute;
    left: 450px;
    top: 100px;
    padding: 0px 20px;
}
bottom{
    font-size: 40px;
}
/deep/.el-button{
    margin-top: 20px;
    font-style: italic;
    font-size: 30px;
    color: pink;
    margin-left: 90px;
}

.text{
    text-align: center;
    font-size: 40px;
    font-style: italic;
    /* 文字透明 */
    color: transparent;
    background: url('../assets/A3E6E56333801E4640CA678F83321707.jpg');
    animation: animate 2s infinite alternate linear;
    /* 文字背景 */
    -webkit-background-clip :text;
}
@keyframes animate {
      from {
        background-position: 50%;
      }

      to {
        background-position: 10%;
      }
    }

.w{
    /* 文字透明 */
    color: transparent;
    background: url('../assets/A3E6E56333801E4640CA678F83321707.jpg');
    animation: animate 7s infinite alternate linear;
    /* 文字背景 */
    -webkit-background-clip :text;
    font-size: 40px;
    margin-left: 20px;
    margin-top: -50px;
}
</style>>

</style>