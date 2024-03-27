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
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, FormControl, ReactiveFormsModule, FormBuilder, FormGroup} from '@angular/forms';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ThemePalette } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatSelectModule],
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {
  @Input() recipe: Recipe | null = null;
  public postForm: FormGroup;

  constructor(private httpClient: HttpClient) { 
    this.postForm = new FormGroup({
      title:new FormControl(this.recipe?.title),
      id:new FormControl(this.recipe?.id),
      ingredients:new FormControl(this.recipe?.ingredients),
      instructions:new FormControl(this.recipe?.instructions),
      cookingTime:new FormControl(this.recipe?.cookingTime),
      difficultyLevel:new FormControl(this.recipe?.difficultyLevel),
      averageRating:new FormControl(this.recipe?.averageRating),
    })
  }
  

  favourite:boolean = false;
  editMode:boolean = false;
  colorControl = new FormControl('easy' as ThemePalette)
  

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;
  remove(fruit: String): void {
    const index = this.recipe?.ingredients!.indexOf(fruit);
    if (index!=undefined && index>= 0) {
      this.recipe?.ingredients!.splice(index, 1);
    }
    console.log("After removing: ", this.recipe?.ingredients)
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.recipe?.ingredients!.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
    console.log("After adding: ", this.recipe?.ingredients)

  }
  submitEditRecipe() {
    var newRecipe = new Recipe();
    newRecipe.id = this.postForm.controls["id"].value
    newRecipe.title = this.postForm.controls["title"].value
    newRecipe.ingredients = this.postForm.controls["ingredients"].value
    newRecipe.cookingTime = this.postForm.controls["cookingtime"].value
    newRecipe.difficultyLevel = this.postForm.controls["difficultyLevel"].value
    newRecipe.averageRating = this.postForm.controls["averageRating"].value
    newRecipe.reviews = this.recipe?.reviews
    this
    .httpClient
    .put<Recipe>("/api/recipe/" + this.recipe?.id,
    newRecipe, { headers: this.getHttpOptions() })
    .subscribe({
      next: (response) => {
        console.log("Modifie recipe:",response)
        this.recipe = response
        this.closeEdit()
      },
      error: (err) => {
        console.log("Error: ",err)
      }
    })
  }
  closeEdit(){
    this.editMode = false
  }
  edit(fruit: String, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.recipe?.ingredients!.indexOf(fruit);
    if (index!=undefined && index >= 0) {
      if (this.recipe!=undefined)
        this.recipe.ingredients![index] = value;
    }
    console.log("After editting: ", this.recipe?.ingredients)

  }
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
  removeRecipe(id: Number | undefined) {
    this.deleteRecipe(id).subscribe({
      next: (response) => {
        this.recipe = null
        console.log(response)
      },
      error: (err)=>{
        console.log("Error: ",err)
      }
    })
  }
  editRecipe() {
    this.editMode = true;
  }
  deleteRecipe(id: Number | undefined) {
    return this
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
