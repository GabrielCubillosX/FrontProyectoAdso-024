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

      <el-menu-item index="contactos">Contactos</el-menu-item>
      <el-menu-item index="mecanicos">Mecanicos</el-menu-item>
      <el-menu-item index="propietarios">Propietarios</el-menu-item>
      <el-menu-item index="servicios">Servicios</el-menu-item>
      <el-menu-item index="modeloauto">Modelo Vehiculos</el-menu-item>
      <el-menu-item index="detallerepuestos">Informacion Repuestos</el-menu-item>
      <el-menu-item index="repuestos">Repuestos</el-menu-item>
      <el-menu-item index="vehiculos">Vehiculos</el-menu-item>
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
border-bottom-right-radius: 20px;
}
</style>
