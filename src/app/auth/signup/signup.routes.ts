import { Routes } from "@angular/router";
import { SignupComponent } from "./signup.component";

export const SIGNUP_ROUTES: Routes = [
    {
        path: '',
        component: SignupComponent
    },
    {
        path: 'otp',
        loadComponent: () => import('./pages/otp/otp.component').then(c => c.OtpComponent),
    }
]