import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CloseProcessComponent } from './close-process.component';
import { CloseRoutingModule } from './close-process.component.module';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from "angular-datatables";
@NgModule({
  declarations: [ CloseProcessComponent],
  imports: [CommonModule, CloseRoutingModule, RouterModule,ReactiveFormsModule,FormsModule,DataTablesModule],
})
export class CustomersModule {}
