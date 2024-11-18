<template>
    <LayoutMain>
      <template #slotLayout>
        <Header :titulo="'Automóviles'" :tituloBoton="'Crear Automóvil'" :abrir="abrirFormulario" />
  
        <Formulario :titulo="'Gestión de Automóviles'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
            @save="guardarDatos" @update="actualizarDatos">
          <template #slotForm>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <FormModeloAuto v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                    :areas="areas" :dataValue="dataAutoById" />
              </el-col>
            </el-row>
          </template>
        </Formulario>
  
        <el-table :data="autos" stripe style="width: 100%">
          <el-table-column prop="marca" label="Marca" />
          <el-table-column prop="modelo" label="Modelo" />
          <el-table-column prop="modelo_year" label="Año del Modelo" />
          <el-table-column fixed="right" label="Acciones" min-width="120">
            <template #default="registro">
              <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario(registro.row.id)">
              </el-button>
              <el-button link type="danger" :icon="Delete" @click="eliminarAuto(registro.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </LayoutMain>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import LayoutMain from '../../components/LayoutMain.vue';
  import Formulario from '../../components/Formulario.vue';
  import Header from '../../components/Header.vue';
  import { Delete, Edit } from "@element-plus/icons-vue";
  import FormModeloAuto from './components/formModeloAuto.vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import axios from 'axios';
  
  const mostrarFormulario = ref(false);
  const editandoFormulario = ref(false);
  const formRef = ref();
  const dataAutoById = ref();
  const autos = ref([]);
  
  const abrirFormulario = () => {
    mostrarFormulario.value = true;
    editandoFormulario.value = false;
  };
  
  const editarFormulario = async (id) => {
    dataAutoById.value = await datosById(id);
    mostrarFormulario.value = true;
    editandoFormulario.value = true;
  };
  
  const guardarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario();
    if (validacion) {
      await crearAuto();
    }
  };
  
  const actualizarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario();
    if (validacion) {
      await actualizarAuto();
    }
  };
  
  const crearAuto = async () => {
    const url = 'http://127.0.0.1:8000/api/modelos_autos/save';
  
    const dataFormulario = {
      marca: formRef.value.formulario.marca,
      modelo: formRef.value.formulario.modelo,
      modelo_year: formRef.value.formulario.modelo_year
    };
  
    try {
      await axios.post(url, dataFormulario);
      formRef.value?.limpiarFormulario();
      ElMessage({ message: 'El automóvil se creó con éxito.', type: 'success' });
      datosAuto();
      mostrarFormulario.value = false;
    } catch (error) {
      console.error('Error al crear automóvil:', error);
    }
  };
  
  const actualizarAuto = async () => {
    const url = 'http://127.0.0.1:8000/api/modelos_autos/update';
  
    const dataFormulario = {
      id: dataAutoById.value[0].id,
      marca: formRef.value.formulario.marca,
      modelo: formRef.value.formulario.modelo,
      modelo_year: formRef.value.formulario.modelo_year
    };
  
    try {
      await axios.put(url, dataFormulario);
      formRef.value?.limpiarFormulario();
      ElMessage({ message: 'El automóvil se actualizó con éxito.', type: 'success' });
      datosAuto();
      mostrarFormulario.value = false;
    } catch (error) {
      console.error('Error al actualizar automóvil:', error);
    }
  };
  
  const datosById = async (id) => {
    const url = 'http://127.0.0.1:8000/api/modelos_autos/datosById';
  
    try {
      const response = await axios.get(url, { params: { id } });
      return response.data.result;
    } catch (error) {
      console.error('Error al obtener datos del automóvil:', error);
    }
  };
  
  const eliminarAuto = async (id) => {
    const url = 'http://127.0.0.1:8000/api/modelos_autos/delete';
  
    ElMessageBox.confirm(
      '¿Está seguro de eliminar este automóvil?',
      'Eliminar Registro',
      {
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar',
        type: 'error',
      }
    )
      .then(async () => {
        try {
          await axios.delete(url, { data: { id } });
          datosAuto();
          ElMessage({ type: 'success', message: 'Se eliminó correctamente el registro' });
        } catch (error) {
          console.error('Error al eliminar automóvil:', error);
        }
      })
      .catch(() => {
        ElMessage({ type: 'info', message: 'Eliminación cancelada' });
      });
  };
  
  const datosAuto = async () => {
    const url = 'http://127.0.0.1:8000/api/modelos_autos/datos';
  
    try {
      const response = await axios.get(url);
      autos.value = response.data.result;
    } catch (error) {
      console.error('Error al obtener datos de automóviles:', error);
    }
  };
  
  onMounted(() => {
    datosAuto();
  });
  </script>
  