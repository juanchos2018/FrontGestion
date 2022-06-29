let tipoUsuario = window.localStorage.getItem("id_tipo");
var modules = [{
  _name: 'CSidebarNavItem',
  name: 'Inicio',
  to: '/inicio/inicio',
  icon: 'cilHome',
}];

console.log(tipoUsuario);
if (tipoUsuario==2) {
      let me = this;
      let item = [];    
      let metodologia={ 
              _name: 'CSidebarNavItem',
              name: 'Metodologia',
              to: '/inicio/metodologia', 
              icon: 'cil-drop'
      }
      let myProyecto={
        _name: 'CSidebarNavItem',
        name: 'Proyecto',    
        to: '/inicio/proyecto',      
        icon: 'cil-pencil'
      }
      let element={ 
        _name: 'CSidebarNavItem',
        name: 'ECS',
        to: '/inicio/elemento', 
        icon: 'cil-drop'
      }

      let Solicitud={ 
        _name: 'CSidebarNavItem',
        name: 'Solicitud',
        to: '/inicio/solicitudlis', 
        icon: 'cil-drop'
      }
      
      modules.push(element);
      modules.push(metodologia);
      modules.push(myProyecto);
      modules.push(Solicitud);
}
 if (tipoUsuario==1) {
  let roles={
    _name: 'CSidebarNavItem',
    name: 'Rol',    
    to: '/inicio/rols',      
    icon: 'cil-pencil'
  }
  let usuarios={
    _name: 'CSidebarNavItem',
    name: 'Usuario',    
    to: '/inicio/usuario',      
    icon: 'cil-pencil'
  }
  let myProyecto={
    _name: 'CSidebarNavItem',
    name: 'Proyecto',    
    to: '/inicio/proyecto',      
    icon: 'cil-pencil'
  }
  let informe={
    _name: 'CSidebarNavItem',
    name: 'Informe',    
    to: '/inicio/informe',      
    icon: 'cil-pencil'
  }
  modules.push(myProyecto);
  modules.push(roles);
  modules.push(usuarios);
  modules.push(informe);

}
if (tipoUsuario==3) { 
  let proyect={
    _name: 'CSidebarNavItem',
    name: 'Proyecto',    
    to: '/inicio/proyectomenber',      
    icon: 'cil-pencil'
  }
  let solicitud={
    _name: 'CSidebarNavItem',
    name: 'Solicitud',    
    to: '/inicio/solicitud',      
    icon: 'cil-pencil'
  }
  let SolicitudEnvidad={
    _name: 'CSidebarNavItem',
    name: 'SolicitudEnviada',    
    to: '/inicio/solicitudenviada',      
    icon: 'cil-pencil'
  }
  modules.push(proyect);
  modules.push(solicitud);
  modules.push(SolicitudEnvidad);

}

export default [
  {
    _name: 'CSidebarNav',
    _children:modules
  }
]