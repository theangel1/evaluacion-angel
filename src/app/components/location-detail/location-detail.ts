import { Component, inject } from '@angular/core';
import { Location } from '../../core/interfaces/location';
import { LocationService } from '../../core/services/location-service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { AsyncPipe } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DatePipe } from "../../core/pipes/date.pipe";


@Component({
  selector: 'app-location-detail',
  imports: [CardModule, AsyncPipe, PanelModule, AvatarModule, ButtonModule, MenuModule, DatePipe],
  templateUrl: './location-detail.html',
  styleUrl: './location-detail.scss',
})
export class LocationDetail {
  private locationService = inject(LocationService)
  protected location$?: Observable<Location>;
  private route = inject(ActivatedRoute);

  ngOnInit(): void {

    this.location$ = this.loadLocation();
    //para el futuro...
    //this.location$?.subscribe(data => console.log(data));
  }

  loadLocation() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { return; }

    return this.locationService.getLocationById(id);
  }

}
