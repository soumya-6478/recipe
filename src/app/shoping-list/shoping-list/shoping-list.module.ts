import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopingListRoutingModule } from './shoping-list-routing.module';
import { ShopingEditComponent } from '../shoping-edit/shoping-edit.component';
import { ShopingListComponent } from '../shoping-list.component';
import { FormsModule } from '@angular/forms';
import { AppSharedModule } from 'src/app/shared/app-shared/app-shared.module';

@NgModule({
  declarations: [ShopingListComponent, ShopingEditComponent],
  imports: [ShopingListRoutingModule, FormsModule, AppSharedModule], // commonModule is available in appsharedModule, no need to import it again
})
export class ShopingListModule {}
