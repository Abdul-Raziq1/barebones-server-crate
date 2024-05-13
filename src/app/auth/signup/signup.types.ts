import { FormControl } from "@angular/forms";

export interface SignUpFormData {
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
}