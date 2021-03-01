<template>
<el-container>
  <el-header>财务报表</el-header>
  <el-container>
    <el-aside width="200px">
    <el-menu
      
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
	  width="200px">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-upload2"></i>
          <span>文件上传</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">上传基础表</el-menu-item>
          <el-menu-item index="1-2">上传实际数字</el-menu-item>
		  <el-menu-item index="1-3">上传预算</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-download"></i>
        <span slot="title">报表下载</span>
      </el-menu-item>
    </el-menu></el-aside>
    <el-main>

      
	</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  name: 'Main',
  props: {
    msg: String
  },
  methods:{
    //侧边栏方法
		handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
	margin: 0px;
}
.el-header {
	text-align: left;
	font-size: 1rem;
	font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
	background-color: #545C64;
	vertical-align: middle;
	color: #fff;
	line-height: 60px;
}
.el-aside {
	background-color:#545C64 ;
	height: 93.5vh;
}
.el-menu {
	width:200px;
}
</style>
