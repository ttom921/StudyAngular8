import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavService } from 'src/app/_common/menu-list-item/nav.service';
import { isNullOrUndefined } from 'util';
import { NavItem } from 'src/app/_common/menu-list-item/nav-item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() navClicked = new EventEmitter<void>();

  //navItem的物件
  navItems: NavItem[] = [
    {
      displayName: '元件測試',
      iconName: 'recent_actors',
      route: '',
      children: [
        {
          displayName: 'angularprogressbars元件',
          iconName: 'star_rate',
          route: 'dashboard/angularprogressbars',
        },
        {
          displayName: 'ngcircleprogress元件',
          iconName: 'person',
          route: 'dashboard/ngcircleprogress',
        },
        {
          displayName: '測試animate程式庫',
          iconName: 'star_rate',
          route: 'dashboard/ngtestanimate',
        },
        {
          displayName: '測試',
          disabled: true,
          iconName: 'person',
          route: 'dashboard/ch03',
        }
      ]
    }
  ];

  constructor(private navService: NavService) { }

  ngOnInit() {
    this.navService.appDrawer = this;
  }
  handleClicked(ev: Event) {
    if (!isNullOrUndefined(ev))
      ev.preventDefault();
    this.navClicked.emit();
  }

}
