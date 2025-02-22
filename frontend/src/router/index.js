import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProductList from '../components/ProductList.vue'; // Importa el componente ProductList
import BuyerList from '../components/BuyerList.vue'; // Importa el componente BuyerList
import ProductManagement from '../components/ProductManagement.vue'; // Importa el componente ProductManagement

const routes = [
  { path: '/', component: Home },
  { path: '/products', component: ProductList }, // Nueva ruta para productos
  { path: '/buyers', component: BuyerList }, // Nueva ruta para el reporte de compradores
  { path: '/create', component: ProductManagement } // Nueva ruta para crear productos
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;