import {createRouter, createWebHistory} from 'vue-router'
import LayoutMain from '../components/LayoutMain.vue'
import DetalleRepuestos from '../views/detalleRepuestos/detalleRepuestos.vue'
import Servicios from '../views/servicios/servicios.vue'
import Login from '../components/Login.vue'
import Repuestos from '../views/repuestos/repuestos.vue'
import Vehiculos from '../views/vehiculo/vehiculos.vue'
import Propietarios from '../views/propietarios/propietarios.vue'
import Contactos from '../views/contactos/contactos.vue'
import ModeloAuto from '../views/modeloAuto/modeloAuto.vue'
import Mecanicos from '../views/mecanicos/mecanicos.vue'

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