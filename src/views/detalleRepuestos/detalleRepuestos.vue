<template>
    <LayoutMain>
        <template #slotLayout>
            <Header :titulo="'Detalle de Repuestos'" :tituloBoton="'Crear Repuesto'" :abrir="abrirFormulario" />
  
  
            <Formulario :titulo="'Gestión de Repuestos'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
                @save="guardarDatos" @update="actualizarDatos">
                <template #slotForm>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <FormDetalleRepuestos v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                                :detalles="detalles" :dataValue="dataRepuestosById" />
                        </el-col>
                    </el-row>
                </template>
  
            </Formulario>
  
            <el-table :data="repuestos" stripe style="width: 100%">
                <el-table-column prop="modeloauto_repuesto" label="Modelo Auto Repuesto" />
                <el-table-column prop="marcaproveedor" label="Marca Proveedor" />
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
  import FormDetalleRepuestos from './components/formDetalleRepuestos.vue';
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
    const url = 'http://127.0.0.1:8000/api/detalle_repuestos/save'
  
    const dataFormulario = {
        modeloauto_repuesto: formRef.value.formulario.modeloauto_repuesto,
        marcaproveedor: formRef.value.formulario.marcaproveedor,
    }
    try {
        axios.post(url, dataFormulario)
            .then(function (response) {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'El repuesto se creó con éxito.',
                    type: 'success',
                })
                datosRepuestos()
                mostrarFormulario.value = false
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {
        console.error('Error crear repuesto', error)
    }
  }
  
  const actualizarRepuesto = async () => {
    const url = 'http://127.0.0.1:8000/api/detalle_repuestos/update'
  
    const dataFormulario = {
        id: dataRepuestosById.value[0].id,
        modeloauto_repuesto: formRef.value.formulario.modeloauto_repuesto,
        marcaproveedor: formRef.value.formulario.marcaproveedor,
    }
    try {
        axios.put(url, dataFormulario)
            .then(function (response) {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'El repuesto se actualizó con éxito.',
                    type: 'success',
                })
                datosRepuestos()
                mostrarFormulario.value = false
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {
        console.error('Error actualizar repuesto', error)
    }
  }
  
  const datosById = async (id) => {
    const url = 'http://127.0.0.1:8000/api/detalle_repuestos/datosById'
  
    try {
        const response = axios.get(url, {
            params: {
                id: id
            }
        })
        return (await response).data.result
    } catch (error) {
        console.error('Error obteniendo repuesto', error)
    }
  }
  
  const eliminarRepuesto = async (id) => {
    const url = 'http://127.0.0.1:8000/api/detalle_repuestos/delete'
  
    ElMessageBox.confirm(
        '¿Está seguro de eliminar este repuesto?',
        'Eliminar Registro',
        {
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar',
            type: 'error',
        }
    )
        .then(() => {
            try {
                axios.delete(url, { data: { id } })
                    .then(function (response) {
                        datosRepuestos()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } catch (error) {
                console.error('Error eliminando repuesto', error)
            }
            ElMessage({
                type: 'success',
                message: 'Repuesto eliminado correctamente',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Eliminación cancelada',
            })
        })
  }
  
  const datosRepuestos = async () => {
    const url = 'http://127.0.0.1:8000/api/detalle_repuestos/datos'
  
    try {
        axios.get(url)
            .then(function (response) {
                repuestos.value = response.data.result
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {
        console.error('Error obteniendo repuestos', error)
    }
  }
  
  const getDetalles = async () => {
    const url = 'http://127.0.0.1:8000/api/detalle_repuestos/datos'
  
    try {
        axios.get(url)
            .then(function (response) {
                detalles.value = response.data.result
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {
        console.error('Error obteniendo detalles', error)
    }
  }
  
  onMounted(() => {
    getDetalles()
    datosRepuestos()
  })
  </script>
  