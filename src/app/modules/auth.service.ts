import { inject, Injectable } from '@angular/core';
import { AngularFireAuth} from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
import { addDoc, collection, collectionData, Firestore} from "@angular/fire/firestore";
//import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public enSesion: boolean = false;
  public emailUsuario!:string | null | undefined;
  public userUid!: string | null | undefined;
  toast = inject(ToastrService);

  constructor(
    private authFire:AngularFireAuth,
    private router :Router,
    private fireStore: Firestore
  ){
  }


  //get user logged fijarse

  async login(email:string,clave:string){
    this.authFire.signInWithEmailAndPassword(email, clave).then((user) => {
      this.enSesion = true;
      this.emailUsuario = user.user?.email;
      this.userUid = user.user?.uid;

      let col = collection(this.fireStore,"logins");
      addDoc(col, {"usuario": this.emailUsuario, "fecha-ingreso" : new Date});

      this.router.navigate(['/home']);
    }, err => {
      console.log(err.code);
      this.toast.error(this.errores(err.code),"error");
    })
  }

  async registrar(email:string,clave:string){
    this.authFire.createUserWithEmailAndPassword(email,clave)
    .then(user => {
      this.enSesion = true;
      this.emailUsuario = user.user?.email;
      this.userUid = user.user?.uid;

      let col = collection(this.fireStore,"logins");
      addDoc(col, {"usuario": this.emailUsuario, "fecha-ingreso" : new Date});
      
      this.router.navigate(['/home']);
    }, err => {
      console.log(err.code);
      this.toast.error(this.errores(err.code),"error");
    })
  }

  errores(error:string){
    let mensaje :string = "";
    switch(error){
      case "auth/invalid-email":
      case "auth/wrong-password":
      case "auth/invalid-credential":
        mensaje = "Clave o Email incorrectos";
        break;
      case "auth/user-not-found":
        mensaje = "Usuario no existente";
        break;
      case "auth/too-many-requests":
        mensaje = "Error en la conexion al servidor";
        break;
      case "auth/email-already-in-use":
        mensaje = "El email que ingreso ya esta registrado";
        break;
    }
    return mensaje;
  }

  desloguear(){
    this.enSesion = false;
    this.emailUsuario = undefined;
    this.userUid = undefined;
  }
}
