<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

//navegar para outras telas usando router.push().
const router = useRouter();

//cria ou verifica se existe
createDataBase();

//estados ligados aos vmodels
const height = ref('');
const weight = ref('');
const name = ref('');
const imc = ref('');

//array do banco no local storage
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

//se ja tiver o usr ele só vai atualizar, caso contrario ele vai criar 1 novo
function addOnDatabase(name, height, weight, imc) {
  const dataBaseExist = localStorage.getItem('dataBase');
  const dataBaseOn = dataBaseExist ? JSON.parse(dataBaseExist) : [];

  const newUsr = {
    name: name.value,
    weight: weight.value,
    height: height.value,
    imc: imc.value
  };

  //faz a busca pelo nome
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

//calc imc
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

//calcula o imc e adiciona se for valido
function calcularEAdicionar() {
  const imcValido = FuncImc();

  if (imcValido) {
    addOnDatabase(name, height, weight, imc);
  }
}

// Navega para a tela de historico.
function goToHistory() {
  router.push('/history');
}

//descrição dos valores do IMC
const ImcDescription = computed(() => {
  if (!imc.value) return '';
  if (imc.value === 'Valor invalido') return '';
  if (imc.value < 18.5) return '⚠️ Abaixo do peso.';
  if (imc.value < 25) return '✅ Peso normal.';
  if (imc.value < 30) return '⚠️ Sobrepeso.';
  if (imc.value > 30 && imc.value < 50) return '🚨 Obesidade.';
  else "Dados Inválidos!"
});

const title = 'Calculadora IMC USR:';
</script>

<template>
  <div class="MainContainer">
    <div class="layout">
      <div class="tittle">
        <h2>{{ title }} {{ name }}</h2>
      </div>

      <div class="InputText">
        <label for="NameInput"></label>
        <!-- maxlength limita a quantidade de caracteres do nome. -->
        <input type="text" class="input" id="NameInput" v-model="name" placeholder="Nome" maxlength="10">
      </div>

      <div class="InputText">
        <label for="HeightInput"></label>
        <!-- v-model.number converte o valor digitado para numero. -->
        <input type="number" class="input" id="HeightInput" v-model.number="height" placeholder="Altura">
      </div>

      <div class="InputText">
        <label for="WeightInput"></label>
        <input type="number" class="input" id="WeightInput" v-model.number="weight" placeholder="Peso">
      </div>

      <div class="Result">
        <p class="ImcResult" v-if="imc">IMC: {{ imc }}</p>
        <p class="ImcDescription" v-if="imc">Descricao: {{ ImcDescription }}</p>
      </div>

      <div class="BtnPlace">
        <!-- desabilita o campo se tiver algo vazio -->
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

.input{
  color: black;
  background: white;  
}

</style>
