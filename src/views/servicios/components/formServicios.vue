<template>
    <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
      :size="formSize" status-icon>
      <el-form-item label="Nombre de Servicio" prop="nombre_servicio">
        <el-input v-model="formulario.nombre_servicio" />
      </el-form-item>
      <el-form-item label="Precio de Servicio" prop="precio_servicio">
        <el-input  type="number" v-model="formulario.precio_servicio" />
      </el-form-item>
      <!-- <el-form-item label="Area" prop="area">
        <el-select v-model="formulario.area" placeholder="Seleccione un area">
          <el-option v-for="area in areas" :key="area.id" :label="area.nombre" :value="area.id" />
  
        </el-select>
      </el-form-item> -->
  
    </el-form>
  </template>
  
  <script setup>
  
  import { onMounted, reactive, ref, watch } from 'vue'
  
  const propiedad = defineProps({
    areas: {
      type: Array,
      required: true,
    },
    dataValue: Object,
  });
  
  const formSize = ref('default')
  const formRef = ref()
  const formulario = reactive({
    nombre_servicio: '',
    precio_servicio: '',
  
  })
  
  const datosFormulario = () => {
  
    formulario.nombre_servicio = propiedad.dataValue[0].nombre_servicio;
    formulario.precio_servicio = propiedad.dataValue[0].precio_servicio;
   /*  formulario.area = propiedad.dataValue[0].id_area; */
  
  }
  
  const rulesForm = reactive({
    nombre_servicio: [
      { required: true, message: 'Por favor ingrese el nombre del servicio', trigger: 'blur' }
    ],
    precio_servicio: [
      {
        required: true,
        message: 'Ingrese el precio del servicio',
        trigger: 'blur',
      },
    ],
  })
  
  const limpiarFormulario = () => {
    formRef.value.resetFields()
  }
  
  const validarFormulario = () => {
  
    return new Promise((resolve) => {
      formRef.value?.validate((valid) => {
        if (valid) {
                resolve(true)
              } else {
                  resolve(false)             
              }
              
          })
          })        
  
      
  }
  
  watch(
    () => propiedad.dataValue,
    (newData) => {
      datosFormulario();
    }
  );
  
  defineExpose({validarFormulario,formulario,limpiarFormulario})
  
  
  
  </script>
  
  
  
  
  <style scoped></style>