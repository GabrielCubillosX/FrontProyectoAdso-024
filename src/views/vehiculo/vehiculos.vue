<template>
  <LayoutMain>
      <template #slotLayout>
          <Header :titulo="'Vehiculos'" :tituloBoton="'Crear Vehiculo'" :abrir="abrirFormulario" />


          <Formulario :titulo="'Gestion de Vehiculos'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
              @save="guardarDatos" @update="actualizarDatos">
              <template #slotForm>
                  <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <FormVehiculos v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                              :propietarios="propietarios" :registros="registros" :dataValue="dataVehiculosById" />
                      </el-col>
                  </el-row>
              </template>

          </Formulario>

          <el-table :data="vehiculos" stripe style="width: 100%">
              <el-table-column prop="placa" label="Placa" />
              <el-table-column prop="propietario_id" label="Propietario_id" />
              <el-table-column prop="marca_registro_id" label="Marca_id" />
              <el-table-column fixed="right" label="Acciones" min-width="120">
                  <template #default="registro">
                      <el-button link type="primary" size="large" :icon="Edit"
                          @click="editarFormulario(registro.row.id)">
                      </el-button>
                      <el-button link type="danger" :icon="Delete"
                          @click="eliminarVehiculo(registro.row.id)"></el-button>
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
import FormVehiculos from './components/formVehiculos.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios';


const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const dataVehiculosById = ref()
const registros = ref([])
const propietarios = ref([])
const vehiculos = ref([])


const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
}

const editarFormulario = async (id) => {
  dataVehiculosById.value = await datosById(id)
  mostrarFormulario.value = true
  editandoFormulario.value = true
}

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await crearVehiculo()
  }
}

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await actualizarVehiculo()
  }
}

const crearVehiculo = async () => {

  const url = 'http://127.0.0.1:8000/api/vehiculos/save'

  const dataFormulario = {
      placa: formRef.value.formulario.placa,
      propietario_id: formRef.value.formulario.propietario,
      marca_registro_id: formRef.value.formulario.marca
  }
  try {
      axios.post(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El vehiculo se creó con exito    .',
                  type: 'success',
              })
              datosVehiculo()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear vehiculo ', error)
  }
}

const actualizarVehiculo = async () => {


  const url = 'http://127.0.0.1:8000/api/vehiculos/update'

  const dataFormulario = {
      id:dataVehiculosById.value[0].id,
      placa: formRef.value.formulario.placa,
      propietario_id: formRef.value.formulario.propietario,
      marca_registro_id: formRef.value.formulario.marca
  }
  try {
      axios.put(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El Vehiculo se actualizó con exito    .',
                  type: 'success',
              })
              datosVehiculo()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear vehiculo ', error)
  }

}

const datosById = async (id) => {

  const url = 'http://127.0.0.1:8000/api/vehiculos/datosById'

  try {
      const response = axios.get(url, {
          params: {
              id: id
          }
      })
      return (await response).data.result

  } catch (error) {
      console.error('error crear vehiculo ', error)
  }

}
const eliminarVehiculo = async (id) => {

  const url = 'http://127.0.0.1:8000/api/vehiculos/delete'

  ElMessageBox.confirm(
      'Esta seguro de eliminar el vehiculo ',
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
                      datosVehiculo()

                  })
                  .catch(function (error) {
                      console.log(error);
                  });

          } catch (error) {
              console.error('error crear vehiculo ', error)
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
const datosVehiculo = async () => {

  const url = 'http://127.0.0.1:8000/api/vehiculos/datos'

  try {
      axios.get(url)
          .then(function (response) {
              vehiculos.value = response.data.result
             // console.log(response);

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear vehiculo ', error)
  }


}
const getMarcas = async () => {

  const url = 'http://127.0.0.1:8000/api/modelos_autos/datos'

  try {
      axios.get(url)
          .then(function (response) {
              registros.value = response.data.result
             // console.log(response);

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear vehiculo ', error)
  }




}
const getPropietarios = async () => {

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
      console.error('error crear vehiculo ', error)
  }




}

onMounted(() => {
  getMarcas()
  getPropietarios()
  datosVehiculo()
})

</script>