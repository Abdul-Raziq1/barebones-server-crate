import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserProductComponent } from '../../../shared/components/user-product/user-product.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
