import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Favourite } from '../../Models/favourite';
import { RecipeComponent } from '../recipe/recipe.component';
@Component({
  selector: 'app-favourite-page',
  standalone: true,
  imports: [RecipeComponent],
  templateUrl: './favourite-page.component.html',
  styleUrl: './favourite-page.component.scss'
})
export class FavouritePageComponent {
  favourites:Favourite[] = []
  constructor(public httpClient:HttpClient){}
  ngOnInit() {
    this.getAllFavourites().subscribe({
      next:f=>{
        console.log("Favourites:",f)
        this.favourites = f
      },
      error: (err)=>{
        console.log("Error: ",err)
      }
    })
  }
  getAllFavourites() {
    return this
      .httpClient
      .get<Favourite[]>("/api/favourite", {headers:this.getHttpOptions()})
  }
  getHttpOptions():HttpHeaders {

    return new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
    }

}
