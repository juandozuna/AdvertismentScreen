<template>
  <div id="app"  class="" >
    

    <router-view></router-view>
    
  </div>
</template>

<script>
  import remote from 'electron'
  export default {
    name: 'ads-screens',
    data(){
      return {
        title: 'Ad Screens',
        logo: '~@/assets/logo.png'
      }
    },
    created(){
      
    }
  }
</script>

<style>
  /* CSS */
  
</style>
