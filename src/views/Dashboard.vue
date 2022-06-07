<template>
  <div>   
    <CCard>
      <CCardBody>
        <CRow>       
          <CCol sm="4" v-for="item  in itemGragicoOne" :key="item.id_proyecto">
            <label>{{item.nombre_proyecto}}</label>
            <CChartDoughnut       
            :datasets="item.background"   
            :width="width"    
            :labels="item.labels"
            />
          </CCol>
        </CRow>
      </CCardBody>   
    </CCard>   
  </div>
</template>

<script>
import MainChartExample from './charts/MainChartExample'
import WidgetsDropdown from './widgets/WidgetsDropdown'
import WidgetsBrand from './widgets/WidgetsBrand'
import { CChartDoughnut } from '@coreui/vue-chartjs'
const axios = require("axios").default;
import EventBus from '@/assets/js/EventBus';

import { mapState } from "vuex";
export default {
  name: 'Dashboard',
  components: {
    MainChartExample,
    WidgetsDropdown,
    WidgetsBrand,
    CChartDoughnut
  },
  data () {
    return {
      itemGragicoOne:[],
      width: {
      type: Number,
      default: 100,
      required: false,
    },
    selected: 'Month',     
    tableFields: [
        { key: 'avatar', label: '', _classes: 'text-center' },
        { key: 'user' },
        { key: 'country', _classes: 'text-center' },
        { key: 'usage' },
        { key: 'payment', label: 'Payment method', _classes: 'text-center' },
        { key: 'activity' },
      ],
      
    }
  },
  mounted(){
    this.getTareas();
  },
   computed: {
    ...mapState(["url_base"]),   
  },
  created(){
    //  if (!this.$session.exists()) {
    //   this.$router.push({path: 'pages/login'}).catch(err => {
    //         if (
    //           err.name !== 'NavigationDuplicated' &&
    //           !err.message.includes('Evitó la navegación redundante a la ubicación actual')
    //         ) {              
    //           console(err);
    //         }
    //     });
    //  }
  },
  methods: {
    getTareas(){
     let me=this;
     let url = me.url_base + "proyecto-graficone";
        axios({
            method: "GET",
            url: url, 
        })
        .then(function (response) {
           // console.log(response)
            me.itemGragicoOne=response.data.result;

      })
    },   
  }
}
</script>
