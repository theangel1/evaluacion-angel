import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RickMortyService } from '../../core/services/rick-morty-service';
import { Observable } from 'rxjs';
import { RickMortyUrl } from '../../core/interfaces/rickMortyUrl';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-url-list',
  imports: [CardModule, AsyncPipe],
  templateUrl: './url-list.html',
  styleUrl: './url-list.scss',
})
export class UrlList {
  rickMortyService = inject(RickMortyService)
  protected urls$: Observable<RickMortyUrl>;

  //TODO porq observable?

  
constructor() {

  this.urls$ = this.rickMortyService.getApiUrls();
}
  

}
