import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  #http = inject(HttpClient)
  #baseUrl = environment.baseUrl
  constructor() { }

  getFeaturedProducts() {
    return this.#http.get(`${this.#baseUrl}/featured`)
  }
}
