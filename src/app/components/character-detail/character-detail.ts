import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Character } from '../../core/interfaces/character';
import { CharactersService } from '../../core/services/characters-service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-character-detail',
  imports: [CardModule, AsyncPipe,PanelModule, AvatarModule, ButtonModule, MenuModule],
  templateUrl: './character-detail.html',
  styleUrl: './character-detail.scss',
})
export class CharacterDetail {
  private characterService = inject(CharactersService)
  protected character$?: Observable<Character>;
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.character$ = this.loadCharacter();
  }

  loadCharacter() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;   
    return this.characterService.getCharacterById(id);
  }

  
}
