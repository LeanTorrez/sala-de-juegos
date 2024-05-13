import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  faLock, faDoorOpen, faPencil, } from '@fortawesome/free-solid-svg-icons';
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../modules/auth.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //ICONS FONT AWESOME
  faCarta = faEnvelope;
  faLock = faLock;
  faDoor = faDoorOpen;
  faPencil = faPencil;
  
  constructor(
    private authFire:AuthService,
    private toast: ToastrService
  ){}

  public email!:string;
  public clave!:string;

  login(){

    if(this.verificarVacio(this.email) && this.verificarVacio(this.clave) ) return this.toast.info("Relleno lo campos de email o clave","Error");

    if(!this.verificarMinimoContraseña(this.clave)) return this.toast.info("La clave necesita tener mas de 5 caracteres","Error");

    if(this.verificarEmail(this.email) == null) return this.toast.info("El formato del email es invalido",'Error');

    this.authFire.login(this.email, this.clave);
    return true;
  }

  verificarVacio(dato:string){
    return dato == undefined || dato == "";
  }

  verificarEmail(email:string){
    if(email == undefined) return null;
    
    return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  verificarMinimoContraseña(clave:string){
    if(clave == undefined) return false;
    return clave.length >= 6;
  }

  usuario(n:number){
    switch(n){
      case 1:
        this.email = "lean@yahoo.com";
        this.clave = "asd123";
        break;
      case 2:
        this.email = "juan@gmail.com";
        this.clave = "asd123";
        break;
      case 3:
        this.email = "nico@hotmail.com";
        this.clave = "asd123";
        break;
    }
  }
}
