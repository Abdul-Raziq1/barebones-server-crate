import { Component, inject } from '@angular/core';
import { NgOtpInputModule } from 'ng-otp-input';
import { CountdownComponent } from '../../../../shared/components/countdown/countdown.component';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [NgOtpInputModule, CountdownComponent],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent {
  #authService = inject(AuthService)
  countDownTimer!: string
  otp = new FormControl('', { nonNullable: true })

  resendOtp() {

  }

  resetTimer() {

  }

  verifyEmail() {
    console.log('Verifying email', this.otp.value)
    if (this.otp.value.length === 6) {
      // this.#authService.verifyEmail()
    }
  }
}
