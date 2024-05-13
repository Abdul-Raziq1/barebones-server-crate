import { FormControl } from "@angular/forms";

export interface SignUpFormData {
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
}

export interface UserSignup {
    firstName: string;
    lastName: string;
    email: string;
    password: string
}