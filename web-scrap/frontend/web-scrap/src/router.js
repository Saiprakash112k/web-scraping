import { createRouter, createWebHistory } from 'vue-router';
import InputForm from './components/InputForm.vue';
import ProductDetails from './components/ProductDetails.vue';

const routes = [
  { path: '/', component: InputForm },
  { path: '/product/:id', component: ProductDetails, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
