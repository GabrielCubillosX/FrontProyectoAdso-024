<template>
    <LayoutMain>
        <template #slotLayout>
            <Header :titulo="'Mecanicos'" :tituloBoton="'Crear Mecanico'" :abrir="abrirFormulario" />
  
  
            <Formulario :titulo="'Gestion de Mecanicos'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
                @save="guardarDatos" @update="actualizarDatos">
                <template #slotForm>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <FormMecanicos v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                                :areas="areas" :dataValue="dataMecanicosById" />
                        </el-col>
                    </el-row>
                </template>
  
            </Formulario>
  
            <el-table :data="mecanicos" stripe style="width: 100%">
                <el-table-column prop="nombres" label="Nombres" />
                <el-table-column prop="apellidos" label="Apellidos" />
                <el-table-column prop="telefono" label="Telefono" />
                <el-table-column fixed="right" label="Acciones" min-width="120">
                    <template #default="registro">
                        <el-button link type="primary" size="large" :icon="Edit"
                            @click="editarFormulario(registro.row.id)">
                        </el-button>
                        <el-button link type="danger" :icon="Delete"
                            @click="eliminarMecanico(registro.row.id)"></el-button>
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
  import FormMecanicos from './components/formMecanicos.vue';
  import { ElMessage, ElMessageBox } from 'element-plus'
  import axios from 'axios';
  
  
  const mostrarFormulario = ref(false)
  const editandoFormulario = ref(false)
  const formRef = ref()
  const dataMecanicosById = ref()
  const areas = ref([])
  const mecanicos = ref([])
  
  
  const abrirFormulario = () => {
    mostrarFormulario.value = true
    editandoFormulario.value = false
  }
  
  const editarFormulario = async (id) => {
    dataMecanicosById.value = await datosById(id)
    mostrarFormulario.value = true
    editandoFormulario.value = true
  }
  
  const guardarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
        await crearMecanico()
    }
  }
  
  const actualizarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
        await actualizarMecanico()
    }
  }
  
  const crearMecanico = async () => {
  
    const url = 'http://127.0.0.1:8000/api/mecanicos/save'
  
    const dataFormulario = {
        nombres: formRef.value.formulario.nombres,
        apellidos: formRef.value.formulario.apellidos,
        telefono: formRef.value.formulario.telefono
    }
    try {
        axios.post(url, dataFormulario)
            .then(function (response) {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'El mecanico se creó con exito    .',
                    type: 'success',
                })
                datosMecanico()
                mostrarFormulario.value = false
  
            })
            .catch(function (error) {
                console.log(error);
            });
  
    } catch (error) {
        console.error('error crear mecanico ', error)
    }
  }
  
  const actualizarMecanico = async () => {
  
  
    const url = 'http://127.0.0.1:8000/api/mecanicos/update'
  
    const dataFormulario = {
        id:dataMecanicosById.value[0].id,
        nombres: formRef.value.formulario.nombres,
        apellidos: formRef.value.formulario.apellidos,
        telefono: formRef.value.formulario.telefono,
   /*      id_area: formRef.value.formulario.area */
    }
    try {
        axios.put(url, dataFormulario)
            .then(function (response) {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'El cargo se actualizó con exito    .',
                    type: 'success',
                })
                datosMecanico()
                mostrarFormulario.value = false
  
            })
            .catch(function (error) {
                console.log(error);
            });
  
    } catch (error) {
        console.error('error crear mecanico ', error)
    }
  
  }
  
  const datosById = async (id) => {
  
    const url = 'http://127.0.0.1:8000/api/mecanicos/datosById'
  
    try {
        const response = axios.get(url, {
            params: {
                id: id
            }
        })
        return (await response).data.result
  
    } catch (error) {
        console.error('error crear mecanico ', error)
    }
  
  }
  const eliminarMecanico = async (id) => {
  
    const url = 'http://127.0.0.1:8000/api/mecanicos/delete'
  
    ElMessageBox.confirm(
        'Esta seguro de eliminar el mecanico ',
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
                        datosMecanico()
  
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
  const datosMecanico = async () => {
  
    const url = 'http://127.0.0.1:8000/api/mecanicos/datos'
  
    try {
        axios.get(url)
            .then(function (response) {
                mecanicos.value = response.data.result
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
 
    datosMecanico()
  })
  </script>