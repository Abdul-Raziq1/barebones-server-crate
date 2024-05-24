import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { injectUserQuery } from '../../../core/util/angularQueries';
import { JsonPipe } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [JsonPipe, LoaderComponent],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  user = injectUserQuery()
}
