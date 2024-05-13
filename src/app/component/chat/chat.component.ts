import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FireStoreService} from "./../../modules/fire-store.service";
import { AuthService} from "./../../modules/auth.service";
import { FormsModule } from '@angular/forms';
import { collection } from 'firebase/firestore';
import { Mensaje } from '../../Interface/Imensaje';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  faEnviado = faPaperPlane;

  public msj!:string;
  public msjArray : any = [];

  @Output() mostrarChat = new EventEmitter<boolean>();

  constructor(
    private fireStore: FireStoreService,
    public auth: AuthService
  ){}

  ngOnInit(){
    this.actualizarChat();
  }

  cerrarChat(){
    this.mostrarChat.emit(false);
  }

  nuevoMensaje(){
    if(this.msj == "") return false;

    this.fireStore.addChat(this.msj, this.auth.emailUsuario);
    this.msj = "";
    return true;
  }

  actualizarChat(){
    const obs = this.fireStore.getObsChat()
    obs.subscribe((respuesta) => {
      console.log(respuesta);
      this.msjArray = respuesta.sort( (b: Mensaje, a: Mensaje) => b.fecha.valueOf() - a.fecha.valueOf()); 

      this.msjArray = respuesta;
      console.log(this.msjArray);
    });
  }
}
