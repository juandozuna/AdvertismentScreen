<template>
    <div>
       <div class="left"> 
            <button type="button" class="btn btn-outline-secondary btn-lg btn-height" @click="previous"><i class="fa fa-arrow-left fa-4x"></i></button>
        </div>
        <div class="right">
            <button type="button" class="btn btn-outline-secondary btn-lg btn-height" @click="siguiente"><i class="fa fa-arrow-right fa-4x"></i></button>
        </div>
        <br>
        <h4 class="text-center">Duración de Cada Slide</h4>
        <div class="center">
            <span id="duracionText1">{{duracionEnSegundos}}</span>
            <input type="range"  class="slider" min="1000" max="10000" v-model="duracion" id="duracionRange" @change="intervalo"> 
            <span id="duracionText2">{{duracionEnSegundos}}</span>

            <br><br>
            <button class="btn btn-lg btn-info enlarged" @click="agregarSlide" data-toggle="modal" data-target="#agregarModal"><i class="fa fa-plus"></i> Agregar Slide</button>
            <button class="btn btn-lg btn-info enlarged"><i class="fa fa-window-restore"></i> Reiniciar Slider</button>
        </div>

        
    </div>
</template>

<script>
const electron = require('electron');
const remote = electron.remote;
const ipc = electron.ipcRenderer;
const {dialog} = remote;

export default {
  name: 'button-controls',
  data(){
      return{
          duracion: 5000
      };
  },
  computed: {
      duracionEnSegundos: {
          get(){
              return (this.duracion/1000).toFixed(1) + "s";
          },
          set(newValue){
              this.duracion = newValue;
          }
      }
  },
  methods: {
      duracionChange(){
          let slider = document.getElementById('duracionRange');
          let span = document.getElementById('duracionText');
          let topPosition = slider
      },
      agregarSlide(){
          //this.$emit('agregarSlide');
          dialog.showOpenDialog({
              

          }, (filePaths) => {
              console.log(filePaths[0]);
          })
      },
      siguiente(){
        ipc.send('next-slide');
      },
      previous(){
          ipc.send('previous-slide');
      },
      intervalo(){
          ipc.send('change-time', [this.duracion]);
      }
  }
}
</script>

<style> 
    .right{
        position: fixed;
        top: 450px;
        right:0%;
        float: right;
        margin-right: auto;
        margin-left: 10px;
    }

     .left{
        position: fixed;
        top: 450px;
        left:0%;
        float: left;
        margin-left: auto;
        margin-right: 10px;
    }

    .center{
        text-align: center;
        width: 100%;
    }

    .slider {
    -webkit-appearance: none;
    width: 65%;
    height: 15px;
    border-radius: 5px;   
    background: #d3d3d3;
    position: relative;
    margin: 0 auto;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 30px;
    height: 30px;
    border-radius: 90%;
    border-color: black; 
    border-style: ridge;
    border-width: 2px;
    background: rgb(0, 132, 255);
    cursor: pointer;
    transition: background 0.3s;

}


.slider::-webkit-slider-thumb:active{
    background: red;
    transition: background 0.3s;
}

    .btn-height{
        height: 100px;
        width: 160px;
        opacity: 0.23;
        transition: opacity 0.2s;
        border: none;
    }

    .btn-height:hover {
        opacity: 0.7;
        transition: opacity 0.2s;
        
    }

    .btn-height:active {
       border: none;
        
    }

    #duracionText{
        display: inline;

    }

.enlarged{
    width: 362px;
    height: 200px;
    display: inline;
    position: relative;
}


</style>
