<template>
    <CModal
      title="Informe"
      :show.sync="Show"
      color="primary"
      @hide="CerrarModal"
      footer="false" 
    >
 
    <CInput
            label="Descipcion"
            placeholder="Ingrese Descipcion"
            v-model="model.descripcion"
      />

    <CInput
            label="tiempo"
            placeholder="Ingrese timepo"
            v-model="model.timepo"
      />

      <CInput
            label="impacto"
            placeholder="Ingrese impacto"
            v-model="model.impacto"
      />
   
       <template #footer>
        <CButton color="danger" @click="CerrarModal" >Cerrar</CButton>
        <CButton  color="success" @click="Registrar" >Guardar</CButton>
      </template>
   
    </CModal>
</template>

<script>
import EventBus from "@/assets/js/EventBus";
import { mapState } from "vuex";
const axios = require("axios").default;

export default {
 name: 'modal-fase',
 props: {},
  data () {
    return {    
       primaryModal1: false,
       Show : false   ,
       model:{descripcion:'',timepo:null,costo:0,impacto:null,fecha:null,estado:'Nuevo',id_solicitud:null,id_proyecto:null,id_usuario:null},      
    }
  },
  mounted () {
    EventBus.$on('ModalInforme', (id,id_proyecto,id_usuario) => {
      this.Show = true;    
      this.model.id_solicitud=id;
      this.model.id_proyecto=id_proyecto;
      this.model.id_usuario=id_usuario;
    });
  },  
  computed: {
    ...mapState(["url_base"])  
  },
  methods: {
      CerrarModal(){              
          this.Show = false;    
      }, 
      Registrar(){
        let me =this;  
        if (me.model.descripcion=="") {
            alert("nombre fase llenar")
        }else{
        let data = me.model;    
        let url  = me.url_base + "informe";
       axios({
          method: "POST",
          url: url,
          data: data,
        })
          .then(function (response) {
            if (response.data.status == 200) {
              me.Show = false; 
              me.listar();
            } else {
              alert(response.data.message);
            }
          }).catch((error) => {
              console.log(error)
          });   
        }             
      }, 
      listar(){
       this.$emit("ListSolicitud");
      }
  }
}
</script>

<style>

</style>