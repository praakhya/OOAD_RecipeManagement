import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Recipe } from '../../Models/recipe';
import { RecipeComponent } from '../recipe/recipe.component';
@Component({
  selector: 'app-recipe-page',
  standalone: true,
  imports: [RecipeComponent],
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.scss'
})
export class RecipePageComponent {
  recipes:Recipe[] = [];
  constructor(private httpClient:HttpClient){}
  ngOnInit() {
    this.getAllRecipes().subscribe((recipes)=>{
      this.recipes = recipes
    })
  }
  getHttpOptions():HttpHeaders {

    return new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
    }
  
  createRecipe(recipe: Recipe) {

    return this
      .httpClient
      .post<Recipe>("/api/recipe", recipe, {headers:this.getHttpOptions()})
  }
  getAllRecipes() {

    return this
      .httpClient
      .get<Recipe[]>("/api/recipe", {headers:this.getHttpOptions()})
  }
  getRecipeByID(id:Number) {
    return this
      .httpClient
      .get<Recipe>("/api/recipe/" + id, {headers:this.getHttpOptions()})
  }

}
