<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img
            src="img/avatars/6.jpg"
            class="c-avatar-img "
          />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>usuario</strong>
    </CDropdownHeader>
    
  

    <CDropdownItem @click="Salir">
      <CIcon name="cil-lock-locked"  /> Salir
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import EventBus from "@/assets/js/EventBus";
export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return { 
      itemsCount: 42
    }
  },
  methods:{
    Salir(){
         this.$session.destroy();
         window.localStorage.clear();
         //this.$router.push({ name: "Login"})
         this.$router.push({name: "Login"}).catch(err => {
            if (
              err.name !== 'NavigationDuplicated' &&
              !err.message.includes('Evitó la navegación redundante a la ubicación actual')
            ) {              
              console(err);
            }
        });
         EventBus.$emit("Reload");
    }
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>