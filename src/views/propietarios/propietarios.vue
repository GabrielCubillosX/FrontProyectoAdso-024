<template>
  <LayoutMain>
      <template #slotLayout>
          <Header :titulo="'Propietarios'" :tituloBoton="'Crear Propietario'" :abrir="abrirFormulario" />


          <Formulario :titulo="'Gestion de Propietarios'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
              @save="guardarDatos" @update="actualizarDatos">
              <template #slotForm>
                  <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <FormPropietarios v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                              :contactos="contactos" :dataValue="dataPropietariosById" />
                      </el-col>
                  </el-row>
              </template>

          </Formulario>

          <el-table :data="propietarios" stripe style="width: 100%">
              <el-table-column prop="nombres" label="Nombres" />
              <el-table-column prop="apellidos" label="Apellidos" />
              <el-table-column prop="cedula" label="Cedula" />
              <el-table-column prop="fecha_nacimiento" label="Fecha de Nacimiento" />
              <el-table-column prop="contactos_id" label="Contacto_id" />
              <el-table-column fixed="right" label="Acciones" min-width="120">
                  <template #default="registro">
                      <el-button link type="primary" size="large" :icon="Edit"
                          @click="editarFormulario(registro.row.id)">
                      </el-button>
                      <el-button link type="danger" :icon="Delete"
                          @click="eliminarPropietario(registro.row.id)"></el-button>
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
import FormPropietarios from './components/formPropietarios.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios';


const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const dataPropietariosById = ref()
const contactos = ref([])
const propietarios = ref([])


const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
}

const editarFormulario = async (id) => {
  dataPropietariosById.value = await datosById(id)
  mostrarFormulario.value = true
  editandoFormulario.value = true
}

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await crearPropietario()
  }
}

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await actualizarPropietario()
  }
}

const crearPropietario = async () => {

  const url = 'http://127.0.0.1:8000/api/propietarios/save'

  const dataFormulario = {
      nombres: formRef.value.formulario.nombres,
      apellidos: formRef.value.formulario.apellidos,
      cedula: formRef.value.formulario.cedula,
      fecha_nacimiento: formRef.value.formulario.fecha_nacimiento,
      contactos_id: formRef.value.formulario.contacto
  }
  try {
      axios.post(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El propietario se creó con exito    .',
                  type: 'success',
              })
              datosPropietario()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear propietario ', error)
  }
}

const actualizarPropietario = async () => {


  const url = 'http://127.0.0.1:8000/api/propietarios/update'

  const dataFormulario = {
      id:dataPropietariosById.value[0].id,
      nombres: formRef.value.formulario.nombres,
      apellidos: formRef.value.formulario.apellidos,
      cedula: formRef.value.formulario.cedula,
      fecha_nacimiento: formRef.value.formulario.fecha_nacimiento,
      contactos_id: formRef.value.formulario.contacto
  }
  try {
      axios.put(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El propietario se actualizó con exito    .',
                  type: 'success',
              })
              datosPropietario()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear propietario ', error)
  }

}

const datosById = async (id) => {

  const url = 'http://127.0.0.1:8000/api/propietarios/datosById'

  try {
      const response = axios.get(url, {
          params: {
              id: id
          }
      })
      return (await response).data.result

  } catch (error) {
      console.error('error crear propietario ', error)
  }

}
const eliminarPropietario = async (id) => {

  const url = 'http://127.0.0.1:8000/api/propietarios/delete'

  ElMessageBox.confirm(
      'Esta seguro de eliminar el propietario ',
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
                      datosPropietario()

                  })
                  .catch(function (error) {
                      console.log(error);
                  });

          } catch (error) {
              console.error('error crear propietario ', error)
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
const datosPropietario = async () => {

  const url = 'http://127.0.0.1:8000/api/propietarios/datos'

  try {
      axios.get(url)
          .then(function (response) {
              propietarios.value = response.data.result
             // console.log(response);

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear propietario ', error)
  }


}
const getContactos = async () => {

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
      console.error('error crear propietario ', error)
  }




}

onMounted(() => {
  getContactos()
  datosPropietario()
})

</script>