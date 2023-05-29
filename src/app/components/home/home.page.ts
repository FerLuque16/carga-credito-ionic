import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
// import { AuthService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  usuario:any; 
  constructor(private auth: AuthService, private userService:UsuariosService) {
    userService.traerUsuarios().subscribe(users =>{
      users.forEach(user =>{
        if(this.auth.actualEmail == user.correo){
          this.usuario = user;
        }
      })
    })
   }

  ngOnInit() {
  }

  cargarCredito(valor : string){
    switch (valor) {
      
      case '8c95def646b6127282ed50454b73240300dccabc'://cambiar por el codigo qr
        if(this.usuario.perfil == 'admin'){
          if(this.usuario.credito10 == 2){
            // this.cargaMaxima(true);
            alert('No podes cargar mas')
            return
          }else{
            this.usuario.credito10++;
            this.usuario.credito += 10;
          }
        }else{
          if(this.usuario.credito10 == 1){
            alert('No podes cargar mas')
            // this.cargaMaxima(false);
            return
          }else{
            this.usuario.credito10++;
            this.usuario.credito += 10;
          }
        }
        break;

      case 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ':
        if(this.usuario.perfil == 'admin'){
          if(this.usuario.credito50 == 2){
            // this.cargaMaxima(true);
            alert('No podes cargar mas')
            return
          }else{
            this.usuario.credito50++;
            this.usuario.credito += 50;
          }
        }else{
          if(this.usuario.credito50 == 1){
            // this.cargaMaxima(false);
            alert('No podes cargar mas')
            return;
          }else{
            this.usuario.credito50++;
            this.usuario.credito += 50;
          }
        }        
        break;

      case '2786f4877b9091dcad7f35751bfcf5d5ea712b2f':
        if(this.usuario.perfil == 'admin'){
          if(this.usuario.credito100 == 2){
            // this.cargaMaxima(true);
            alert('No podes cargar mas')
            return;
          }else{
            this.usuario.credito100++;
            this.usuario.credito += 100;
          }
        }else{
          if(this.usuario.credito100 == 1){
            // this.cargaMaxima(false);
            alert('No podes cargar mas')
            return;
          }else{
            this.usuario.credito100++;
            this.usuario.credito += 100;
          }
        }        
        break;
    }    
    this.userService.actualizarUsuario(this.usuario,this.usuario.uid)
  }

  vaciarCredito(){
    this.usuario.credito10 = 0
    this.usuario.credito50 = 0
    this.usuario.credito100 = 0
    this.usuario.credito = 0
    this.userService.actualizarUsuario(this.usuario,this.usuario.uid)
  }

}
