<script setup>
import {computed, ref} from 'vue';
//variaveis
const height = ref('')
const weight = ref('')
const name = ref('')
const imc = ref('')

function FuncImc(){
  //verificação
  if(weight.value > 0 && weight.value > 0){
    const result = weight.value / (height.value * height.value)
    if(result > 50 || result < 0){
      imc.value = "Valor Inválido"
    }else{
      imc.value = result.toFixed(2) //2 digitos
    }
  }
}

const ImcDescription = computed(() => {
  if(imc.value === 0) return ''
  //completar esta função !!!!!!!!!!!!!!!!
})

const tittle = "Calculadora IMC USR:"

</script>

<template>
  <div class="MainContainer">
    <h1>{{tittle}}</h1> <!--Titulo dinamico-->

    <div  class="InputText">
      <label for="NameInput"></label>
      <input type="text" id="NameInput" v-model="name" placeholder="Nome"> <!--model da variavel à ser utilizada-->
    </div>

    <div  class="InputText">
      <label for="HeightInput"></label>
      <input type="number" id="HeightInput" v-model="height" placeholder="Altura"> <!--model da variavel à ser utilizada-->
    </div>

    <div class="InputText">
      <label for="WeightInput"></label>
      <input type="number" id="WeightInput" v-model="weight" placeholder="Peso">
    </div>

    <div class="Result">
      <!--V-if = só adiciona o valor quando imc nao for vazio-->
      <p class="ImcResult" v-if="imc">IMC: {{imc}}</p>
      <p class="ImcDescription" v-if="imc">Descrição: </p>
    </div>

    <div class="BtnPlace">
      <button @click="() => FuncImc()" :disable="!weight || !height"> <!--Chamada da func-->
        Calcular
      </button>
    </div>

  </div>
</template>

<style scoped>

</style>