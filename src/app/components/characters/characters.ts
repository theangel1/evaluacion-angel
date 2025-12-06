import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CharactersService } from '../../core/services/characters-service';
import { Character } from '../../core/interfaces/character';
import { TableModule } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-characters',
  imports: [CardModule, TableModule, AvatarModule, ButtonModule],
  templateUrl: './characters.html',
  styleUrl: './characters.scss',
})
export class Characters implements OnInit {
  private characterService = inject(CharactersService)
  characters: Character[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    this.characterService.getCharacters().subscribe(response => {
      this.characters = response.results;
    });
  }

  goToDetail(id: number) {
  this.router.navigate(['/character-detail', id]);
}


}
