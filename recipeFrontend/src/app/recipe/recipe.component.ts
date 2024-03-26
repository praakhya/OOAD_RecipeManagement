import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { Recipe } from '../../Models/recipe';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
  @Input() recipe: Recipe|null = null;

}
