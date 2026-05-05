import { createRouter, createWebHistory } from 'vue-router';

import Home from './Home.vue';
import HistorySection from './historySection.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/history',
      component: HistorySection
    }
  ]
});

export default router;
