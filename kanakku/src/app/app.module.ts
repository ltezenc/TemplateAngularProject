import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationGuard } from './core/auth/authentication.guard';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import { AllModulesData } from 'src/assets/all-modules-data/all-modules-data';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(
      {
        timeOut: 1500,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    ),
    BrowserAnimationsModule,
    FormsModule,
    CKEditorModule,
    DataTablesModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthenticationGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
