import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { LoadingState } from '../../shared.types';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  loadingState = input.required<LoadingState>()
  @Input() loaderSizeClass: 'loader loader-sm' | 'loader loader-md' = 'loader loader-sm'
}
