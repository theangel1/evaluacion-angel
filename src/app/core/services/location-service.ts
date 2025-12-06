import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../interfaces/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {

    private http = inject(HttpClient)
  private baseUrl = environment.apiUrl


  getLocations() {
    return  this.http.get<ApiResponse>(this.baseUrl + "location")
  }

  
}
