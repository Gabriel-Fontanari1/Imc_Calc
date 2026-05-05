import { createRouter, createWebHistory } from 'vue-router';

import Home from './Home.vue';
import HistorySection from './historySection.vue';

// define qual componente vai aparecer em cada url
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      //tela home
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      //tela de histórico
      path: '/history',
      name: 'History',
      component: HistorySection
    }
  ]
});

export default router;
