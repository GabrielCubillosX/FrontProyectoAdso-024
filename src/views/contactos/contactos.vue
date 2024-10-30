<template>
  <LayoutMain>
    <template #slotLayout>
      <Header 
      :titulo="'Contactos'"
      :tituloBoton="'Crear Contacto'"
      :abrir="abrirFormulario"
      />
      

      <Formulario :titulo="'titulo del Formulario'" v-model:is-open="mostrarFormulario"  >

        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <formContactos   
            v-model:is-open="mostrarFormulario"  
          />
        </el-col>
      </el-row>
        </template>

      </Formulario>      

          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="name" label="Nombre" width="180" />
            <el-table-column prop="address" label="Direccion" width="180" />
            <el-table-column prop="phone" label="Telefono" />
            <el-table-column fixed="right" label="Acciones" min-width="120">
              <template #default>
                <el-button link type="primary" size="large" :icon="Edit" >                  
                </el-button>
                <el-button link type="danger" :icon="Delete" ></el-button>
              </template>
            </el-table-column>
          </el-table>
         
    </template>


    </LayoutMain>
  </template>
    
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import LayoutMain from '../../components/LayoutMain.vue';
  import  formContactos from './components/formContactos.vue'
  import Formulario from '../../components/Formulario.vue';
  import Header from '../../components/Header.vue';
  import  {Delete,Edit} from "@element-plus/icons-vue"

  const mostrarFormulario = ref(false)

  const abrirFormulario =()=>{
    mostrarFormulario.value=true
  }


  const tableData = [
  {
    name: '2Oscar',
    address: 'No. 189, Grove St, Los Angeles',
    phone: '311555',
  }
]
  </script>