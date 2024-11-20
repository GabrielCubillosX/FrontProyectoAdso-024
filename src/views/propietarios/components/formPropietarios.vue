<template>
    <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
      :size="formSize" status-icon>
      <el-form-item label="Nombres" prop="nombres">
        <el-input v-model="formulario.nombres"  />
      </el-form-item>
      <el-form-item label="Apellidos" prop="apellidos">
          <el-input v-model="formulario.apellidos" />
        </el-form-item>
        <el-form-item label="Cedula" prop="cedula">
          <el-input v-model="formulario.cedula" @input="validarNumeros" />
        </el-form-item>
        <el-form-item label="Fecha Nacimiento" prop="fecha_nacimiento" @input="validarFecha">
            <el-input v-model="formulario.fecha_nacimiento" type="date" placeholder="Seleccione la fecha" />
        </el-form-item>
        <el-form-item label="Contacto" prop="contacto">
        <el-select v-model="formulario.contacto" placeholder="Seleccione un contacto">
          <el-option v-for="contacto in contactos" :key="contacto.id" :label="contacto.email" :value="contacto.id" />
        </el-select>
      </el-form-item> 
  
    </el-form>
  </template>
  
  <script setup>
  import { onMounted, reactive, ref, watch } from 'vue'
  
  const propiedad = defineProps({
    contactos: {
      type: Array,
      required: true,
    },
    dataValue: Object,
  });
  
  function validarNumeros() {
    formulario.cedula = formulario.cedula.replace(/[^0-9]/g, '');
    formulario.cedula = formulario.cedula.toString(); 
  }

  const formSize = ref('default')
  const formRef = ref()
  const formulario = reactive({
    nombres: '',
    apellidos: '',
    cedula: '',
    fecha_nacimiento: '',
    contacto: '',
  })
  
  const datosFormulario = () => {
    formulario.nombres = propiedad.dataValue[0].nombres;
    formulario.apellidos= propiedad.dataValue[0].apellidos;
    formulario.cedula= propiedad.dataValue[0].cedula;
    formulario.fecha_nacimiento= propiedad.dataValue[0].fecha_nacimiento;
    formulario.contacto = propiedad.dataValue[0].contactos_id;
  }
  
  const rulesForm = reactive({
    nombres: [
      { required: true, message: 'Por favor ingrese sus nombres', trigger: 'blur' }
    ],
    apellidos: [
        {
            required: true,
            message: 'Ingrese sus apellidos',
            trigger: 'blur',
        },
    ],

    cedula: [
      { required: true, message: 'Por favor ingrese sus numero de identificación', trigger: 'blur' }
    ],

    fecha_nacimiento: [
      { required: true, message: 'Por favor ingrese sus fecha de nacimiento', trigger: 'blur' }
    ],

    contacto: [
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
  