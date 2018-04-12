<template>
  <div>
dd
      <b-carousel
        id="carousel"
        :interval="segundos"
        v-model="slide"
                background="#ababab"
                img-width="1024"
                img-height="480"
      >
        <b-carousel-slide v-for="(item, key) in slides" :key="key"
                          :img-src="`file://${item}`" 
                          style="height: 100vh"
        >
        </b-carousel-slide>
      </b-carousel>
    
  </div>
</template>


<script>

import ExtensionCheck from './Controllers/extensionCheck'
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const fileExtension = require('file-extension')
const extension = new ExtensionCheck();
const path = require('path')
const fs = require('fs');

export default {
  name: 'slider',
  data(){
      return {
        counter: 0,
        segundos: 5000,
        text: '',
        slide: 0,
        end: 2,
        instance: [],
        slides: [],
      };
  },
  methods:{
    addSlide(){
      if(this.slide >= this.slides.length-1)
        this.slide = 0;
      else
        this.slide++;
    },
    subtractSlide(){
      if(this.slide <= 0)
        this.slide = this.slides.length-1;
      else
        this.slide--;
    },
    loadElements(){
      this.slides = new Array();
        fs.readdir(this.pathToFolder, (err, files) => {
                files.forEach(file => {
                let f = file.split(' ').join('%20');
                if(extension.allowed(fileExtension(f))){
                let p = path.join(this.pathToFolder, f);
                if(!this.slides.includes(p))
                    console.log(p);
                    this.slides.push(p);
            }
        });
     });
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

      fs.watch(this.pathToFolder,{encoding: 'buffer'}, (eventType, filename) => {
                this.loadElements();
                //console.log(eventType);
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
