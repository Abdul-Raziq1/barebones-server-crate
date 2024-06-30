import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  CloudinaryModule,
  accessibility,
  lazyload,
  placeholder,
  responsive,
} from '@cloudinary/ng';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { CLOUD_NAME } from '../../../core/util/constants';
import {
  fill,
  fit,
  limitPad,
  minimumFit,
  scale,
} from '@cloudinary/url-gen/actions/resize';

@Component({
  selector: 'app-user-product',
  standalone: true,
  imports: [CloudinaryModule],
  templateUrl: './user-product.component.html',
  styleUrl: './user-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProductComponent implements OnInit {
  img!: CloudinaryImage;
  plugins = [lazyload(), placeholder()];
  ngOnInit(): void {
    const cld = new Cloudinary({
      cloud: {
        cloudName: CLOUD_NAME,
      },
    });
    this.img = cld.image('zcy1e0eyo8picnoj8dia');
    this.img.resize(scale().height(160).aspectRatio('1:1'));
  }
}
