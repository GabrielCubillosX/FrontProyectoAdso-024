import {createRouter, createWebHistory} from 'vue-router'
import Ejemplo from '../views/ejemplo.vue'
import Paises from '../views/paises.vue'
import DetalleRepuestos from '../views/detalleRepuestos.vue'
import Servicios from '../views/servicios.vue'
import Registros from '../views/registros.vue'
import Repuestos from '../views/repuestos.vue'
import Vehiculos from '../views/vehiculos.vue'
import Propietarios from '../views/propietarios.vue'
import Contactos from '../views/contactos.vue'
import RegistrosFechas from '../views/registrosFechas.vue'
import ModeloAuto from '../views/modeloAuto.vue'
import Mecanicos from '../views/mecanicos.vue'

const routes =[

    {
    path:'/cargos',
    name:'Cargos',
    component:Ejemplo,
    },
    {
    path:'/mecanicos',
    name:'Mecanicos',
    component:Mecanicos,
    },
    {
    path:'/servicios',
    name:'Servicios',
    component:Servicios,
    },
    {
    path:'/registros',
    name:'Registros',
    component:Registros,
    },
    {
    path:'/repuestos',
    name:'Repuestos',
    component:Repuestos,
    },
    {
    path:'/vehiculos',
    name:'Vehiculos',
    component:Vehiculos,
    },
    {
    path:'/propietarios',
    name:'Propietarios',
    component:Propietarios,
    },
    {
    path:'/contactos',
    name:'Contactos',
    component:Contactos,
    },
    {
    path:'/registrosfechas',
    name:'registrosFechas',
    component:RegistrosFechas,
    },
    {
    path:'/modeloauto',
    name:'modelosautos',
    component:ModeloAuto,
    },
    {
    path:'/detallerepuestos',
    name:'Detallerepuestos',
    component:DetalleRepuestos,
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
