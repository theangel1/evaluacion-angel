import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RickMortyService } from '../../core/services/rick-morty-service';
import { RickAndMortyApiRoot } from '../../core/interfaces/rickAndMortyApiRoot ';

@Component({
  selector: 'app-url-list',
  imports: [CardModule],
  templateUrl: './url-list.html',
  styleUrl: './url-list.scss',
})


export class UrlList implements OnInit {
  rickMortyService = inject(RickMortyService)
  apiRoot: RickAndMortyApiRoot = { locations: '', characters: '', episodes: '' };

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    this.rickMortyService.getApiUrls().subscribe(response => {
      this.apiRoot = response;
    });
  }

}
