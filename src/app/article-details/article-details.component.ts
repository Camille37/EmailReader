import { Component, OnInit } from '@angular/core';
import { Category } from '../interfaces/category';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Article } from '../interfaces/article';
import { NewsService } from '../services/news.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css'
})
export class ArticleDetailsComponent implements OnInit{

  newsSvr : NewsService;
  article: Article = {} as Article;

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.articleService.getArticle(articleId).subscribe((data: Article) => {
        this.article = data;
      });
    }
  }

  constructor(private router: Router, private route: ActivatedRoute, private articleService: NewsService) {
    this.newsSvr = articleService;
  }

  title: string = '';
  subtitle: string = '';
  category: string = '';
  abstract: string = '';
  body: string = '';

  imageError: string | null = null;
  isImageSaved: boolean = false;
  cardImageBase64: string | null = null;

  redirectEmailsList(): void {
    this.router.navigate(['/emailslist']);
  }

  back(){
    this.router.navigate(['/article-list']);
  }

}
