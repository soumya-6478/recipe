import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from '../auth.component';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from 'src/app/shared/app-shared/app-shared.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
    AppSharedModule,
  ],
})
export class AuthModule {}
