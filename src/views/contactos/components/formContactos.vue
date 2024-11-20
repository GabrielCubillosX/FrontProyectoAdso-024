<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
    :size="formSize" status-icon>
    <el-form-item label="Telfono" prop="telefono">
      <el-input v-model="formulario.telefono" @input="validarNumeros" />
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model="formulario.email" />
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

function validarNumeros() {
  formulario.telefono = formulario.telefono.replace(/[^0-9]/g, '');
  formulario.telefono = formulario.telefono.toString(); 
}

const formSize = ref('default')
const formRef = ref()
const formulario = reactive({
  telefono: '',
  email: '',
  area: '',
})

const datosFormulario = () => {
  formulario.telefono = propiedad.dataValue[0].telefono;
  formulario.email = propiedad.dataValue[0].email;
  formulario.area = propiedad.dataValue[0].id_area;
}

const rulesForm = reactive({
  telefono: [
    { required: true, message: 'Por favor ingrese el telefono', trigger: 'blur' }
  ],
  email: [
    {
      required: true,
      message: 'Ingrese el email',
      trigger: 'blur',
    },
  ],
  area: [
    {
      required: false,
      message: 'Seleccione un valor',
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
