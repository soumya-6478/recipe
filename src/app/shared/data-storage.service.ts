import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DatastorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-course-recipe-book-4e55a-default-rtdb.firebaseio.com//recipes.json',
        recipes
      )
      .subscribe((response) => console.log(response));
  }

  fetchRecipes() {
    // returning will work only from the top level of the methode, we cant return a observable inside the subscribe methode of another observable
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-4e55a-default-rtdb.firebaseio.com//recipes.json'
      )
      .pipe(
        map((recipes) => {
          console.log(recipes);
          // map is rxjs operator
          return recipes.map((recipe) => {
            console.log(recipe);
            // map is javascript array operator
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          console.log(recipes);
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
