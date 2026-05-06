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
  const heightNumber = getHeightNumber();

  if (weight.value > 0 && heightNumber > 0) {
    const result = weight.value / (heightNumber * heightNumber);
    if (result > 0 && result < 50) {
      return result;
    }
  }
  return null;
}

function calcularEAdicionar() {
  if (disableCalcular.value) return;

  imc.value = calcularImc();

  if (imc.value !== null) {
    addOnDatabase(name, height, weight, imc);
  }
}

function goToHistory() {
  router.push({ name: "History" });
}

function formatHeightInput(event) {
  const digits = event.target.value.replace(/\D/g, '').slice(0, 3);

  if (!digits) {
    height.value = '';
    event.target.value = height.value;
    return;
  }

  height.value = `${digits[0]},${digits.slice(1)}`;
  event.target.value = height.value;
}

// Colocar virgula depois do primeiro caracter.
function getHeightNumber() {
  if (!/^\d,\d{1,2}$/.test(height.value)) return null;

  return Number(height.value.replace(',', '.'));
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
  const heightNumber = getHeightNumber();

  return !name.value || !weight.value || !heightNumber || heightNumber > 5;
});
</script>

<template>
  <!-- Fontes usadas na interface. -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400..700;1,400..700&family=Supermercado+One&display=swap" rel="stylesheet">

  <div class="MainContainer">
    <div class="background">
      <!-- Tag usada para sobreposições estilização -->
      <span class="ball"></span>
      <span class="ball"></span>
      <span class="ball"></span>
      <span class="ball"></span>
      <span class="ball"></span>
      <span class="ball"></span>
      <span class="ball"></span>
      <span class="ball"></span>

      <form class="layout" @submit.prevent="calcularEAdicionar">
        <div class="tittle">
          <h2>Calculadora IMC USR: {{ name }}</h2>
        </div>
        
        <div class="InputText">
          <label for="NameInput"></label>
          <input type="text" class="input" id="NameInput" v-model="name" placeholder="Nome" maxlength="10">
        </div>
  
        <div class="InputText">
          <label for="HeightInput"></label>
          <input type="text" class="input" id="HeightInput" :value="height" inputmode="numeric" placeholder="Altura" maxlength="4" @input="formatHeightInput">
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
          <button class="btn" type="submit" :disabled="disableCalcular">
            <span>Calcular</span>
            <div class="wave"></div>
          </button>
  
          <button class="btn" type="button" @click="goToHistory">
            <span>History</span>
            <div class="wave"></div>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.MainContainer{
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  font-family: "Arimo", Arial, Helvetica, sans-serif;
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
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
}

.Result{
  color: black;
  padding: 1rem;
  font-family: "Arimo", Arial, Helvetica, sans-serif;
}

/* Btn wave */

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
  border-radius: 0.3rem;
  box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
}

/* Background balls */

@keyframes move {
  100% {
    transform: translate3d(0, 0, 1px) rotate(360deg);
  }
}

.background {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #4CB8B6;
  overflow: hidden;
}

.layout{
  position: relative;
  z-index: 1;
}

.ball {
  position: absolute;
  z-index: 0;
  width: 20vmin;
  height: 20vmin;
  border-radius: 50%;
  backface-visibility: hidden;
  animation: move linear infinite;
  pointer-events: none;
}

.ball:nth-child(odd) {
  color: #006D5B;
}

.ball:nth-child(even) {
  color: #FF6F61;
}

/* Using a custom attribute for variability */
.ball:nth-child(1) {
  top: 77%;
  left: 88%;
  animation-duration: 40s;
  animation-delay: -3s;
  transform-origin: 16vw -2vh;
  box-shadow: 40vmin 0 5.703076368487546vmin currentColor;
}
.ball:nth-child(2) {
  top: 42%;
  left: 2%;
  animation-duration: 53s;
  animation-delay: -29s;
  transform-origin: -19vw 21vh;
  box-shadow: -40vmin 0 5.17594621519026vmin currentColor;
}
.ball:nth-child(3) {
  top: 28%;
  left: 18%;
  animation-duration: 49s;
  animation-delay: -8s;
  transform-origin: -22vw 3vh;
  box-shadow: 40vmin 0 5.248179047256236vmin currentColor;
}
.ball:nth-child(4) {
  top: 50%;
  left: 79%;
  animation-duration: 26s;
  animation-delay: -21s;
  transform-origin: -17vw -6vh;
  box-shadow: 40vmin 0 5.279749632220298vmin currentColor;
}
.ball:nth-child(5) {
  top: 46%;
  left: 15%;
  animation-duration: 36s;
  animation-delay: -40s;
  transform-origin: 4vw 0vh;
  box-shadow: -40vmin 0 5.964309466052033vmin currentColor;
}
.ball:nth-child(6) {
  top: 77%;
  left: 16%;
  animation-duration: 31s;
  animation-delay: -10s;
  transform-origin: 18vw 4vh;
  box-shadow: 40vmin 0 5.178483653434181vmin currentColor;
}
.ball:nth-child(7) {
  top: 22%;
  left: 17%;
  animation-duration: 55s;
  animation-delay: -6s;
  transform-origin: 1vw -23vh;
  box-shadow: -40vmin 0 5.703026794398318vmin currentColor;
}
.ball:nth-child(8) {
  top: 41%;
  left: 47%;
  animation-duration: 43s;
  animation-delay: -28s;
  transform-origin: 25vw -3vh;
  box-shadow: 40vmin 0 5.196265905749415vmin currentColor;
}

</style>
