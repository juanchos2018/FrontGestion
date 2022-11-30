<template>
  <div>
    <CRow>
      <CCol lg="12">
        <CTableWrapper :items="items"  :id_usuario="modelo.id_usuario"  v-on:crearinforme="crearIforme"  v-on:dialogoInforme="dialogoIforme"  >
          <template #header>
            <CIcon name="cil-grid"/> Solicitudess
          
          </template>
        </CTableWrapper>
      </CCol>    
    </CRow> 
      <modal-informe @CerrarModal="CerrarModal"    v-on:ListSolicitud="ListSolicitud" />
      <dialogo-informe @CerrarModal="CerrarModal"     />
  </div>
</template>

<script>

const axios = require("axios").default;
import EventBus from '@/assets/js/EventBus';

import { mapState } from "vuex";
import CTableWrapper from './components/Table'
import usersData from '../users/UsersData'
import ModalInforme from './components/ModalInfome.vue';
import DialogoInforme from './components/DialogoInforme.vue';
export default {
  name: 'Tables',
  components: { CTableWrapper,ModalInforme,DialogoInforme},

  data(){
      return{
          items:[],
          modelo:{id_usuario:0}
      }
  },
  computed: {
    ...mapState(["url_base"])  
  },
  mounted(){        
   // this.id_usuario=localStorage.id_usuario;
    if(localStorage.id_tipo) this.modelo.id_usuario = localStorage.id_usuario;
    this.ListSolicitud();
  },
  methods: {
    shuffleArray (array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return array
    },
    getShuffledUsersData () {
      return this.shuffleArray(usersData.slice(0))
    },
    crearIforme(id,id_proyecto,id_usuario){
      console.log("idwe :",id);
      EventBus.$emit("ModalInforme",id,id_proyecto,id_usuario);
    },
    dialogoIforme(id,id_proyecto,id_usuario){
      console.log("idwe :",id);
      EventBus.$emit("DialogoInforme",id,id_proyecto,id_usuario);
    },
    CerrarModal() {
      this.primaryModal = false;
    },
    ListSolicitud(){  

     let me=this;
     let url = this.url_base + "solicitud-jefedos/"+me.modelo.id_usuario;
     axios({
            method: "GET",
            url: url, 
        })
        .then(function (response) {
          
        if (response.data.status == 200) {       
            me.items = response.data.result;
        } else {      
            alert("lista vacia");            
           }
        })
    }
  }
}
</script>
