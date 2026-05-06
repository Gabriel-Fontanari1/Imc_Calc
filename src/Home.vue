<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

// Permite navegar entre as telas usando as rotas do Vue Router.
const router = useRouter();

createDataBase();
const height = ref('');
const weight = ref('');
const name = ref('');
const imc = ref();

function createDataBase() {
  const dataBaseExist = localStorage.getItem('dataBase');

  if (!dataBaseExist) {
    const dataBaseOn = [];
    localStorage.setItem('dataBase', JSON.stringify(dataBaseOn));
    console.log('banco criado');
  } else {
    console.log('banco ja existe');
    return JSON.parse(dataBaseExist);
  }
}

function addOnDatabase(name, height, weight, imc) {
  const dataBaseExist = localStorage.getItem('dataBase');
  const dataBaseOn = dataBaseExist ? JSON.parse(dataBaseExist) : [];

  const newUsr = {
    name: name.value,
    weight: weight.value,
    height: height.value,
    imc: imc.value
  };

  const usrIndex = dataBaseOn.findIndex((usr) => usr.name === name.value);

  if (usrIndex !== -1) {
    console.log('Usr ja existe! Sobreescrevendo dados');
    dataBaseOn[usrIndex] = newUsr;
  } else {
    dataBaseOn.push(newUsr);
  }

  localStorage.setItem('dataBase', JSON.stringify(dataBaseOn));
  return dataBaseOn;
}

function calcularImc() {
  if (weight.value > 0 && height.value > 0) {
    const result = weight.value / (height.value * height.value);
    if (result > 0 && result < 50) {
      return result;
    }
  }
  return null;
}

function calcularEAdicionar() {
  imc.value = calcularImc();

  if (imc.value !== null) {
    addOnDatabase(name, height, weight, imc);
  }
}

function goToHistory() {
  router.push({ name: "History" });
}

// Texto exibido no resultado: vazio, invalido ou IMC formatado.
const imcResult = computed(() => {
  if (imc.value === null) return "Valor invalido";
  if (imc.value === undefined) return "";

  return imc.value.toFixed(2);
});

const imcDescription = computed(() => {
  if (imc.value === null || imc.value === undefined) return "";

  if (imc.value < 18.5) return "Abaixo do peso.";
  if (imc.value < 25) return "Peso normal.";
  if (imc.value < 30) return "Sobrepeso.";
  if (imc.value < 50) return "Obesidade.";

  return "Dados Invalidos!";
});

// Desabilita o botao Calcular quando faltam dados ou a altura e invalida.
const disableCalcular = computed(() => {
  if (height.value > 5) return true;
  return !name.value || !weight.value || !height.value;
});
</script>

<template>
  <!-- Fonte usada no texto dos botoes animados. -->
  <link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet">

  <div class="MainContainer">
    <div class="layout">
      <div class="tittle">
        <h2>Calculadora IMC USR: {{ name }}</h2>
      </div>
      
      <div class="InputText">
        <label for="NameInput"></label>
        <input type="text" class="input" id="NameInput" v-model="name" placeholder="Nome" maxlength="10">
      </div>

      <div class="InputText">
        <label for="HeightInput"></label>
        <input type="number" class="input" id="HeightInput" v-model.number="height" placeholder="Altura">
      </div>

      <div class="InputText">
        <label for="WeightInput"></label>
        <input type="number" class="input" id="WeightInput" v-model.number="weight" placeholder="Peso">
      </div>
      
      <div class="Result">
        <p class="ImcResult" v-if="imcResult">IMC: {{ imcResult }}</p>
        <p class="ImcDescription" v-if="imcDescription">Descricao: {{ imcDescription }}</p>
      </div>

      <!-- Cada botao tem o texto por cima e uma class para a animação -->
      <div class="BtnPlace">
        <button class="btn" @click="calcularEAdicionar" :disabled="disableCalcular">
          <span>Calcular</span>
          <div class="wave"></div>
        </button>

        <button class="btn" @click="goToHistory">
          <span>History</span>
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

.tittle{
  background: #406E8E;
  border-radius: 15px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.Result{
  color: black;
  padding: 1rem;
  font-family: "Supermercado One", cursive;
}

.BtnPlace{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

/* Area recortada para a wave */
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

/* Wave sobe */
.btn:hover .wave,
.btn:focus-visible .wave,
.btn:active .wave{
  top: -125px;
}

/* Manter o texto em cima da animação */
.btn span{
  position: relative;
  z-index: 1;
  color: white;
  font-size: 0.85rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* Camada que vai subir */
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

/* Formas arredondadas que vão girar */
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

.btn:disabled{
  cursor: not-allowed;
  opacity: 0.55;
}

.btn:disabled .wave{
  top: -75px;
}

/* Movimento circular */
@keyframes wave{
  0%{
    transform: translate(-50%, -75%) rotate(0deg);
  }

  100%{
    transform: translate(-50%, -75%) rotate(360deg);
  }
}

.input{
  color: black;
  background: white;
}
</style>
