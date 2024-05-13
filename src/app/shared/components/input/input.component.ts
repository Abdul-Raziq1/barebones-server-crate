import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
  @Input({ required: true }) control!: FormControl<string>
  @Input({ required: true }) inputName!: string
  @Input({ required: true }) placeholder!: string
  @Input() inputType: string = 'text'
  isInvalid = input<boolean | undefined>(undefined)

}
