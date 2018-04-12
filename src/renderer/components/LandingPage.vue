<template>
<div>
  <div class="text-center container" style="height: 155px; margin-bottom: 0px; -webkit-app-region: drag; position: relative; top: -10px; position: sticky">
      <img src="~@/assets/logo.png" class="img-thumbnail" style="height: 200px; border: none; display:inline; position: relative; top: -19px;">
      <h1 class="display-3 text-centered" style="display: inline; color: #294699; text-shadow: -4px -3px 2px rgba(0,0,0,0.35)">Ads Slider</h1>
    </div>
  <div class="container-fluid" style="overflow-x: hidden; overflow-y: auto">
    <div class="row">
      <div class="col-lg-6">
        <active-slides></active-slides>
      </div>
      <div class="col-lg-6">
        <inactive-slides></inactive-slides>
      </div>

       <div class="container-fluid"> 
        <button-controlls @agregarSlide="agregarSlide"></button-controlls>
      </div>
    </div>

    <agregar-slide></agregar-slide>
      
      
  </div>
</div>
</template>

<script>
import ActiveSlides from './Controllers/ActiveSlides'
import InactiveSlides from './Controllers/InactiveSlides'
import ButtonControlls from './Controllers/ButtonControlls'
import AgregarSlide from './Controllers/AgregarSlide'
const remote = require('electron').remote;
const fs = require('fs');
const dialog = remote.dialog;
const path = require('path');

export default {
  name: 'landing-page',
  components: {
    ActiveSlides,
    InactiveSlides,
    ButtonControlls,
    AgregarSlide
  },
  data(){
    return {};
  },
  methods: {
    agregarSlide(){
      
    }
  },
  mounted(){
      //remote.BrowserWindow.getFocusedWindow().webContents.openDevTools()
      console.log(window.options.appFolder);
  }
}

</script>

<style>
  @import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
  @import '../../../node_modules/font-awesome-4.7.0/css/font-awesome.min.css';
</style>
