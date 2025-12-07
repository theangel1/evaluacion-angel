

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiResponse, Location } from '../interfaces/location';
import { environment } from '../../../environments/environment';
import { LocationService } from './location-service';

describe('LocationService', () => {
  let service: LocationService;
  let httpMock: HttpTestingController;

  // Mock de datos reales de la API Rick and Morty
  const mockLocationsResponse: ApiResponse = {
    info: {
      count: 126,
      pages: 7,
      next: 'https://rickandmortyapi.com/api/location?page=2',
      prev: null
    },
    results: [
      {
        id: 1,
        name: 'Earth (C-137)',
        type: 'Planet',
        dimension: 'Dimension C-137',
        residents: [
          'https://rickandmortyapi.com/api/character/1',
          'https://rickandmortyapi.com/api/character/2'
        ],
        url: 'https://rickandmortyapi.com/api/location/1',
        created: '2017-11-10T12:56:33.798Z'
      },
      {
        id: 20,
        name: 'Earth (Replacement Dimension)',
        type: 'Planet',
        dimension: 'Replacement Dimension',
        residents: [],
        url: 'https://rickandmortyapi.com/api/location/20',
        created: '2017-11-10T13:08:13.191Z'
      }
    ]
  };

  const mockLocation: Location = mockLocationsResponse.results[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocationService]
    });

    service = TestBed.inject(LocationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // no debe haber peticiones pendientes
  });

  it('debe crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  describe('getLocations()', () => {
    it('debe hacer GET a /location y devolver lista de ubicaciones', () => {
      service.getLocations().subscribe(response => {
        expect(response.results.length).toBe(2);
        expect(response.results[0].name).toBe('Earth (C-137)');
        expect(response.info.count).toBe(126);
        expect(response.info.pages).toBe(7);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}location`);
      expect(req.request.method).toBe('GET');
      expect(req.request.url).toBe(environment.apiUrl + 'location');

      req.flush(mockLocationsResponse);
    });
  });

  describe('getLocationById()', () => {
    it('debe obtener una ubicación específica por ID', () => {
      const locationId = '1';

      service.getLocationById(locationId).subscribe(location => {
        expect(location.id).toBe(1);
        expect(location.name).toBe('Earth (C-137)');
        expect(location.dimension).toBe('Dimension C-137');
        expect(location.type).toBe('Planet');
        expect(location.residents.length).toBe(2);
      });

      const expectedUrl = `${environment.apiUrl}location/${locationId}`;
      const req = httpMock.expectOne(expectedUrl);

      expect(req.request.method).toBe('GET');
      expect(req.request.url).toBe(expectedUrl);

      req.flush(mockLocation);
    });

    it('debe funcionar con IDs como string (ej: "20")', () => {
      const id = '20';
      const expectedLocation = mockLocationsResponse.results[1];

      service.getLocationById(id).subscribe(location => {
        expect(location.name).toBe('Earth (Replacement Dimension)');
        expect(location.dimension).toBe('Replacement Dimension');
      });

      const req = httpMock.expectOne(`${environment.apiUrl}location/20`);
      expect(req.request.url).toBe(environment.apiUrl + 'location/20');
      req.flush(expectedLocation);
    });

    it('debe manejar correctamente errores 404', () => {
      const invalidId = '9999';

      service.getLocationById(invalidId).subscribe({
        next: () => fail('No debería devolver datos'),
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe('Not Found');
        }
      });

      const req = httpMock.expectOne(`${environment.apiUrl}location/9999`);
      req.flush('Location not found', {
        status: 404,
        statusText: 'Not Found'
      });
    });
  });
});

