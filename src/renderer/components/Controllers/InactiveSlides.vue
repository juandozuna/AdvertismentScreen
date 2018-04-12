<template>
  
  <div>
    <h2 class="text-center">Slides Inactivos</h2>
    <div class="contenedor">
        <div class="inner">
            <small-slide v-for="(t, key) in slides" :key="key" :num="key" :id="key"
                :imgUri="t"
            ></small-slide>
        </div>
    </div>     
  </div>

</template>

<script>
import SmallSlide from './SmallSlide'
import ExtensionCheck from './extensionCheck'
const fs = require('fs');
const path = require('path');
const fileExtension = require('file-extension');
const extension = new ExtensionCheck();

export default {
  name: 'inactive-slides',
  components: {
      SmallSlide
  },
  data(){
      return {
        pathToFolder: '',
        slides: []
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
    }
  },
  mounted(){
    this.pathToFolder = window.options.InactiveSlides
    this.loadElements();

    fs.watch(this.pathToFolder,{encoding: 'buffer'}, (eventType, filename) => {
        this.loadElements();
        console.log(eventType);
    })
      
  }
}
</script>

<style scoped>
    .contenedor{
        width: 100%;
        height: 155px;
        overflow-y: hidden;
        overflow-x: hidden;
        border: none;
        border-radius: 5px;
        box-shadow: inset black 0px 0px 5px;
        background-color: rgba(255, 202, 211, 0.9);
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
