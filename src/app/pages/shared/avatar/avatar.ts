import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-avatar',
  imports: [AvatarModule],
  templateUrl: './avatar.html',
})
export class Avatar implements OnInit {
  public backgroundColor: string = 'rgb(201, 83, 83)';
  public color: string = 'rgb(255, 255, 255, 1)';
  public name = 'AP'



  ngOnInit() {
    // Component initialized
  }
}
