import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.sass'],
  standalone: true,
  imports: [HeaderComponent]
})
export class HeaderHomeComponent {

}
