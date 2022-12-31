import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users.component.module';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from "angular-datatables";
@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, UsersRoutingModule, RouterModule,ReactiveFormsModule,FormsModule,DataTablesModule],
})
export class UersModule {}
