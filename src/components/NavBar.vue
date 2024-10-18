<template>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0">
        <img
          style="width: 100px"
          src=""
          alt="Element logo"
        />
      </el-menu-item>
      <el-sub-menu index="1">
        <template #title>Gabriel Cubillos</template>
        <el-menu-item index="2-1">Perfil</el-menu-item>
        <el-menu-item index="2-2">Cerrar Sesion</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const activeIndex = ref('1')
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  </script>
  
  <style>
  .el-menu--horizontal > .el-menu-item:nth-child(1) {
    margin-right: auto;
  }

 header, .el-menu--horizontal{
    background-color:rgb(0, 0, 0) ;
    font-family: poppins;
  }
  li.el-sub-menu > div{
    font-size: 17px;
  }
  .el-menu--horizontal>.el-sub-menu .el-sub-menu__title{
    color: aliceblue;
  }
  </style>