<template>
  <LayoutMain>
      <template #slotLayout>
          <Header :titulo="'Contactos'" :tituloBoton="'Crear Contacto'" :abrir="abrirFormulario" />


          <Formulario :titulo="'Gestion de Contactos'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
              @save="guardarDatos" @update="actualizarDatos">
              <template #slotForm>
                  <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <FormContactos v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                              :areas="areas" :dataValue="dataContactosById" />
                      </el-col>
                  </el-row>
              </template>

          </Formulario>

          <el-table :data="contactos" stripe style="width: 100%">
              <el-table-column prop="telefono" label="Telefono" />
              <el-table-column prop="email" label="Email" />
           <!--    <el-table-column prop="id_area" label="Area" /> -->
              <el-table-column fixed="right" label="Acciones" min-width="120">
                  <template #default="registro">
                      <el-button link type="primary" size="large" :icon="Edit"
                          @click="editarFormulario(registro.row.id)">
                      </el-button>
                      <el-button link type="danger" :icon="Delete"
                          @click="eliminarContacto(registro.row.id)"></el-button>
                  </template>
              </el-table-column>
          </el-table>

      </template>


  </LayoutMain>
</template>


<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import LayoutMain from '../../components/LayoutMain.vue';
import Formulario from '../../components/Formulario.vue';
import Header from '../../components/Header.vue';
import { Delete, Edit } from "@element-plus/icons-vue"
import FormContactos from './components/formContactos.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios';


const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const dataContactosById = ref()
const areas = ref([])
const contactos = ref([])


const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
}

const editarFormulario = async (id) => {
  dataContactosById.value = await datosById(id)
  mostrarFormulario.value = true
  editandoFormulario.value = true
}

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await crearContacto()
  }
}

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await actualizarContacto()
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
                  message: 'El contacto se creó con exito    .',
                  type: 'success',
              })
              datosContacto()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear contacto ', error)
  }
}

const actualizarContacto = async () => {


  const url = 'http://127.0.0.1:8000/api/d_contactos/update'

  const dataFormulario = {
      id:dataContactosById.value[0].id,
      telefono: formRef.value.formulario.telefono,
      email: formRef.value.formulario.email,
 /*      id_area: formRef.value.formulario.area */
  }
  try {
      axios.put(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El contacto se actualizó con exito    .',
                  type: 'success',
              })
              datosContacto()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear contacto ', error)
  }

}

const datosById = async (id) => {

  const url = 'http://127.0.0.1:8000/api/d_contactos/datosById'

  try {
      const response = axios.get(url, {
          params: {
              id: id
          }
      })
      return (await response).data.result

  } catch (error) {
      console.error('error crear contacto ', error)
  }

}
const eliminarContacto = async (id) => {

  const url = 'http://127.0.0.1:8000/api/d_contactos/delete'

  ElMessageBox.confirm(
      'Esta seguro de eliminar el contacto ',
      'Eliminar Registro',
      {
          confirmButtonText: 'SI',
          cancelButtonText: 'Cancelar',
          type: 'error',
      }
  )
      .then(() => {

          try {
              axios.delete(url, { data: { id } })
                  .then(function (response) {
                      datosContacto()

                  })
                  .catch(function (error) {
                      console.log(error);
                  });

          } catch (error) {
              console.error('error crear contacto ', error)
          }
          ElMessage({
              type: 'success',
              message: 'Se eliminó correctamente el registro',
          })
      })
      .catch(() => {
          ElMessage({
              type: 'info',
              message: 'Eliminacion cancelada',
          })
      })

}
const datosContacto = async () => {

  const url = 'http://127.0.0.1:8000/api/d_contactos/datos'

  try {
      axios.get(url)
          .then(function (response) {
              contactos.value = response.data.result
             // console.log(response);

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear contacto ', error)
  }


}
const getAreas = async () => {

  const url = 'http://127.0.0.1:8000/api/areas/datos'

  try {
      axios.get(url)
          .then(function (response) {
              areas.value = response.data.result
             // console.log(response);

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear contacto ', error)
  }




}

onMounted(() => {
/*   getAreas() */
  datosContacto()
})

</script>