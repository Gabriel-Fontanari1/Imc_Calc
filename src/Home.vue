<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

createDataBase();

const height = ref('');
const weight = ref('');
const name = ref('');
const imc = ref('');

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

function FuncImc() {
  if (weight.value > 0 && height.value > 0) {
    const result = weight.value / (height.value * height.value);

    if (result > 50 || result < 0) {
      imc.value = 'Valor invalido';
      return false;
    } else {
      imc.value = result.toFixed(2);
      return true;
    }
  }

  imc.value = '';
  return false;
}

function calcularEAdicionar() {
  const imcValido = FuncImc();

  if (imcValido) {
    addOnDatabase(name, height, weight, imc);
  }
}

function goToHistory() {
  router.push('/history');
}

const ImcDescription = computed(() => {
  if (!imc.value) return '';
  if (imc.value === 'Valor invalido') return '';
  if (imc.value < 18.5) return 'Abaixo do peso.';
  if (imc.value < 25) return 'Peso normal.';
  if (imc.value < 30) return 'Sobrepeso.';
  return 'Obesidade.';
});

const title = 'Calculadora IMC USR:';
</script>

<template>
  <div class="MainContainer">
    <div class="layout">
      <div class="tittle">
        <h1>{{ title }} {{ name }}</h1>
      </div>

      <div class="InputText">
        <label for="NameInput"></label>
        <input type="text" id="NameInput" v-model="name" placeholder="Nome" maxlength="10">
      </div>

      <div class="InputText">
        <label for="HeightInput"></label>
        <input type="number" id="HeightInput" v-model.number="height" placeholder="Altura">
      </div>

      <div class="InputText">
        <label for="WeightInput"></label>
        <input type="number" id="WeightInput" v-model.number="weight" placeholder="Peso">
      </div>

      <div class="Result">
        <p class="ImcResult" v-if="imc">IMC: {{ imc }}</p>
        <p class="ImcDescription" v-if="imc">Descricao: {{ ImcDescription }}</p>
      </div>

      <div class="BtnPlace">
        <button @click="calcularEAdicionar" :disabled="!name || !weight || !height">
          Calcular
        </button>
        <button @click="goToHistory">
          History
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
  background: #8EA8C3;
  border-radius: 1rem;
  padding: 1.5rem;
}

.tittle{
  background: #406E8E;
  border-radius: 15px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.Result{
  color: white;
}

.BtnPlace{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  gap: 1rem;
}
</style>
