<template>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color= #a4daf5
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0">
        <img
          style="width: 55px"
          src="https://cdn.worldvectorlogo.com/logos/volkswagen-10.svg"
          alt="Taller Volkswagen"
        />
        <h1 style="margin-left: 10px;">Taller Volkswagen</h1>
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
    font-family: poppins;
  }
  li.el-sub-menu > div{
    font-size: 17px;
  }

  #app > section > header > ul{
    border-bottom-right-radius: 20px;
  }
  </style>