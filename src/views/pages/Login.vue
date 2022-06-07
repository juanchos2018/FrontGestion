<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Inicio de  Sesion</h1>
                  <p class="text-muted">Ingrese su Cuenta</p>
                  <CInput
                    placeholder="Correo"
                    autocomplete="username email"
                    v-model="model.correo_usuario"
                  >
                    <template #prepend-content><CIcon name="cil-user"/></template>
                  </CInput>
                  <CInput
                    placeholder="Contraseña"
                    type="password"
                    autocomplete="curent-password"
                      v-model="model.password_usuario"
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton color="primary" class="px-4" @click="Login" >Ingresar</CButton>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <!-- <CButton color="link" class="px-0">Forgot password?</CButton> -->
                      <!-- <CButton color="link" class="d-lg-none">Register now!</CButton> -->
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Sistema de Gestion de la Configuracion</h2>
                <p>Ingenieria de  Sistemas</p>                
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>

const axios = require("axios").default;
import { mapState } from "vuex";
import EventBus from "@/assets/js/EventBus";
export default {
  name: 'Login',
  data(){
    return {
        model: {correo_usuario:'pedro@gmail.com',password_usuario:''}
    } 
  },
  computed: {
    ...mapState(["url_base"])  
  },
  created(){
   // window.location.reload()
  },
  mounted(){
     EventBus.$on('Reload', () => {
      this.reload(); 
      console.log("reload")
    });
  },
  methods:{
    reload(){
      window.location.reload()
    },
    Login(){
         let me =this;  
        if (me.model.correo_usuario=="") {
            alert("ingrear su correo")
        }
        else if(me.model.password_usuario==""){
            alert("ingrear su constraseña")
        }
        else{       
            let data=me.model;   
            // url_base:'http://localhost:8000/', 
            let url = me.url_base + "authenticate";
          axios({
              method: "POST",
              url: url,
              data: data,
            })
          .then(function (response) {
           // console.log(response);
            if (response.data.status == 200) {
                window.localStorage.clear();
                window.localStorage.setItem("nombre", response.data.result.nombre_usuario);
                window.localStorage.setItem("id_tipo", response.data.result.id_tipo);
                window.localStorage.setItem("tipoUsuario", response.data.result.nombre_tipo);
                window.localStorage.setItem("id_usuario", response.data.result.id_usuario)
                //this.$store.dispatch("guardarDatos",response.data.result.nombre_usuario)      
                // this.$store.dispatch("guardarTipo",response.data.result.id_tipo)    
                // this.$store.dispatch("guardarTipoUsuario",response.data.result.nombre_tipo)    
                //this.$store.dispatch("guardarIdUsuario",response.result.data.id_usuario)      
                me.$session.start()
                me.$router.push({ name: "Home"})
                // me.$router.push('/').catch(err => {         
                //   if ( err.name !== 'NavigationDuplicated' && !err.message.includes('Avoided redundant navigation to current location')) {                     
                //       console.log(err);
                //      }
                //  });
              //Swal.fire({ icon: 'success', text: 'Se ha registrado el nuevo establecimiento', timer: 3000,})
            } else {
            /// Swal.fire({ icon: 'error', text: 'A ocurrido un error e', timer: 3000,})
              alert(response.data.message);
            }
            ///me.isLoading = false;
          }).catch((error) => {
              console.log(error)
              //Swal.fire({ icon: 'error', text: 'A ocurrido un error cat', timer: 3000,})
          });   
        }
    }
  }
}
</script>
