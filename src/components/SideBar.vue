<template>

  <el-menu
  :default-active="$route.path"
  router
    class="el-menu-vertical-demo"
    background-color="#242629"
    text-color="#fff"
    collapse-transition
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Administrador</span>
      </template>

      <el-menu-item index="personas">Personas</el-menu-item>
      <el-menu-item index="contactos">Contactos</el-menu-item>
      <el-menu-item index="pais">Paises</el-menu-item>
    </el-sub-menu>

  </el-menu>
</template>

<script lang="ts" setup>
import {Location} from '@element-plus/icons-vue';
</script>

<style scoped>
html, body {
margin: 0;
padding: 0;
/* height: 100%; */
}



.el-menu-vertical-demo {
width: 250px;
min-height: 100%;
}
</style>
