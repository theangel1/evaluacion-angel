import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Location } from '../../core/interfaces/location';
import { LocationService } from '../../core/services/location-service';
import { TableModule } from 'primeng/table';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';

@Component({
  selector: 'app-locations',
  imports: [CardModule, TableModule, IconField, InputIcon],
  templateUrl: './locations.html',
  styleUrl: './locations.scss',
})
export class Locations implements OnInit {

  private locationService = inject(LocationService)
  locations: Location[] = [];

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    this.locationService.getLocations().subscribe(response => {
      this.locations = response.results;
    });
  }


}
