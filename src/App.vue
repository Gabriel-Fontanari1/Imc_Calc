<script>
import HelloWorld from './components/HelloWorld.vue'

let individualHeight;
export default {
  name: 'App',
  data() {
    return {

    }
  }
}

</script>

<template>
  <header>
    <meta charset="UTF-8">
    <title>Login Formulario</title>
  </header>

  <body>
  <h1>IMC Calc</h1><br><br>
  <div id="HomeInputs">
    <p>Insira seus valores</p>

    <label for="Mass"></label>
    <input type="Number" id="Mass">

    <label for="Height"></label>
    <input type="Number" id="Height">
  </div>

  <div id="HistoryBase">
    <p>Ver histórico de resultados</p>
    <input type="button" value="Histórico" id="HistoryBtn">
  </div>

  </body>

  <footer>

  </footer>
</template>


<style>

</style>