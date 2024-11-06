
<template>
  <el-form
    ref="formRef"
    style="max-width: 100%"
    :model="formulario"
    :rules="rulesForm"
    label-width="auto"
    :size="formSize"
    status-icon
  >
    <el-form-item label="Telefono" prop="telefono">
      <el-input v-model="formulario.telefono" />
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model="formulario.email" />
    </el-form-item>
    <el-form-item label="Area" prop="area">
      <el-select v-model="formulario.area" placeholder="Seleccione un area">
        <el-option v-for="area in areas"
        :key="area.id"
        :label="area.nombre"
        :value="area.id"
        
        />
   
      </el-select>
    </el-form-item>

  </el-form>
</template>

<script setup>

import { reactive, ref } from 'vue'



const propiedad = defineProps({
  areas: {
    type:Array,
    required:true
  }
});

const formSize = ref('default')
const formRef = ref()
const formulario = reactive({
  telefono: '',
  email: '',
  area: '',

})


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





const limpiarFormulario =()=>{
    formRef.value.resetFields()    
}

const validarFormulario =  () => {

    return new Promise ((resolve)=>{
        formRef.value?.validate((valid)=>{
            if (valid) {
              resolve(true)            
            } else {
                resolve(false)             
            }
            
        })
        })        

    
}

defineExpose({validarFormulario,formulario,limpiarFormulario})




</script>




<style scoped>
</style>