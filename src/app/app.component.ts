import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './component/nav/nav.component';
import { ChatComponent } from './component/chat/chat.component';
import {AuthService} from "./modules/auth.service";
/* import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2'; */

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavComponent,ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sala-de-juego';
  public chat:boolean = true;
  
  constructor(public auth:AuthService){

  }

  esconderChat($event:boolean){
    this.chat = $event;
  }
  
  mostrarChat(){
    this.chat = true;
  }
}
