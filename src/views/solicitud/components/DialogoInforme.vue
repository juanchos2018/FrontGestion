<template>
    <CModal
      title="Estado informe"
      :show.sync="Show"
      color="primary"
      @hide="CerrarModal"
      footer="false" 
    >
<!-- <p>{{model}}</p> -->
  <label for="">Descripcion</label><br>
   <label for="">{{model.descripcion}}</label> <br>
     <label for="">Tiempo</label><br>
   <label for="">{{model.timepo}}</label><br>
    <label for="">Impacto</label><br>
   <label for="">{{model.impacto}}</label><br>
     <label for="">Estado</label><br>
   <label for="">{{model.estado}}</label><br>    
   
       <template #footer>
        <CButton color="danger" @click="CerrarModal" >Cerrar</CButton>
        <CButton color="success" v-if="model.estado=='Aprobado'"  @click="Aprobar" >APROBAR SOLICITUD</CButton>
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
       model:{descripcion:'',timepo:null,costo:0,impacto:null,fecha:null,estado:'Nuevo',id_solicitud:null,id_proyecto:null,id_usuario:null,estado:null},      
    }
  },
  mounted () {
    EventBus.$on('DialogoInforme', (id,id_proyecto,id_usuario) => {
      this.Show = true;   
      this.model.id_solicitud=id;
      this.ViewInforme(id)  
    });
  },  
  computed: {
    ...mapState(["url_base"])  
  },
  methods: {
      CerrarModal(){              
          this.Show = false;    
      }, 
      ViewInforme(id_solicitud){ 
        let me =this; 
        let url  = me.url_base + "informe-view/"+id_solicitud;
       axios({
          method: "GET",
          url: url,       
        })
          .then(function (response) {
            
            me.model=response.data.result;
          }).catch((error) => {
              console.log(error)
          });  
      },
      Aprobar(){
        let me =this;    
        let data ={id_solicitud:me.model.id_solicitud,estado:'Aprobado',estado2:'Aprobado'};    
        console.log("data:",data);
        let url  = me.url_base + "solicitud-update";
       axios({
          method: "PUT",
          url: url,
          data: data,
        })
          .then(function (response) {
           console.log(response);
          }).catch((error) => {
              console.log(error)
          });   
        }             
      }, 
      listar(){
          this.$emit("ListSolicitud");
      }
  }

</script>

<style>

</style>