<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
    :size="formSize" status-icon>
    <el-form-item label="Placa" prop="placa">
      <el-input v-model="formulario.placa" />
    </el-form-item>
    <el-form-item label="Marca Registro" prop="marca">
      <el-select v-model="formulario.marca" placeholder="Seleccione una marca">
        <el-option v-for="registro in registros" :key="registro.id" :label="registro.marca" :value="registro.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="Propietario" prop="propietario">
      <el-select v-model="formulario.propietario" placeholder="Seleccione un propietario">
        <el-option v-for="propietario in propietarios" :key="propietario.id" :label="propietario.nombres" :value="propietario.id" />
      </el-select>
    </el-form-item>

  </el-form>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'

const propiedad = defineProps({
  registros: {
    type: Array,
    required: true,
  },
  dataValue: Object,
  propietarios: {
    type: Array,
    required: true,
  },
  dataValue: Object,
});



const formSize = ref('default')
const formRef = ref()
const formulario = reactive({
  placa: '',
  marca: '',
  propietario: '',
})

const datosFormulario = () => {
  formulario.placa = propiedad.dataValue[0].placa;
  formulario.marca = propiedad.dataValue[0].marca_registro_id;
  formulario.propietario = propiedad.dataValue[0].propietario_id;
}

const rulesForm = reactive({
  placa: [
    { required: true, message: 'Por favor ingrese la placa del vehiculo', trigger: 'blur' }
  ],
  marca: [
    {
      required: true,
      message: 'Seleccione la marca',
      trigger: 'blur',
    },
  ],
  propietario: [
    {
      required: true,
      message: 'Seleccione un propietario',
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
