<template>
<div class="container_header" v-if="isVisible">
<h2>modulo de {{titulo}}</h2>
<el-row justify="center" align="middle">
<el-button type="primary">Cancelar</el-button>
<el-button type="primary">Guardar</el-button>

</el-row>
<slot name="slotForm"> 

</slot>

</div>
</template>

<script setup>
import {computed,ref} from 'vue';
const propiedad =defineProps({
    titulo:String,
    mostrar:Boolean
})

const isVisible = computed(()=>propiedad.mostrar)
</script>

<style scoped>
</style>