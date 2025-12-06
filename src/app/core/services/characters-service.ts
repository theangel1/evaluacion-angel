import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse, Character } from '../interfaces/character';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private http = inject(HttpClient)
  private baseUrl = environment.apiUrl


  getCharacters() {
    return  this.http.get<ApiResponse>(this.baseUrl + "character")
  }

  getCharacterById(id: string) {
    return  this.http.get<Character>(this.baseUrl + "character/" + id)
  }

}
