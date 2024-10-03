import { Component } from '@angular/core';
import { Category } from '../interfaces/category';
@Component({
  selector: 'app-article-edition',
  templateUrl: './article-edition.component.html',
  styleUrl: './article-edition.component.css'
})
export class ArticleEditionComponent {
  listCategory: any = Object.values(Category).filter(
    (value): value is any => typeof value === 'string'
  );
  
  browse(){
    // To complete (load a picture)
  }

  save(){
    // To complete (save the edition)
  }

  back(){
    // To complete (back to the list)
  }
}
