import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NavItem } from 'src/app/_common/menu-list-item/nav-item';
import { NavService } from 'src/app/_common/menu-list-item/nav.service';
import { isNullOrUndefined } from 'util';

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
      displayName: '車輛',
      iconName: 'recent_actors',
      route: 'dashboard',
      children: [
        {
          displayName: '車輛管理',
          iconName: 'star_rate',
          route: 'dashboard/ch01',
        },
        {
          displayName: '車隊管理',
          iconName: 'person',
          route: 'dashboard/ch02',
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
