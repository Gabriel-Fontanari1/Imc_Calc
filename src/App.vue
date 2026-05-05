<script setup>
import {computed, ref} from 'vue';

//iniciar a aplicação verificando a criação do DB
createDataBase();

//variaveis
const height = ref('')
const weight = ref('')
const name = ref('')
const imc = ref('')

//criação do banco de dados
function createDataBase () {
  const dataBaseExist = localStorage.getItem('dataBase');

  if (!dataBaseExist) {
    const dataBaseOn = [];
    localStorage.setItem("dataBase", JSON.stringify(dataBaseOn));
    console.log('banco criado')
  } else {
    console.log('banco já existe')
    return JSON.parse(dataBaseExist);
  }
}


//adicionar no db
//ele vai verificar se já existe o usuario no db e só atualizar os dados dele, ou criar um usr novo
function addOnDatabase (name, height, weight, imc) {
    const dataBaseExist = localStorage.getItem("dataBase");
    const dataBaseOn = dataBaseExist ? JSON.parse(dataBaseExist) : [];
  
    const newUsr = {
      name: name.value, weight: weight.value, height: height.value, imc: imc.value
    };
    
    const usrIndex = dataBaseOn.findIndex((usr) => usr.name === name.value);
  
    if (usrIndex !== -1) {
      console.log("Usr já existe! Sobreescrevendo dados");
      dataBaseOn[usrIndex] = newUsr;
    } else {
      dataBaseOn.push(newUsr);
    }
    
    localStorage.setItem("dataBase", JSON.stringify(dataBaseOn));
    return dataBaseOn;
}
  
function FuncImc(){
  //verificação
  if(weight.value > 0 && height.value > 0){
    const result = weight.value / (height.value * height.value)
    if(result > 50 || result < 0){
      imc.value = "Valor Inválido"
    }else{
      imc.value = result.toFixed(2) //2 digitos
    }
  }
}

function calcularEAdicionar() {
  FuncImc();
  addOnDatabase(name, height, weight, imc);
}

const ImcDescription = computed(() => {
  if(imc.value === 0) return ''
  if (imc.value < 18.5) return 'Abaixo do peso.'
  if (imc.value < 25) return 'Peso normal.'
  if (imc.value < 30) return 'Sobrepeso.'
  return 'Obesidade.'
})

const tittle = "Calculadora IMC USR:";

/*function HistoryIMC(){
  
}*/

</script>

<template>
  <div class="MainContainer">
    <div class="layout">
      <div class="tittle">
        <h1>{{tittle}} {{name}}</h1> <!--Titulo dinamico-->
      </div>

      <div  class="InputText">
        <label for="NameInput"></label>
        <input type="text" id="NameInput" v-model="name" placeholder="Nome" maxlength="10"> <!--model da variavel à ser utilizada-->
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
        <p class="ImcDescription" v-if="imc">Descrição: {{ImcDescription}}</p>
      </div>

      <div class="BtnPlace">
        <button @click="calcularEAdicionar" :disabled="!name || !weight || !height"> <!--Chamada da func-->
          Calcular
        </button>
        <button>
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
  background: grey;
  border-radius: 15px;
  padding: 1rem;
  margin-bottom: 1rem;
  background: #406E8E;
}

.InputText{
  
}

</style>
