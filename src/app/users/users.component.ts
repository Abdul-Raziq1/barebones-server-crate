import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../core/components/header/header.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

}
