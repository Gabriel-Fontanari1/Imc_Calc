<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Histórico do db
const history = ref(JSON.parse(localStorage.getItem('dataBase')) || []);
</script>

<template>
  <!-- Fonte usada no texto do botao animado. -->
  <link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet">

  <div class="MainContainer">
    <div class="layout">
      <div class="tittle">
        <h2>Histórico</h2>
      </div>

      <div class="usr-list">
        <ul>
          <li v-for="usr in history" :key="usr.name">
            {{ usr.name }} - Altura: {{ usr.height }} m - Peso: {{ usr.weight }} kg - IMC: {{ usr.imc }}
          </li>
        </ul>
      </div>

      <div class="BtnPlace">
        <button class="btn" @click="router.push({name: 'Home'})">
          <span>Voltar</span>
          <div class="wave"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.MainContainer{
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  align-items: center;
  justify-content: center;
}

.layout{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #bedfff;
  border-radius: 1rem;
  padding: 1.5rem;
  height: 50%;
  width: 50%;
}

.usr-list{
  color: black;
  padding: 1rem;
  font-family: "Supermercado One", cursive;
  width: 100%;
  max-height: 16rem;
  overflow-y: auto;
  overflow-x: hidden;
}

.usr-list ul{
  margin: 0;
  padding: 0 1rem;
}

.BtnPlace{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.usr-list li{
  min-height: 2rem;
  line-height: 2rem;
}

.btn{
  position: relative;
  display: block;
  min-width: 145px;
  padding: 18px 24px;
  overflow: hidden;
  border: 1px solid #5DF8D8;
  border-radius: 10px;
  background: #093C5D;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(9, 60, 93, 0.25);
}

.btn:hover .wave,
.btn:focus-visible .wave,
.btn:active .wave{
  top: -125px;
}

.btn span{
  position: relative;
  z-index: 1;
  color: white;
  font-size: 0.85rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.btn .wave{
  position: absolute;
  left: 50%;
  top: -75px;
  width: 220px;
  height: 220px;
  background: #5DF8D8;
  box-shadow: inset 0 0 50px rgba(9, 60, 93, 0.45);
  transform: translateX(-50%);
  transition: top 0.45s ease;
}

.btn .wave::before,
.btn .wave::after{
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: 200%;
  height: 200%;
  transform: translate(-50%, -75%);
}

.btn .wave::before{
  border-radius: 45%;
  background: #06283d;
  animation: wave 5s linear infinite;
}

.btn .wave::after{
  border-radius: 40%;
  background: rgba(6, 40, 61, 0.55);
  animation: wave 9s linear infinite;
}

@keyframes wave{
  0%{
    transform: translate(-50%, -75%) rotate(0deg);
  }

  100%{
    transform: translate(-50%, -75%) rotate(360deg);
  }
}

.tittle{
  background: #406E8E;
  border-radius: 15px;
  padding: 1rem;
  margin-bottom: 1rem;
  color: black;
}

</style>
