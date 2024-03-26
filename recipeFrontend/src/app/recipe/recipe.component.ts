import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { Recipe } from '../../Models/recipe';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Favourite } from '../../Models/favourite';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDividerModule,
    MatListModule,
    MatIconModule],
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {
  @Input() recipe: Recipe | null = null;
  favourite:boolean = false;
  constructor(private httpClient: HttpClient) { }
  ngOnInit() {
    this
    .httpClient
    .get<Favourite>("/api/favourite/" + this.recipe?.id, { headers: this.getHttpOptions() })
    .subscribe({
      next: (response) => {

        this.favourite = true
      },
      error: (err) => {
        this.favourite = false
      }
    })

  }
  deleteRecipe(id: Number | undefined) {
    this
      .httpClient
      .delete("/api/recipe/" + id, { headers: this.getHttpOptions() })
  }
  setAsFavourite(id: Number | undefined) {
    this.addToFavourites(id).subscribe(f=>{
      console.log(f)
      this.favourite = true
    })

  }
  removeAsFavourite(id : Number | undefined) {
    this.deleteFromFavourites(id).subscribe(f=>{
      console.log(f)
      this.favourite = false
    })
  }
  addToFavourites(id: Number | undefined) {
    return this
      .httpClient
      .post<Favourite>("/api/favourite/" + id, { headers: this.getHttpOptions() })
  }
  deleteFromFavourites(id: Number | undefined) {
    return this
      .httpClient
      .delete("/api/favourite/" + id, { headers: this.getHttpOptions() })
  }
  getHttpOptions(): HttpHeaders {

    return new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
  }
}
