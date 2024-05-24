import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AngularQueryDevtools],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'barebones-server-crate';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    console.log('App component run');
    this.authService.updateAuthStatus()
  }
}
