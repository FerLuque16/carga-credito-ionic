import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ScannerService } from 'src/app/services/scanner.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { ToastController } from '@ionic/angular';
// import { ScannerService } from 'src/app//services/scanner.service';
// import { AuthService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  cargando : boolean = true
  usuario : any;
  noCarga : boolean = true;
  tope : number = 0; 
  constructor(private auth: AuthService, private userService:UsuariosService, private router:Router,
    public scanner:ScannerService, public toastController : ToastController) {
    // userService.traerUsuarios().subscribe(users =>{
    //   users.forEach(user =>{
    //     if(this.auth.actualEmail == user.correo){
    //       this.usuario = user;
    //     }
    //   })
    // })
    this.userService.traerUsuarios().subscribe(users => {
      //console.log(users);
      users.forEach(user => {
        if(this.auth.actualEmail == user.correo){
          this.usuario = user;
          this.tope = this.usuario.perfil == 'admin' ? 320 : 160;
          this.noCarga = this.usuario.credito == this.tope;
        }
      });
    })
    setTimeout(() => {
      this.cargando = false;
    }, 2000);
   }

  ngOnInit() {
  }

  cargarCredito(){
    let codigo : any;
    this.scanner.scan().then((a)=>{
      codigo = a
      this.scanner.stopScan();
      switch (codigo) {      
        case '8c95def646b6127282ed50454b73240300dccabc':
          if(this.usuario.perfil == 'admin'){
            if(this.usuario.credito10 == 2){
              this.cargaMaxima(true);
              return
            }else{
              this.usuario.credito10++;
              this.usuario.credito += 10;
            }
          }else{
            if(this.usuario.credito10 == 1){
              this.cargaMaxima(false);
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
              this.cargaMaxima(true);
              return
            }else{
              this.usuario.credito50++;
              this.usuario.credito += 50;
            }
          }else{
            if(this.usuario.credito50 == 1){
              this.cargaMaxima(false);
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
              this.cargaMaxima(true);
              return;
            }else{
              this.usuario.credito100++;
              this.usuario.credito += 100;
            }
          }else{
            if(this.usuario.credito100 == 1){
              this.cargaMaxima(false);
              return;
            }else{
              this.usuario.credito100++;
              this.usuario.credito += 100;
            }
          }        
          break;
      }    
      this.userService.actualizarUsuario(this.usuario,this.usuario.uid)
    })
  }

  vaciarCredito(){

    

    Swal.fire({
      title: '¿Estas seguro que querés borrar los créditos?',
      text: "No podrás revertirlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, borrar',
      heightAuto:false
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuario.credito10 = 0
        this.usuario.credito50 = 0
        this.usuario.credito100 = 0
        this.usuario.credito = 0
        this.userService.actualizarUsuario(this.usuario,this.usuario.uid)
        Swal.fire({
          title:'Borrado!',
          text: 'Los créditos fueron borrados.',
          icon:'success',
          heightAuto:false
        }
          
          
          
        )
      }
    })


    
  }

  cargaMaxima(isAdmin : boolean){    
    Swal.fire({
      title: 'Máxima carga alcanzada.',
      icon: 'error',
      text: `Solo podés cargar ${isAdmin ? 2+' veces' : 1+' vez'} esta cantidad.`,
      confirmButtonText: "Aceptar",
      confirmButtonColor: '#7e34bc',
      background: '#233a66',
      color: '#FFFFFF',
      heightAuto: false
    });
    return
  }

  cerrarSesion(){

    console.log('Entré');
    this.auth.logout();
    this.router.navigateByUrl('auth');
  }

}
