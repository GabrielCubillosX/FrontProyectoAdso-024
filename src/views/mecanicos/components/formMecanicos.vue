<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
    :size="formSize" status-icon>
    <el-form-item label="Nombres" prop="nombres">
      <el-input v-model="formulario.nombres" />
    </el-form-item>
    <el-form-item label="Apellidos" prop="apellidos">
      <el-input v-model="formulario.apellidos" />
    </el-form-item>
    <el-form-item label="Telefono" prop="telefono">
      <el-input v-model="formulario.telefono" @input="validarNumeros" />
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
  nombres: '',
  apellidos: '',
  telefono: '',
})

const datosFormulario = () => {
  formulario.nombres = propiedad.dataValue[0].nombres;
  formulario.apellidos = propiedad.dataValue[0].apellidos;
  formulario.telefono = propiedad.dataValue[0].telefono;
}

const rulesForm = reactive({
  nombres: [
    { required: true, message: 'Por favor ingrese el Nombre', trigger: 'blur' }
  ],
  apellidos: [
    {
      required: true,
      message: 'Ingrese el Apellido',
      trigger: 'blur',
    },
  ],
  telefono: [
    {
      required: true,
      message: 'Ingrese el Telefono',
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


const validarNumeros = () => {
  formulario.telefono = formulario.telefono.replace(/[^0-9]/g, '');  
  formulario.telefono = formulario.telefono.toString(); 
}

watch(
  () => propiedad.dataValue,
  (newData) => {
    datosFormulario();
  }
);

defineExpose({ validarFormulario, formulario, limpiarFormulario })
</script>

<style scoped></style>
