<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const history = ref(JSON.parse(localStorage.getItem('dataBase')) || []);
</script>

<template>
  <div class="history-container">
    <h1>Historico</h1>

    <button @click="router.push('/')">
      Voltar
    </button>

    <ul>
      <li v-for="usr in history" :key="usr.name">
        {{ usr.name }} - Altura: {{ usr.height }} - Peso: {{ usr.weight }} - IMC: {{ usr.imc }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.history-container {
  padding: 2rem;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
