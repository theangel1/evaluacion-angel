// character-detail.component.spec.ts

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AsyncPipe } from '@angular/common';


import { CharactersService } from '../../core/services/characters-service';
import { Character } from '../../core/interfaces/character';

// PrimeNG
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { CharacterDetail } from './character-detail';

describe('CharacterDetail', () => {
  let component: CharacterDetail;
  let fixture: ComponentFixture<CharacterDetail>;
  let characterServiceSpy: jasmine.SpyObj<CharactersService>;

  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Earth (Replacement Dimension)', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [],
    url: '',
    created: '2017-11-04T18:48:46.250Z'
  };

  // Mock del servicio
  const createServiceSpy = () => jasmine.createSpyObj<CharactersService>('CharactersService', ['getCharacterById']);

  beforeEach(async () => {
    characterServiceSpy = createServiceSpy();

    await TestBed.configureTestingModule({
      imports: [
        CharacterDetail,
        AsyncPipe,                 // Necesario para que funcione el async pipe en tests
        NoopAnimationsModule,      // Evita errores de animaciones PrimeNG
        CardModule,
        AvatarModule,
        ButtonModule,
        MenuModule,
        PanelModule
      ],
      providers: [
        { provide: CharactersService, useValue: characterServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: '1' }) } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterDetail);
    component = fixture.componentInstance;
  });

  it('debe crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe llamar a getCharacterById con el ID de la ruta al iniciar', () => {
    characterServiceSpy.getCharacterById.and.returnValue(of(mockCharacter));

    fixture.detectChanges(); // ngOnInit se ejecuta aquí

    expect(characterServiceSpy.getCharacterById).toHaveBeenCalledWith('1');
    expect(characterServiceSpy.getCharacterById).toHaveBeenCalledTimes(1);
  });

  it('debe asignar character$ correctamente', fakeAsync(() => {
    characterServiceSpy.getCharacterById.and.returnValue(of(mockCharacter));

    fixture.detectChanges();
    tick();

    expect(component.character$).toBeDefined();
    component.character$!.subscribe(char => expect(char.name).toBe('Rick Sanchez'));
  }));

  it('debe renderizar el nombre y la imagen cuando llegan los datos', fakeAsync(() => {
    characterServiceSpy.getCharacterById.and.returnValue(of(mockCharacter));

    fixture.detectChanges(); // ngOnInit + suscripción
    tick();                  // observable emite
    fixture.detectChanges(); // AsyncPipe actualiza el DOM

    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Rick Sanchez');

    const img = el.querySelector('p-avatar img, img') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.src).toContain('1.jpeg');
  }));

  // TEST SIN ID EN LA RUTA → SIN overrideProvider
  it('no debe llamar al servicio si no hay ID en la ruta', fakeAsync(() => {
    // Reiniciamos todo con un ActivatedRoute sin ID
    TestBed.resetTestingModule();

    const spy = createServiceSpy();

    TestBed.configureTestingModule({
      imports: [
        CharacterDetail,
        AsyncPipe,
        NoopAnimationsModule,
        CardModule, AvatarModule, ButtonModule, MenuModule, PanelModule
      ],
      providers: [
        { provide: CharactersService, useValue: spy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({}) } } }
      ]
    }).compileComponents();

    const testFixture = TestBed.createComponent(CharacterDetail);
    const testComponent = testFixture.componentInstance;

    spy.getCharacterById.calls.reset();
    testFixture.detectChanges();
    tick();

    expect(spy.getCharacterById).not.toHaveBeenCalled();
    expect(testComponent.character$).toBeUndefined();
  }));
});