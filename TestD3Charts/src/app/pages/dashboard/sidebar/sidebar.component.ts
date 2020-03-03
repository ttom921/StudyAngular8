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
      displayName: 'D3v5入門',
      iconName: 'speaker_notes',
      route: '',
      children: [
        {
          displayName: '第01章Helloworld',
          iconName: 'feedback',
          route: 'dashboard/ch01',
        },
        {
          displayName: '第02章選擇元素和綁定數據',
          iconName: 'videocam',
          route: 'dashboard/ch02',
        },
        {
          displayName: '第03章理解Updae、Enter、Exit',
          iconName: 'group',
          route: 'dashboard/ch03',
        },
        {
          displayName: '第04章選擇、插入、刪除元素',
          iconName: 'person',
          route: 'dashboard/ch04',
        },
        {
          displayName: '第05章簡單圖表',
          iconName: 'movie_filter',
          route: 'dashboard/ch05',
        },
        {
          displayName: '第06章比例尺使用',
          iconName: 'report_problem',
          route: 'dashboard/ch06',
        },
        {
          displayName: '第07章坐標軸使用',
          iconName: 'report_problem',
          route: 'dashboard/ch07',
        },
        {
          displayName: '第08章完整的柱狀圖',
          iconName: 'recent_actors',
          route: 'dashboard/ch08',
        },
        {
          displayName: '第09章讓圖表動起來',
          iconName: 'star_rate',
          route: 'dashboard/ch09',
        },
        {
          displayName: '第10章交互式操作',
          iconName: 'movie_filter',
          route: 'dashboard/ch10',
        },
      ]
    },
    {
      displayName: '車輛',
      iconName: 'recent_actors',
      route: '',
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
