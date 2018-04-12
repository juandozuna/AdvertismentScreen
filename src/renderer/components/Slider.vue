<template>
  <div>

      <b-carousel
        id="carousel"
        :interval="segundos"
        v-model="slide"
                background="#ababab"
                img-width="1024"
                img-height="480"
      >
        <b-carousel-slide v-for="item in end" :key="item"
                          :img-src="`https://lorempixel.com/1024/480/technics/${item}/`" 
                          style="height: 100vh"
        >
        </b-carousel-slide>
      </b-carousel>
    
  </div>
</template>


<script>
require('jquery')
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export default {
  name: 'slider',
  data(){
      return {
        counter: 0,
        segundos: 5000,
        text: '',
        slide: 0,
        end: 2,
        instance: []
      };
  },
  methods:{
    addSlide(){
      if(this.slide >= this.end)
        this.slide = 0;
      else
        this.slide++;
    },
    subtractSlide(){
      if(this.slide <= 0)
        this.slide = this.end;
      else
        this.slide--;
    }
  },
  created(){
   
  },
  mounted(){
     this.counter = 1;
      ipcRenderer.on('siguiente-slide', (event) => {
        this.counter++
        this.addSlide();
      })

      ipcRenderer.on('antes-slide', (event) => {
        this.counter--
        this.subtractSlide();
      })

      ipcRenderer.on('change-time', (event, args) => {
        this.segundos = args[0];
      })

      ipcRenderer.on('added-slide', (event,args) => {
        this.text = "| Slide Agregado exitosamente | " + args
        this.end++;
        window.setTimeout(() => this.text='', 2500);
      })

      ipcRenderer.on('delete-slide', (event, args) => {
        this.text = `| Slide de ID:${args[0]} fue Borrado`
        if(this.end > 1) this.end--;
        else {
          ipcRenderer.send('delete-denied');
        }
        window.setTimeout(() => this.text='', 2500);
      })
  }

}
</script>


<style>

    @import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
    @import '../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css';


    img.img-fluid{
      height: 100vh;
    }

</style>
