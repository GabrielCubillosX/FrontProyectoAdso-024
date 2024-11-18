<template>
    <LayoutMain>
        <template #slotLayout>
            <Header :titulo="'Servicios'" :tituloBoton="'Crear Servicio'" :abrir="abrirFormulario" />
  
  
            <Formulario :titulo="'Gestion de Servicios'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
                @save="guardarDatos" @update="actualizarDatos">
                <template #slotForm>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <FormServicios v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                                :areas="areas" :dataValue="dataServiciosById" />
                        </el-col>
                    </el-row>
                </template>
  
            </Formulario>
  
            <el-table :data="Servicios" stripe style="width: 100%">
                <el-table-column prop="nombre_servicio" label="Nombre del servicio" />
                <el-table-column prop="precio_servicio" label="Precio del servicio" />
                <!-- <el-table-column prop="id_area" label="Area" /> -->
                <el-table-column fixed="right" label="Acciones" min-width="120">
                    <template #default="registro">
                        <el-button link type="primary" size="large" :icon="Edit"
                            @click="editarFormulario(registro.row.id)">
                        </el-button>
                        <el-button link type="danger" :icon="Delete"
                            @click="eliminarServicio(registro.row.id)"></el-button>
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
  import FormServicios from './components/formServicios.vue';
  import { ElMessage, ElMessageBox } from 'element-plus'
  import axios from 'axios';
  
  
  const mostrarFormulario = ref(false)
  const editandoFormulario = ref(false)
  const formRef = ref()
  const dataServiciosById = ref()
/*   const areas = ref([]) */
  const Servicios = ref([])
  
  
  const abrirFormulario = () => {
    mostrarFormulario.value = true
    editandoFormulario.value = false
  }
  
  const editarFormulario = async (id) => {
    dataServiciosById.value = await datosById(id)
    mostrarFormulario.value = true
    editandoFormulario.value = true
  }
  
  const guardarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
        await crearServicio()
    }
  }
  
  const actualizarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
        await actualizarServicio()
    }
  }
  
  const crearServicio = async () => {
  
    const url = 'http://127.0.0.1:8000/api/servicios/save'
  
    const dataFormulario = {
        nombre_servicio: formRef.value.formulario.nombre_servicio,
        precio_servicio: parseInt(formRef.value.formulario.precio_servicio),
    /*     id_area: formRef.value.formulario.area */
    }
    try {
        axios.post(url, dataFormulario)
            .then(function (response) {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'El cargo se creó con exito    .',
                    type: 'success',
                })
                datosServicio()
                mostrarFormulario.value = false
  
            })
            .catch(function (error) {
                console.log(error);
            });
  
    } catch (error) {
        console.error('error crear servicio ', error)
    }
  }
  
  const actualizarServicio = async () => {
  
  
    const url = 'http://127.0.0.1:8000/api/servicios/update'
  
    const dataFormulario = {
        id:dataServiciosById.value[0].id,
        nombre_servicio: formRef.value.formulario.nombre_servicio,
        precio_servicio: parseInt(formRef.value.formulario.precio_servicio,)
   /*      id_area: formRef.value.formulario.area */
    }
    try {
        axios.put(url, dataFormulario)
            .then(function (response) {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'El servicio se actualizó con exito    .',
                    type: 'success',
                })
                datosServicio()
                mostrarFormulario.value = false
  
            })
            .catch(function (error) {
                console.log(error);
            });
  
    } catch (error) {
        console.error('error crear servicio ', error)
    }
  
  }
  
  const datosById = async (id) => {
  
    const url = 'http://127.0.0.1:8000/api/servicios/datosById'
  
    try {
        const response = axios.get(url, {
            params: {
                id: id
            }
        })
        return (await response).data.result
  
    } catch (error) {
        console.error('error crear cargo ', error)
    }
  
  }
  const eliminarServicio = async (id) => {
  
    const url = 'http://127.0.0.1:8000/api/servicios/delete'
  
    ElMessageBox.confirm(
        'Esta seguro de eliminar el cargo ',
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
                        datosServicio()
  
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
  
            } catch (error) {
                console.error('error crear mecanico ', error)
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
  const datosServicio = async () => {
  
    const url = 'http://127.0.0.1:8000/api/servicios/datos'
  
    try {
        axios.get(url)
            .then(function (response) {
                Servicios.value = response.data.result
               // console.log(response);
  
            })
            .catch(function (error) {
                console.log(error);
            });
  
    } catch (error) {
        console.error('error crear mecanico ', error)
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
        console.error('error crear mecanico ', error)
    }
  
  
  
  
  }
  
  onMounted(() => {
  /*   getAreas() */
    datosServicio()
  })
  </script>