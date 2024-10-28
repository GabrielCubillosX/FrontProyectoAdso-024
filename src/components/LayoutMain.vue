<script setup>
import NavBar from './NavBar.vue' 
import SideBar from './SideBar.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header><NavBar></NavBar></el-header>
      <el-container>
        <el-aside width="400px"><SideBar></SideBar></el-aside>
        <el-main>
          <slot name="slotLayout"> </slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style>
html, body{
    margin: 0px !important;
    padding: 0px !important;
    font-family: poppins;
}

.el-header{
  padding:0px;
}
</style>