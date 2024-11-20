<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
    :size="formSize" status-icon>
    <el-form-item label="Modelo de Auto Repuesto" prop="modeloauto_repuesto">
      <el-input v-model="formulario.modeloauto_repuesto" />
    </el-form-item>
    <el-form-item label="Marca del Proveedor" prop="marcaproveedor">
      <el-input v-model="formulario.marcaproveedor" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'

const propiedad = defineProps({
  detalles: {
    type: Array,
    required: true,
  },
  dataValue: Object,
});

const formSize = ref('default')
const formRef = ref()
const formulario = reactive({
  modeloauto_repuesto: '',
  marcaproveedor: '',
})

const datosFormulario = () => {
  formulario.modeloauto_repuesto = propiedad.dataValue[0].modeloauto_repuesto;
  formulario.marcaproveedor = propiedad.dataValue[0].marcaproveedor;
}

const rulesForm = reactive({
  modeloauto_repuesto: [
    { required: true, message: 'Por favor ingrese el modelo del auto repuesto', trigger: 'blur' }
  ],
  marcaproveedor: [
    {
      required: true,
      message: 'Ingrese la marca del proveedor',
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

defineExpose({ validarFormulario, formulario, limpiarFormulario })
</script>

<style scoped></style>
