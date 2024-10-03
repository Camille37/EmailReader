import { Category } from "./category";

export interface Article {
    tittle: string,
    subtitle?: string,
    category: Category,
    abstract: string,
    body?: string,
    //update_date ?
    //image ?
    //thumbnail ?
}