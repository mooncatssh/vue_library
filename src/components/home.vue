<template>
  <div class="w">
        <el-container class="header">
          <!-- 头部标题 -->
         <el-header>
          <div class="header_left">
            <span>This is the interface for the super administrator</span>
          </div>
          <div class="w1">
            <a href="/">登出</a>
          </div>
         </el-header>
         <el-container>
          <!-- 侧边栏 -->
           <el-aside width="220px">
            <div class="avatar_box">
            <div class="box-img"></div>
        </div>
            <el-menu active-text-color="pink"  router>
              <el-menu-item :index="'/books'">
                <span class="h1">图书列表</span></el-menu-item>
              <el-menu-item :index="'/Jbooks'">
                <span class="h1">借阅文件</span></el-menu-item>
              <el-menu-item :index="'/Hbooks'">
                <span class="h1">读者信息</span></el-menu-item>
                <el-menu-item :index="'/deletebooks'">
                  <span class="h1">下架图书</span></el-menu-item>
            </el-menu>
           </el-aside>
           <!-- 中心区 -->
           <el-main>
            <router-view></router-view>
           </el-main>
         </el-container>
       </el-container>       
  </div>
</template>

<script>
export default {
    name:'home',
    data(){
        return{
          dd:'',
        }
    },
    created(){
      this.name()
    },
    methods:{
      name(){
        this.dd = this.$route.query.username
      }
    }

}
</script>

<style lang="less" scoped>
.w{ 
  height: 100%;
  background-image: url('../assets/564206B552E02E3DBF3E2FA611BBDCFF.jpg');
  background-size: cover;
  overflow:auto;
}
.header{
     margin: 0 auto;
     width: 80%;
     height: 100%;
}
/deep/ .el-header{
  border-radius: 20px;
  width:100%px;
  height: 80%px;
  opacity: 0.5;
}
.header_left{
  margin: 0 auto;
  span{
    position: relative;
    top:-5px;
    font-style: italic;
    font-size: 50px;
    color: transparent;
    background: url('../assets/C1FD85DB22E1605DD8B4765A3698E409.jpg');
    animation: moveImg 7s infinite alternate linear;
    /* 文字背景 */
   -webkit-background-clip :text;
  }
}
.w1{
  width: 200px;
  height: 70px;
  a{
    text-decoration:none;
    padding-left: 30px;
    font-size: 60px;
    font-style: italic;
  }

}
.h1{
 /* 文字透明 */
   color: transparent;
    background: url('../assets/90648E8416A71D1C801AF85F12323E86.jpg');
    animation: moveImg 7s infinite alternate linear;
    /* 文字背景 */
  -webkit-background-clip :text;
  font-style: italic;
  font-size: 40px;
}
@keyframes moveImg {
            0% {
                background-position: 0%;
            }
 
            50% {
                background-position: 50%;
            }
 
            100% {
                background-position: 100%;
            }
        }
/deep/ .el-menu{
  background-color:rgb(223, 217, 218);
  border-radius: 20px;
  margin-top: 10px;
  height: 250px;
  opacity: 0.8;
  overflow: hidden;
}
/ddep/.el-main{
  background-color: antiquewhite;
}
.avatar_box{
  height: 200px;
  width: 190px;
  border-radius: 10px;
  margin-top:100px;
  margin-left: 5px;
    padding: 10px;
    box-shadow: 0 0 10px white;
    border: 1px solid white;
    .box-img{
  background-image: url('../assets/E191CF1C4F2868EE37B0DAB55F22618E.jpg');
  animation: moveImg 4s infinite alternate linear;
  width: 100%;
  height: 100%;
  border-radius: 30px;
}
}
.us1{
  font-size: 40px;
  font-style: italic;
  color: aqua;
}

</style>>
