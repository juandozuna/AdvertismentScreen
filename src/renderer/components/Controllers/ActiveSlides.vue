<template>
  
  <div>
    <h2 class="text-center">Slides Activos</h2>
    <div class="contenedor">
        <div class="inner">
            <small-slide v-for="(t, key) in slides" :key="key" :num="key" :id="key" 
                :imgUri="t"
                @activador="Desactivacion(key)"
            ></small-slide>
        </div>
    </div>     
  </div>

</template>

<script>
import SmallSlide from './SmallSlide'
import ExtensionCheck from './extensionCheck'
const ipcRenderer = require('electron').ipcRenderer;
const fs = require('fs');
const path = require('path');
const fileExtension = require('file-extension')
const extension = new ExtensionCheck();

export default {
  name: 'active-slides',
  components: {
      SmallSlide
  },
  data(){
      return {
          pathToFolder: '',
          inactiveFolder: '',
          slides: [],
      };
  },
  methods: {
    loadElements(){
        this.slides = new Array();
        fs.readdir(this.pathToFolder, (err, files) => {
                files.forEach(file => {
                let f = file.split(' ').join('%20');
                if(extension.allowed(fileExtension(f))){
                let p = path.join(this.pathToFolder, f);
                if(!this.slides.includes(p))
                    this.slides.push(p);
            }
        });
     });
    },
    Desactivacion(key){
        let imgPth = this.slides[key];
        let name = path.basename(imgPth);
        let dest = path.resolve(this.inactiveFolder, name);
        fs.rename(imgPth, dest, err => {
            if(err) throw err;
            else {
                console.log("Moved Succesfully");
            }
        })
    }
  },
  created(){
      
  },
  mounted(){
        this.pathToFolder = window.options.ActiveSlides
        this.inactiveFolder = window.options.InactiveSlides
        this.loadElements();

        fs.watch(this.pathToFolder,{encoding: 'buffer'}, (eventType, filename) => {
                this.loadElements();
                //console.log(eventType);
        })
  }
}
</script>

<style scoped>
    .contenedor{
        width: 100%;
        height: 155px;
        overflow-y: hidden;
        overflow-x: auto;
        border: none;
        border-radius: 5px;
        box-shadow: inset black 0px 0px 5px;
        background-color: rgba(227,241,255,0.9);
        padding-top: 10px;
        padding-left: 4px;
        padding-right: 10px;
        display: inline-block;
        white-space: nowrap;
    }
    div.inner{
        width: inherit;
        height: auto;
        margin-bottom: 5px;
        overflow: hidden;
        overflow-x: auto;
        white-space: nowrap;
    }
</style>
