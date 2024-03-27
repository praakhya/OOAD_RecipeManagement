import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Recipe } from '../../Models/recipe';
import { RecipeComponent } from '../recipe/recipe.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddRecipeComponent } from '../add-recipe/add-recipe.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-recipe-page',
  standalone: true,
  imports: [RecipeComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.scss'
})
export class RecipePageComponent {
  recipes:Recipe[] = [];
  constructor(private httpClient:HttpClient, public dialog: MatDialog){
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddRecipeComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.recipes.push(result)
    });
  }
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
