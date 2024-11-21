<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
    :size="formSize" status-icon>
    <el-form-item label="Nombre" prop="nombre">
      <el-input v-model="formulario.nombre"  />
    </el-form-item>
    <el-form-item label="Precio" prop="precio" @input="validarNumeros">
      <el-input v-model="formulario.precio" />
    </el-form-item>
    <el-form-item label="Detalles" prop="detalle">
      <el-select v-model="formulario.detalle" placeholder="Seleccione un detalle">
        <el-option v-for="detalle in detalles" :key="detalle.id" :label="detalle.modeloauto_repuesto" :value="detalle.id" />
      </el-select>
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

function validarNumeros() {
  formulario.precio = formulario.precio.replace(/[^0-9]/g, '');

}

const formSize = ref('default')
const formRef = ref()
const formulario = reactive({
  nombre: '',
  precio: '',
  detalle: '',
})

const datosFormulario = () => {
  formulario.nombre = propiedad.dataValue[0].nombre;
  formulario.precio = propiedad.dataValue[0].precio;
  formulario.detalle = propiedad.dataValue[0].registrodetalles_id;
}

const rulesForm = reactive({
  nombre: [
    { required: true, message: 'Por favor ingrese el nombre', trigger: 'blur' }
  ],
  precio: [
    {
      required: true,
      message: 'Ingrese el precio',
      trigger: 'blur',
    },
  ],
  detalle: [
    {
      required: true,
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
