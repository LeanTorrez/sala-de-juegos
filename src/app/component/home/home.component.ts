import { Component } from '@angular/core';
import { AuthService } from '../../modules/auth.service';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faComment } from '@fortawesome/free-solid-svg-icons';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule, ChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public enSesion:boolean = false;
  public login: boolean = true;
  public chat:boolean = true;

  faPencil = faPencil;
  faChat = faComment;

  constructor(public authFire: AuthService){
  }

  esconderChat($event:boolean){
    this.chat = $event;
  }
  
  mostrarChat(){
    this.chat = true;
  }
}
