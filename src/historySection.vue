<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Histórico do db
const history = ref(JSON.parse(localStorage.getItem('dataBase')) || []);
</script>

<template>
  <div class="MainContainer">
    <div class="background">
      <span class="ball"></span>
      <span class="ball"></span>
      <span class="ball"></span>
      <span class="ball"></span>
      <span class="ball"></span>
      <span class="ball"></span>
      <span class="ball"></span>
      <span class="ball"></span>

      <div class="layout">
      <div class="tittle">
        <h2>Histórico</h2>
      </div>

      <div class="table-scroll style-tabela">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Altura</th>
              <th>Peso</th>
              <th>IMC</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(usr, index) in history" :key="usr.name">
              <td>{{ index + 1 }}</td>
              <td>{{ usr.name }}</td>
              <td>{{ usr.height }} m</td>
              <td>{{ usr.weight }} kg</td>
              <td>{{ typeof usr.imc === 'number' ? usr.imc.toFixed(2) : usr.imc }}</td>
            </tr>

            <tr v-if="history.length === 0">
              <td colspan="5" class="empty-table">Nenhum usuário salvo.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="BtnPlace">
        <button class="btn" @click="router.push({name: 'Home'})">
          <span>Voltar</span>
          <div class="wave"></div>
        </button>
      </div>
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
  font-family: "Arimo", Arial, Helvetica, sans-serif;
  align-items: center;
  justify-content: center;
}

.layout{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  background: #bedfff;
  border-radius: 1rem;
  padding: 1.5rem;
  height: 50%;
  width: 50%;
  min-height: 30rem;
  min-width: 28rem;
  max-width: 50rem;
  box-sizing: border-box;
}

/* Btn wave */

.BtnPlace{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
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
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
}

/* Scrolls */

.table-scroll{
  width: 100%;
  max-height: 16rem;
  overflow-y: auto;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: #093C5D #bedfff;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 0.5rem;
  box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
}

.table-scroll::-webkit-scrollbar-track{
  box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
  background-color: #bedfff;
}

.table-scroll::-webkit-scrollbar{
  width: 12px;
  height: 12px;
  background-color: #bedfff;
}

.table-scroll::-webkit-scrollbar-thumb{
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #093C5D;
  border: 2px solid #bedfff;
}

.style-tabela table{
  width: 100%;
  border-collapse: collapse;
  color: black;
  font-size: 0.95rem;
}

.style-tabela th,
.style-tabela td{
  padding: 0.75rem;
  text-align: center;
  border-bottom: 1px solid rgba(9, 60, 93, 0.18);
}

.style-tabela th{
  position: sticky;
  top: 0;
  z-index: 1;
  background: #406E8E;
  color: white;
  font-weight: 700;
}

.style-tabela tbody tr{
  background: rgba(255, 255, 255, 0.7);
}

.style-tabela tbody tr:nth-child(even){
  background: rgba(255, 255, 255, 0.45);
}

.style-tabela tbody tr:hover{
  background: rgba(93, 248, 216, 0.25);
}

.empty-table{
  color: #093C5D;
  font-weight: 700;
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
