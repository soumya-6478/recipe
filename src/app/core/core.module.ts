import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../auth/auth-interceptors.service';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shoping-list/shoping-list.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ], // no need to export services
})
export class CoreModule {}
