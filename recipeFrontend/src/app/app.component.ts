import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { RecipePageComponent } from './recipe-page/recipe-page.component';
import { FavouritePageComponent } from './favourite-page/favourite-page.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatTabsModule, RecipePageComponent, FavouritePageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recipeFrontend';
}
