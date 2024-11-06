
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
    <el-form-item label="Nombre" prop="nombre">
      <el-input v-model="formulario.nombre" />
    </el-form-item>
    <el-form-item label="Salario" prop="salario">
      <el-input v-model="formulario.salario" />
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
  nombre: '',
  salario: '',
  area: '',

})


const rulesForm = reactive({
  nombre: [
    { required: true, message: 'Por favor ingrese el nombre', trigger: 'blur' }
  ],
  salario: [
    {
      required: true,
      message: 'Ingrese el salario',
      trigger: 'blur',
    },
  ],
  area: [
    {
      required: true,
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