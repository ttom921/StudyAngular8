export interface NavItem {
  displayName: string;
  disabled?: boolean;//是否顯示此項目
  iconName: string;
  route?: string;
  children?: NavItem[];
}
