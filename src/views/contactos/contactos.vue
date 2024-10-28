<template>
  <LayoutMain>
<template #slotLayout>
<Header 

:titulo="'Contactos'"
:tituloBoton="'Crear contactos'"
:abrir="abrirFormulario"
>
</Header>

<Formulario :titulo="'Titulo form'" v-model:mostrar="mostrarFormulario" >

  <template #slotForm>
   <formContactos/>
  </template>
</Formulario>

<div>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="name" label="Nombre" width="180" />
    <el-table-column prop="address" label="Direccion" width="180" />
    <el-table-column prop="phone" label="Telefono" />
    <el-table-column fixed="right" label="Opciones" min-width="120">
  
  <template #default>
        <el-button link type="primary" size="large" @click="" :icon="EditPen">
        </el-button>
        <el-button link type="danger" :icon="Delete"></el-button>
      </template>
      </el-table-column>
    </el-table>
</div>

</template>

    </LayoutMain>
  </template>
  

  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import LayoutMain from '../../components/LayoutMain.vue';
  import Header from '../../components/Header.vue';
  import {Delete,EditPen} from "@element-plus/icons-vue"
  import Formulario from '../../components/Formulario.vue';
  import formContactos from './components/formContactos.vue' 

  const mostrarFormulario =ref(false)
  const mostrarHeader =ref(false)

  const abrirFormulario = ()=> {
  mostrarFormulario.value=true
  mostrarHeader.value=false
  }
  const cerrarFormulario = ()=> {
  mostrarFormulario.value=false
  mostrarHeader.value=true
  }

  const tableData = [
  {
    name: 'Gabriel',
    phone: '12345',
    address: 'No. 189, Grove St, Los Angeles',
  },
  
]
  </script>