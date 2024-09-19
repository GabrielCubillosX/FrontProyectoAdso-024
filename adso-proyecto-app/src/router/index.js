import {createRouter, createWebHistory} from 'vue-router'
import Ejemplo from '../views/ejemplo.vue'
import Paises from '../views/paises.vue'

const routes =[

{
path:'/cargos',
name:'Cargos',
component:Ejemplo,
},
{
    path:'/paises',
    name:'Paises',
    component:Paises,
    }

]

const router =createRouter({
    history:createWebHistory(),
    routes,
})

export default router;