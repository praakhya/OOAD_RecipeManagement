import { Component } from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule, ThemePalette } from '@angular/material/core';
import { Recipe } from '../../Models/recipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss'
})
export class AddRecipeComponent {
  public addRecipeForm : FormGroup = new FormGroup({
    title:new FormControl(''),
    id:new FormControl(''),
    instructions:new FormControl(''),
    cookingTime:new FormControl(''),
    difficultyLevel:new FormControl(''),
    averageRating:new FormControl(''),
  })
  addOnBlur = true;
  colorControl = new FormControl('easy' as ThemePalette)
  ingredients:String[] = []
  averageRating:Number = 0
  instructions:String = ""
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  constructor(public dialogRef: MatDialogRef<AddRecipeComponent>, public httpClient:HttpClient){}
  onNoClick(): void {
    this.dialogRef.close();
  }
  remove(fruit: String): void {
    const index = this.ingredients!.indexOf(fruit);
    if (index!=undefined && index>= 0) {
      this.ingredients!.splice(index, 1);
    }
    console.log("After removing: ", this.ingredients)
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.ingredients!.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
    console.log("After adding: ", this.ingredients)

  }
  edit(fruit: String, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.ingredients!.indexOf(fruit);
    if (index!=undefined && index >= 0) {
      this.ingredients![index] = value;
    }
    console.log("After editting: ", this.ingredients)

  }
  getHttpOptions(): HttpHeaders {

    return new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
  }
  submitEditRecipe() {
    var newRecipe = new Recipe();
    newRecipe.id = null
    newRecipe.title = this.addRecipeForm.get("title")?.value
    newRecipe.ingredients = this.ingredients
    newRecipe.cookingTime = this.addRecipeForm.get("cookingTime")?.value
    newRecipe.difficultyLevel = this.addRecipeForm.get("difficultyLevel")?.value
    newRecipe.instructions = this.addRecipeForm.get("instructions")?.value
    this
    .httpClient
    .post<Recipe>("/api/recipe",
    newRecipe, { headers: this.getHttpOptions() })
    .subscribe({
      next: (response) => {
        console.log("New recipe:",response)
        this.dialogRef.close(response)
      },
      error: (err) => {
        console.log("Error: ",err)
      }
    })
  }
  closeEdit() {
    this.dialogRef.close()
  }

}
