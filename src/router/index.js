import {createRouter, createWebHistory} from 'vue-router'
import LayoutMain from '../components/layoutMain.vue'
import Login from '../components/Login.vue'
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
    path:'/login',
    name:'login',
    component:Login,
    },
    {
    path:'/',
    name:'home',
    component:LayoutMain,
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
    name:'Ejemplo',
    component: Contactos,
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
    }

]

const router =createRouter({
    history:createWebHistory(),
    routes,
})

export default router;
