

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiResponse, Character } from '../interfaces/character';
import { environment } from '../../../environments/environment';
import { CharactersService } from './characters-service';

describe('CharactersService', () => {
  let service: CharactersService;
  let httpMock: HttpTestingController;

  // Mock de datos
  const mockCharactersResponse: ApiResponse = {
    info: {
      count: 826,
      pages: 42,
      next: 'https://rickandmortyapi.com/api/character?page=2',
      prev: null
    },
    results: [
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
        location: { name: 'Earth (Replacement Dimension)', url: 'https://rickandmortyapi.com/api/location/20' },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/1'],
        url: 'https://rickandmortyapi.com/api/character/1',
        created: '2017-11-04T18:48:46.250Z'
      }
    ]
  };

  const mockCharacter: Character = mockCharactersResponse.results[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharactersService]
    });

    service = TestBed.inject(CharactersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Asegura que no hay peticiones pendientes
  });

  it('debe crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  describe('getCharacters()', () => {
    it('debe hacer GET a la URL correcta y devolver lista de personajes', () => {
      // Act
      service.getCharacters().subscribe(response => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].name).toBe('Rick Sanchez');
        expect(response.info.count).toBe(826);
      });

      // Assert: verifica que se hizo la petición
      const req = httpMock.expectOne(`${environment.apiUrl}character`);
      expect(req.request.method).toBe('GET');

      // Simula respuesta
      req.flush(mockCharactersResponse);
    });

    it('debe usar la URL base de environment', () => {
      service.getCharacters().subscribe();

      const req = httpMock.expectOne(`${environment.apiUrl}character`);
      expect(req.request.url).toBe(environment.apiUrl + 'character');
      req.flush(mockCharactersResponse);
    });
  });

  describe('getCharacterById()', () => {
    it('debe hacer GET al personaje con el ID correcto', () => {
      const characterId = '1';

      service.getCharacterById(characterId).subscribe(character => {
        expect(character.id).toBe(1);
        expect(character.name).toBe('Rick Sanchez');
        expect(character.status).toBe('Alive');
      });

      const req = httpMock.expectOne(`${environment.apiUrl}character/${characterId}`);
      expect(req.request.method).toBe('GET');
      expect(req.request.url).toBe(`${environment.apiUrl}character/1`);

      req.flush(mockCharacter);
    });

    it('debe funcionar con IDs como string (ej: "25")', () => {
      const id = '25';
      const expectedUrl = `${environment.apiUrl}character/25`;

      service.getCharacterById(id).subscribe();

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.url).toBe(expectedUrl);
      req.flush({ id: 25, name: 'Morty Smith', status: 'Alive' });
    });

    it('debe manejar errores de red (opcional)', () => {
      service.getCharacterById('999').subscribe({
        error: (err) => {
          expect(err.status).toBe(404);
        }
      });

      const req = httpMock.expectOne(`${environment.apiUrl}character/999`);
      req.flush('Personaje no encontrado', { status: 404, statusText: 'Not Found' });
    });
  });
});

