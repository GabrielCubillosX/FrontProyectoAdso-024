<template>
  <LayoutMain>
      <template #slotLayout>
          <Header :titulo="'Contacto'" :tituloBoton="'Crear Contacto'" :abrir="abrirFormulario" />


          <Formulario :titulo="'Gestion de Contactos'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
              @save="guardarDatos">
              <template #slotForm>
                  <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <FormContactos v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                              :areas="areas" />
                      </el-col>
                  </el-row>
              </template>

          </Formulario>

          <el-table :data="Contactos" stripe style="width: 100%" >
              <el-table-column prop="telefono" label="Telefono"  />
              <el-table-column prop="email" label="Email"  />      
              <el-table-column prop="id_area" label="Area"  />      
              <el-table-column fixed="right" label="Acciones" min-width="120">
                  <template #default>
                      <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario">
                      </el-button>
                      <el-button link type="danger" :icon="Delete"></el-button>
                  </template>
              </el-table-column>
          </el-table>

      </template>


  </LayoutMain>
</template>


<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import LayoutMain from '../../components/LayoutMain.vue';
import Formulario from '../../components/Formulario.vue';
import Header from '../../components/Header.vue';
import { Delete, Edit } from "@element-plus/icons-vue"
import FormContactos from './components/formContactos.vue';
import { ElMessage } from 'element-plus'
import axios from 'axios';


const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const areas = ref([])
const Contactos = ref([])


const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
}

const editarFormulario = async () => {
  mostrarFormulario.value = true
  editandoFormulario.value = true
}

const tableData = [
  {
      name: '2Oscar',
      address: 'No. 189, Grove St, Los Angeles',
      phone: '311555',
  }
]


const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await crearContacto()
  }

}

const crearContacto = async () => {

  const url = 'http://127.0.0.1:8000/api/d_contactos/save'

  const dataFormulario = {
      telefono: formRef.value.formulario.telefono,
      email: formRef.value.formulario.email,
      id_area: formRef.value.formulario.area
  }
  try {
      axios.post(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El Contacto se creo con exito    .',
                  type: 'success',
              })
              datosContacto()
              mostrarFormulario.value = false
              
          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear Contacto ', error)
  }





}
const actualizarContacto = async () => {

  console.log('se actualizo el Contacto');

}
const eliminarContacto = async () => {

  console.log('se elimino el Contacto');

}
const datosContacto = async () => {

  const url = 'http://127.0.0.1:8000/api/d_contactos/datos'

try {
  axios.get(url)
      .then(function (response) {
          Contactos.value = response.data.result
          console.log(response);

      })
      .catch(function (error) {
          console.log(error);
      });

} catch (error) {
  console.error('error crear Contacto ', error)
}


}
const getAreas = async () => {

  const url = 'http://127.0.0.1:8000/api/areas/datos'

  try {
      axios.get(url)
          .then(function (response) {
              areas.value = response.data.result
              console.log(response);

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear Contacto ', error)
  }




}

onMounted(() => {
  /* getAreas() */
  datosContacto()
})

</script>