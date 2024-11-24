import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { menuConfig } from './menu.config';
import { IMenuConfig } from './menu.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  menuItems: IMenuConfig[] = menuConfig();

  ngOnInit(): void {
    this.setMenuId(this.menuItems);
  }

  setMenuId(menu?: IMenuConfig[]): void {
    for (const node of menu) {
      if (node?.children?.length) {
        node.id = uuidv4();
        this.setMenuId(node.children);
      } else {
        node.id = `${uuidv4()}-last`;
      }
    }
  }

  pathToParent(array: IMenuConfig[], searchId: string): string {
    let result = '';
    array.some(({ id, name, children = [] }) => {
      if (id === searchId) result = name;
      const temp = this.pathToParent(children, searchId);
      if (temp) result = `${name}/${temp}`;
      return false;
    });
    return result;
  }

  navigate(item: IMenuConfig): string {
    return `/${this.pathToParent(this.menuItems, item.id)}`;
  }
}
