import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RickMortyUrl } from '../interfaces/rickMortyUrl';
import { bootstrapCheckLg } from '@ng-icons/bootstrap-icons';

@Injectable({
  providedIn: 'root',
})

export class RickMortyService {

  private http = inject(HttpClient)
  private baseUrl = environment.apiUrl

  getApiUrls() {
    return this.http.get<RickMortyUrl>(this.baseUrl + "/api")
  }

}
