import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../modules/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock, faDoorOpen, faPencil } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  //ICONS FONT AWESOME
  faCarta = faEnvelope;
  faLock = faLock;
  faDoor = faDoorOpen;
  faPencil = faPencil;
  //Inject
  
  constructor(private authFire:AuthService,
    private toast : ToastrService,
  ){
  }

  public email!:string;
  public clave!:string;

  registrar(){
    if(this.verificarVacio(this.email) && this.verificarVacio(this.clave) ) return this.toast.info("Relleno lo campos de email o clave","Error");

    if(!this.verificarMinimoContraseña(this.clave)) return this.toast.info("La clave necesita tener mas de 5 caracteres","Error");

    if(this.verificarEmail(this.email) == null) return this.toast.info("El formato del email es invalido",'Error');


    this.authFire.registrar(this.email,this.clave);
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
}
