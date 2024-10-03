import { Component, OnInit } from '@angular/core';
import { Category } from '../interfaces/category';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent {
  activeTab: Category = Category.All; // active onglet by default;
  tabs : any = Object.values(Category).filter(
    (value): value is any => typeof value === 'string'
  );
  
    setActiveTab(tab: Category) {
      this.activeTab = tab; // update the active onglet in the menu
    }
  
}
