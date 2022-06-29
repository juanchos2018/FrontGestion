<template>
  <div>
    <CRow>
      <CCol lg="12">
        <CTableWrapper :items="items"    v-on:ListInforme="ListInforme"  >
          <template #header>
            <CIcon name="cil-grid"/> Informe
            <div class="card-header-actions">
              <a 
                href="https://coreui.io/vue/docs/components/nav" 
                class="card-header-action" 
                rel="noreferrer noopener" 
                target="_blank"
              >
                <small class="text-muted">algo</small>
              </a>
            </div>
          </template>
        </CTableWrapper>
      </CCol>    
    </CRow> 
   
  </div>
</template>

<script>

const axios = require("axios").default;
import EventBus from '@/assets/js/EventBus';

import { mapState } from "vuex";
import CTableWrapper from './components/Table'

export default {
  name: 'Tables',
  components: { CTableWrapper },

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
    this.id_usuario=localStorage.id_usuario;
    if(localStorage.id_tipo) this.modelo.id_usuario = localStorage.id_usuario;
    this.ListInforme();
  },
  methods: {     
    crearIforme(id,id_proyecto,id_usuario){
      console.log("idwe :",id);
      //EventBus.$emit("ModalInforme",id,id_proyecto,id_usuario);
    },
    CerrarModal() {
      this.primaryModal = false;
    },
    ListInforme(){  
     let me=this;
     let url = this.url_base + "informe";
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
