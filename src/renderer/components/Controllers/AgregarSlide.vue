<template>

    <div class="modal fade" id="agregarModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Agregar Slide</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        
            <div class="modal-body">
            <form @submit.prevent="submit">
                <div class="row">
                    <div class="col-8">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Nombre Slide</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nombre del Slide">
                        </div>
                        <div class="input-group">
                            <div class="custom-file">
                                <input type="file" class="" id="inputGroupFile04">
                                <label class="custom-file-label" for="inputGroupFile04">Elegir Archivo</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <img src="http://via.placeholder.com/300" width="100%" height="inherit" alt="">
                    </div>
                </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="submit">Guardar Slide</button>
            </div>
        
        </div>
    </div>
        
    </div>

</template>


<script>
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
export default {
  name: 'agregar-slide',
  data(){
      return {};
  },
  methods: {
      submit(){
          
          ipcRenderer.send('added-slide', "Slide Agregado");

          $('#agregarModal').modal('hide');

      }
  },
  created(){
  }
}
</script>
