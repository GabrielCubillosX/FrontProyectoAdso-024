<template>
    <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
      :size="formSize" status-icon>
      <el-form-item label="Marca" prop="marca">
        <el-input v-model="formulario.marca" />
      </el-form-item>
      <el-form-item label="Modelo" prop="modelo">
        <el-input v-model="formulario.modelo" />
      </el-form-item>
      <el-form-item label="Año del Modelo" prop="modelo_year">
        <el-input v-model="formulario.modelo_year" @input="validarNumeros" />
      </el-form-item>
    </el-form>
  </template>
  
  <script setup>
  import { reactive, ref, watch } from 'vue'
  
  const propiedad = defineProps({
    dataValue: Object,
  });
  
  const formSize = ref('default')
  const formRef = ref()
  const formulario = reactive({
    marca: '',
    modelo: '',
    modelo_year: '',
  })
  
  const datosFormulario = () => {
    formulario.marca = propiedad.dataValue?.marca || '';
    formulario.modelo = propiedad.dataValue?.modelo || '';
    formulario.modelo_year = propiedad.dataValue?.modelo_year || '';
  }
  
  const rulesForm = reactive({
    marca: [
      { required: true, message: 'Por favor ingrese la Marca', trigger: 'blur' }
    ],
    modelo: [
      { required: true, message: 'Ingrese el Modelo', trigger: 'blur' }
    ],
    modelo_year: [
      { required: true, message: 'Ingrese el Año del Modelo', trigger: 'blur' }
    ],
  })
  
  const limpiarFormulario = () => {
    formRef.value.resetFields()
  }
  
  const validarFormulario = () => {
    return new Promise((resolve) => {
      formRef.value?.validate((valid) => {
        resolve(valid);
      });
    });
  }
  

  const validarNumeros = () => {
    formulario.modelo_year = formulario.modelo_year.replace(/[^0-9]/g, '');
    formulario.modelo_year = formulario.modelo_year.toString(); 
  }
  
  watch(
    () => propiedad.dataValue,
    () => {
      datosFormulario();
    }
  );
  
  defineExpose({ validarFormulario, formulario, limpiarFormulario })
  </script>
  
  <style scoped></style>
  