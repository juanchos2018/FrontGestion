<template>
<div>

   <CRow>
      <CCol col>  

  <CCard >
    <CCardHeader>
      <slot name="header">      
        <CIcon name="cil-grid"/> {{caption}}
      </slot>
    </CCardHeader>
    <CCardBody >
 
         <!-- <div class="table-responsive mt-3 height-table">
              <table class="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th width="5%" class="text-center">#</th>
                    <th width="6%" class="text-center">Proyecto</th>
                    <th width="43%" class="text-center">Jefe</th>
                    <th width="10%" class="text-center">Impacto</th>
                    <th width="10%" class="text-center">Tiempo</th>
                    <th width="23%" class="text-center">Estado</th>
                 
                    <th width="8%" class="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody v-for="(item, it) in items" :key="item.id_informe">
                  <tr>
                    <td class="text-center">{{ it + 1 }}</td>
                    <td class="text-center"> {{ item.nombre_proyecto }}</td>
                    <td class="text-left"> {{ item.nombre_usuario }}</td>
                    <td class="text-left"> {{ item.impacto }}</td>
                    <td class="text-left"> {{ item.timepo }}</td>
                
                    <td class="text-center">
                      <b-badge v-if="item.esetado == 'Nuevo'" variant="success">Nuevo</b-badge>
                      <b-badge v-if="item.esetado == 'aaa'" variant="danger">Anulado</b-badge>
                    </td>
                    <td class="text-center">
                      <b-dropdown bloque size="sm" text="Acciones" right>
                        <b-dropdown-item  @click="VerDocumento(item.id_informe)">Editar</b-dropdown-item>
                        <b-dropdown-item  @click="VerDocumento(item.id_informe)">Ver</b-dropdown-item>
                        <b-dropdown-item  @click="VerDocumento(item.id_informe)">Eliminar</b-dropdown-item>
                      </b-dropdown>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> -->

           
      <CDataTable       
        :items="items"
        :fields="fields"
        :items-per-page="small ? 10 : 5"     
        pagination
      >
        <template #estado="{item}">
          <td>
            <CBadge :color="getBadge(item.estado)">{{item.estado}}</CBadge>
          </td>
        </template>
        <template #linkdocumento="{item}">
          <td>                 
         
              <b-dropdown bloque size="sm" text="Acciones" right>
                    <b-dropdown-item @click="VerDocumento(item)">Ver</b-dropdown-item>
                    <b-dropdown-item  v-if="item.estado=='Nuevo'" @click="Update(item,'Aprobado')">Aprobar</b-dropdown-item>
                    <b-dropdown-item  v-if="item.estado=='Nuevo'"  @click="Update(item,'Anulado')">Rechazar</b-dropdown-item>
                  </b-dropdown>  
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
 </CCol>
    </CRow>
   <b-card title="Card title" sub-title="Card subtitle"  style="height: 840px;">
    <!-- <CDataTable
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
        style="height: 840px;"
      >
        <template #estado="{item}">
          <td>
            <CBadge :color="getBadge(item.estado)">{{item.estado}}</CBadge>
          </td>
        </template>
        <template #linkdocumento="{item}">
          <td>                 
        
              <b-dropdown bloque size="sm" text="Acciones" right>
                    <b-dropdown-item @click="VerDocumento(item)">Ver</b-dropdown-item>
                    <b-dropdown-item >Aprobar</b-dropdown-item>
                    <b-dropdown-item >Rechazar</b-dropdown-item>
                  </b-dropdown>  
          </td>
        </template>
      </CDataTable> -->
  </b-card>
</div>
</template>

<script>
const axios = require("axios").default;
import { mapState } from "vuex";
export default {
  name: 'Table',
  props: {
  
    items: Array,
    fields: {
      type: Array,
      default () {  
        return [  { label:"Proyecto", key: 'nombre_proyecto', sortable: false },
                  { label:"Jefe", key: 'nombre_usuario', sortable: false },    
                  { label:"Impacto", key: 'impacto', sortable: false },
                  { label:"Tiempo", key: 'timepo', sortable: false },
                  { label:"Estado", key: 'estado', sortable: false },                
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
    getBadge (estado) {    
      return estado == 'Aceptado' ? 'success'
        : estado == 'Nuevo' ? 'secondary'
          : estado == 'Revision' ? 'warning'
            : estado == 'Rechazado' ? 'danger' : 'primary'
    },  
    VerDocumento(item) {       
        let url = this.url_base + "informe-pdf/"+item.id_informe;        
        window.open(url,'_blank');
    },
    Update(item,estado){
     let me=this;
     let data={
      id_informe:item.id_informe,
      estado:estado
     }
     let url = this.url_base + "informe";
     axios({
            method: "PUT",
            url: url, 
            data:data
        })
        .then(function (response) {
            console.log(response)
            me.listar();
           alert(response.status)
        })
    },
  listar(){
   this.$emit('ListInforme')
  },
    CrearInforme(item){
      //console.log(item);
      this.$emit('crearinforme',item.id_solicitud,item.id_proyecto,this.id_usuario)
    }
  }
}
</script>
