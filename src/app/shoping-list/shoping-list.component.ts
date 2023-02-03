import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoping-list.service';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css'],
})
export class ShopingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangedsub: Subscription;

  constructor(private slservice: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.slservice.getIngredients(); // this will run when the app will load first time
    // debugger;
    this.igChangedsub = this.slservice.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => (this.ingredients = ingredients)
    );
  }

  onEditItem(index: number) {
    this.slservice.startedEditing.next(index);
  }
  ngOnDestroy(): void {
    this.igChangedsub.unsubscribe();
  }

  // onIngredientAdded(ingredient: Ingredient){
  //   this.ingredients.push(ingredient)
  // }
}
