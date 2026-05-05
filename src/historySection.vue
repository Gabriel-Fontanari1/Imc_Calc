<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

//navegar pelas rotas
const router = useRouter();

//pega o histórico do db
const history = ref(JSON.parse(localStorage.getItem('dataBase')) || []);
</script>

<template>
  <div class="history-container">
    <div class="layout">
      <div class="tittle">
        <h1>Histórico</h1>
      </div>

      <div class = "usr-list">
        <!-- ul cria uma lista nao ordenada, ou seja, uma lista com itens sem numeracao. -->
        <ul>
          <!-- li representa um item dentro da lista; aqui cada li mostra um usuario salvo. -->
          <li v-for="usr in history" :key="usr.name">
            {{ usr.name }} - Altura: {{ usr.height }} - Peso: {{ usr.weight }} - IMC: {{ usr.imc }}
          </li>
        </ul>
      </div>

      <div class="btnPlace">
        <button class="btn" @click="router.push('/')">
          Voltar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 2rem;
  box-sizing: border-box;
  overflow: hidden;
  font-family: Arial, Helvetica, sans-serif;
  color: black;
}

.layout{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #51A5FF;
  min-height: 30rem;
  width: min(50rem, 100%);
  padding: 2rem;
  box-sizing: border-box;
  border-radius: 1rem;
}

.usr-list{
  font-family: "Supermercado One", cursive;
  width: 100%;
  max-height: 20rem;
  overflow-y: auto;
  overflow-x: hidden;
}

.usr-list ul{
  margin: 0;
  padding: 1rem;
}

.btnPlace{
  padding: 1rem;
}

.usr-list li{
  min-height: 2rem;
  line-height: 2rem;
}

.tittle{
  padding: 2rem;
}

.btn{
  background-color: #CBF7ED;
  height: 2rem;
  width: 10rem;
  color: black;
  font-weight: bold;
  border-radius: 1rem;
}

.tittle{
  background: #406E8E;
  border-radius: 1rem;
  padding: 1rem;
}

</style>
