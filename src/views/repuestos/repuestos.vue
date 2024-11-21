<template>
  <LayoutMain>
      <template #slotLayout>
          <Header :titulo="'Repuestos'" :tituloBoton="'Crear Repuesto'" :abrir="abrirFormulario" />


          <Formulario :titulo="'Gestion de Repuesto'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
              @save="guardarDatos" @update="actualizarDatos">
              <template #slotForm>
                  <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <FormRepuestos v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                              :detalles="detalles" :dataValue="dataRepuestosById" />
                      </el-col>
                  </el-row>
              </template>

          </Formulario>

          <el-table :data="repuestos" stripe style="width: 100%">
              <el-table-column prop="nombre" label="Nombre" />
              <el-table-column prop="precio" label="Precio" />
              <el-table-column prop="registrodetalles_id" label="Detalle_id" />
              <el-table-column fixed="right" label="Acciones" min-width="120">
                  <template #default="registro">
                      <el-button link type="primary" size="large" :icon="Edit"
                          @click="editarFormulario(registro.row.id)">
                      </el-button>
                      <el-button link type="danger" :icon="Delete"
                          @click="eliminarRepuesto(registro.row.id)"></el-button>
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
import FormRepuestos from './components/formRepuestos.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios';


const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const dataRepuestosById = ref()
const detalles = ref([])
const repuestos = ref([])


const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
}

const editarFormulario = async (id) => {
  dataRepuestosById.value = await datosById(id)
  mostrarFormulario.value = true
  editandoFormulario.value = true
}

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await crearRepuesto()
  }
}

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await actualizarRepuesto()
  }
}

const crearRepuesto = async () => {

  const url = 'http://127.0.0.1:8000/api/repuestos/save'

  const dataFormulario = {
      nombre: formRef.value.formulario.nombre,
      precio: formRef.value.formulario.precio,
      registrodetalles_id: formRef.value.formulario.detalle
  }
  try {
      axios.post(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El repuesto se creó con exito    .',
                  type: 'success',
              })
              datosRepuesto()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear repuesto ', error)
  }
}

const actualizarRepuesto = async () => {


  const url = 'http://127.0.0.1:8000/api/repuestos/update'

  const dataFormulario = {
      id:dataRepuestosById.value[0].id,
      nombre: formRef.value.formulario.nombre,
      precio: formRef.value.formulario.precio,
      registrodetalles_id: formRef.value.formulario.detalle
  }
  try {
      axios.put(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El repuesto se actualizó con exito    .',
                  type: 'success',
              })
              datosRepuesto()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear repuesto ', error)
  }

}

const datosById = async (id) => {

  const url = 'http://127.0.0.1:8000/api/repuestos/datosById'

  try {
      const response = axios.get(url, {
          params: {
              id: id
          }
      })
      return (await response).data.result

  } catch (error) {
      console.error('error crear repuestos ', error)
  }

}
const eliminarRepuesto= async (id) => {

  const url = 'http://127.0.0.1:8000/api/repuestos/delete'

  ElMessageBox.confirm(
      'Esta seguro de eliminar el repuesto ',
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
                      datosRepuesto()

                  })
                  .catch(function (error) {
                      console.log(error);
                  });

          } catch (error) {
              console.error('error crear repuesto ', error)
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
const datosRepuesto = async () => {

  const url = 'http://127.0.0.1:8000/api/repuestos/datos'

  try {
      axios.get(url)
          .then(function (response) {
              repuestos.value = response.data.result
              console.log(response);

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear repuesto ', error)
  }


}
const getDetalles = async () => {

  const url = 'http://127.0.0.1:8000/api/detalle_repuestos/datos'

  try {
      axios.get(url)
          .then(function (response) {
              detalles.value = response.data.result
             // console.log(response);

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear detalles ', error)
  }




}

onMounted(() => {
  getDetalles()
  datosRepuesto()
})

</script>