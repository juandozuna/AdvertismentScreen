<template>
  <div class="small-slide">
      <img :src="url" @click="deactivateButton">

      <div class="roundContainer" @mouseleave="deactivateButton" :class="{'squareContainer': buttonActive}" @click="activateButton">
        <transition name="fade">
          <i class="fa fa-pencil fa-2x" v-show="!buttonActive"></i>
        </transition>

        <transition name="fade">
          <div class="slideControls" v-show="buttonActive">
            <div class="row">
                <div class="col">
                    <button class="pic-button"><i class="material-icons">check_box</i></button>
                </div>
                <div class="col">
                    <button class="pic-button" @click="activarBorrado" v-if="!confirmDelete"><i class="material-icons">delete</i></button>
                    <button class="pic-button" @click="borrar" v-else style="background-color: red"><i class="material-icons" >delete_forever</i></button>
                </div>
            </div>
          </div>
        </transition>
     </div>
  </div>
</template>


<script>
const ipcRenderer = require('electron').ipcRenderer;
const fileExtension = require('file-extension');
export default {
  name:"small-slide",
  props: ['num', 'id', 'imgUri'],
  data(){
      return {
          buttonActive: false,
          confirmDelete: false,
          ids: this.id
      };
  },
  computed: {
      url(){
        if(fileExtension(this.imgUri) === 'html')
            return this.imgUri;
        else
            return `file://${this.imgUri}`;
      }
  },
  methods: {
      activateButton(){
          this.buttonActive = true;
      },
      deactivateButton(){
          this.buttonActive = false;
          this.confirmDelete = false;
      },
      borrar(){
          ipcRenderer.send('delete-slide', [this.id])
      },
      activarBorrado(){
          this.confirmDelete = true;
      }
  },
  created(){
      //this.url+=this.num;
  }
}
</script>

<style scoped>
   @import 'https://fonts.googleapis.com/icon?family=Material+Icons';

    .small-slide{
        height: 140px;
        display: inline-grid;
    }

    .small-slide img{
        height: 130px;
        width: auto;
        border-radius: 0px 20px;
        margin-left: 5px;
        border: outset 2px;
        box-shadow: 5px 6px 2px 0px rgba(0,0,0,0.4);
        opacity: 0.9;
        transition: opacity 0.5s, height 0.5s, top 0.5s;
    }

    .small-slide:hover img{
        opacity: 1;
        height: 135px;
        position: relative;
        top: -3px;
        transition: opacity 0.2s, height 0.2s, top 0.2s;
    }

    .small-slide:hover .roundContainer{
        opacity: 1;
        transition: all ease 0.7s;
    }

    .roundContainer{
        position: relative;
        width: 50px;
        height: 50px;
        background-color: rgb(216, 56, 56);
        color: white;
        z-index: 3;
        border-radius: 100%;
        top: -94px;
        margin: 0 auto;
        opacity: 0;
         transition: all ease 0.7s;
    }

    .roundContainer .fa{
        text-align: center;
        color: white;
        position: relative;
        margin: 0 auto;
        display: block;
        top: 20%;
        left: 3%;
        opacity: 1;
        transition-delay: 0.5s;
        transition: opacity ease 0.5s;
    }

    .squareContainer{
        border-radius: 5px;
        left: -1%;
        top: -114px;
        width: 80%;
        height: 100px;
        background-color: rgba(30, 143, 255, 0);
        opacity: 1;

        transition: all ease 0.5s;
    }

    .squareContainer .fa{
        opacity: 0;
        transition: opacity ease 0.5s;
    }

    .slideControls{
        position: relative;
        vertical-align: middle;
        top: 25%;
        padding: 0 10px;
        white-space: nowrap;
        text-align: center;
        transition-delay: 1s;
    }

    .pic-button{
        border-radius: 100%;
        background-color: dodgerblue;
        border: none;
    }

    .pic-button i{
        margin-top: 4px;
        color: white
    }

   @font-face {
        font-family: 'Material Icons';
        font-style: normal;
        font-weight: 400;
        src: url(https://fonts.gstatic.com/s/materialicons/v36/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format('woff2');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  cursor: pointer;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
    .fade-enter-active, .fade-leave-active {
        transition-delay: 1s;
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
            transition-delay: 0s;
  opacity: 0;
}

</style>

