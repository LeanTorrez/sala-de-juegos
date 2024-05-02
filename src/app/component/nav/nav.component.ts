import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../modules/auth.service';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(public authFire : AuthService){
  }
}
