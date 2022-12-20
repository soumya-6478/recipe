import { Recipe } from './../../recipe.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe : Recipe;
  @Input() index: number;
  // @Output() recipeSelected = new EventEmitter<void>()

  // constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }
  // onSelected(){
  //   // this.recipeSelected.emit() // bcoz void, i.e the parent component is listening to a single recipe element, so we need not to pass which recipe
  //   this.recipeService.recipeselected.emit(this.recipe)
  // }
}
