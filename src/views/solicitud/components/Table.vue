<template>
  <CCard>
    <CCardHeader>
      <slot name="header">      
        <CIcon name="cil-grid"/> {{caption}}
      </slot>
    </CCardHeader>
    <CCardBody>
        <p>idusaruio {{id_usuario}}</p>
      <CDataTable
        :hover="hover"
        :striped="striped"
        :border="border"
        :small="small"
        :fixed="fixed"
        :items="items"
        :fields="fields"
        :items-per-page="small ? 10 : 5"
        :dark="dark"
        pagination
      >
        <template #estado2="{item}">
          <td>
            <CBadge :color="getBadge(item.estado2)">{{item.estado2}}</CBadge>
          </td>
        </template>
        <template #linkdocumento="{item}">
          <td>                 
            <CButton type="button" color="info"  @click="VerDocumento(item)" style="margin-right:5px" >Ver</CButton>
            <CButton v-if="esJefe && item.estado==null" type="button" color="info"  @click="CrearInforme(item)">Crear Informe</CButton>
            <CButton v-if="esJefe && item.estado=='Aprobado'" type="button" color="info"  @click="dialogoInforme(item)">Ver Informe</CButton>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>

import { mapState } from "vuex";
export default {
  name: 'Table',
  props: {
    id_usuario:'',
    items: Array,
    fields: {
      type: Array,
      default () {
        return [  { label:"Codigo", key: 'id_solicitud', sortable: false },
                  { label:"Fecha", key: 'fecha', sortable: false },    
                  { label:"Objetico", key: 'objetivo', sortable: false },
                  { label:"Proyecto", key: 'nombre_proyecto', sortable: false },
                  { label:"Estado", key: 'estado2', sortable: false },                
                  { label:"Documento", key: 'linkdocumento', sortable: false }]
      },   
    },
    caption: {
      type: String,
      default: 'Table'
    },
    hover: Boolean,
    striped: Boolean,
    border: Boolean,
    small: Boolean,
    fixed: Boolean,
    dark: Boolean
  },
  computed: {
    ...mapState(["url_base"]),
       esAdministrador(){
      return localStorage.tipoUsuario =='Administrador';
    },
     esMiembro(){
      return  localStorage.tipoUsuario =='Miembro';
    },
    esJefe(){
      return  localStorage.tipoUsuario =='Jefe';
    }
  },
  methods: {
    getBadge (estado2) {    
      return estado2 == 'Aceptado' ? 'success'
        : estado2 == 'Nuevo' ? 'secondary'
          : estado2 == 'Revision' ? 'warning'
            : estado2 == 'Rechazado' ? 'danger' : 'primary'
    },  
    VerDocumento(item) {       
        let url = this.url_base + "solicitud-pdf/"+item.id_solicitud;        
        window.open(url,'_blank');
    },
    CrearInforme(item){
      //console.log(item);
      this.$emit('crearinforme',item.id_solicitud,item.id_proyecto,this.id_usuario)
    },
     dialogoInforme(item){
      //console.log(item);
      this.$emit('dialogoInforme',item.id_solicitud,item.id_proyecto,this.id_usuario)
    }
  }
}
</script>
