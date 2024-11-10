<template>
    <div class="container">
    
        <div class="container_header">
<h2 class="container_title">Modulo de {{titulo}}</h2>
<el-row justify="center" align="middle">

    <el-button type="primary" @click="abrir" class="padded-button">{{tituloBoton}}</el-button>

</el-row>
        </div>
    </div>
</template>


<script setup>

defineProps({
    titulo: {type:String,required:true},
    tituloBoton: {type: String, required:true},

    abrir:{
        type:Function,
        required: true
    }
})


</script>



<style scoped>
.container{
    margin-bottom: 10px;
}

.container_header{
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid white;
}

.padded-button{
    padding: 20px;
    background-color: rgb(255, 79, 10);
    border: none;
    color: white;
}
.padded-button:hover{
    padding: 20px;
    background-color: rgb(34, 10, 255);
    border: rgb(255, 79, 10) solid 3px;
}
</style>