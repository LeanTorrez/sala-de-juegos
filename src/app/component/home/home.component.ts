import { Component } from '@angular/core';
import { AuthService } from '../../modules/auth.service';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public enSesion:boolean = false;
  public login: boolean = true;

  faPencil = faPencil;

  constructor(public authFire: AuthService){
    
  }
}
