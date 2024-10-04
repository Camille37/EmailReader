import { Component, OnInit } from '@angular/core';
import { Category } from '../interfaces/category';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Article } from '../interfaces/article';
import { NewsService } from '../services/news.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-edition',
  templateUrl: './article-edition.component.html',
  styleUrl: './article-edition.component.css'
})
export class ArticleEditionComponent implements OnInit{
  
  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.articleService.getArticle(articleId).subscribe((data: Article) => {
        this.article = data;
        
      });
    }
  }
  
  listCategory: any = Object.values(Category).filter(
    (value): value is any => typeof value === 'string'
  );

  constructor(private router: Router, private route: ActivatedRoute, private articleService: NewsService) {
    this.article.update_date = new Date().toISOString();
    
  }

  article: Article = {} as Article; 

  title: string = '';
  subtitle: string = '';
  category: string = '';
  abstract: string = '';
  body: string = '';

  imageError: string | null = null;
  isImageSaved: boolean = false;
  cardImageBase64: string | null = null;

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const MAX_SIZE = 20971520;
      const ALLOWED_TYPES = ['image/png', 'image/jpeg'];

      if (fileInput.target.files[0].size > MAX_SIZE) {
        this.imageError =
          'Maximum size allowed is ' + MAX_SIZE / 1000 + 'Mb';
        return false;
      }
      if (!_.includes(ALLOWED_TYPES, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.isImageSaved = true;

          this.article.image_data = fileInput.target.files[0].type;
          const head = (this.article.image_media_type ?? '').length + 13;
          this.article.image_data = e.target.result.substring(head, e.target.result.length);

        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
    return true;
  }

  save(){
    if (this.article) {
      this.articleService.updateArticle(this.article).subscribe(() => {
        alert("The article has been saved correctly")
        this.router.navigate(['/article-list']);
      });
  }
  }

  back(){
    this.router.navigate(['/article-list']);
  }
}
