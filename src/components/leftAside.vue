<template>
  <el-menu
      :default-active=activeValue
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
	  router>
    <div class="leftAsideTitle">
      <i class="el-icon-s-finance"></i>
      财务报表
      </div>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-upload2"></i>
          <span>文件上传</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="basic">上传基础表</el-menu-item>
          <el-menu-item index="really">上传实际数字表</el-menu-item>
		  <el-menu-item index="budget">上传预算表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="reportDownload">
        <i class="el-icon-download"></i>
        <span slot="title">报表下载</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    name: "leftAside",
    props:{
        activeValue:{
            type: String,
            default(){
                return "";
            }
        }
    },
    methods: {
      //侧边栏方法
		handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    }
}
</script>

<style>
.leftAsideTitle {
  font-size: 20px;
  color: #fff;
  margin: 10px auto;
}
.el-menu {
	width:200px;
}
.el-submen {
  width: 200px;
}
.el-menu-item {
  width:200px;
}
</style>