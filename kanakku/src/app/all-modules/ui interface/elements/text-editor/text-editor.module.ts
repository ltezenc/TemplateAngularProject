import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextEditorRoutingModule } from './text-editor-routing.module';
import { TextEditorComponent } from './text-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    TextEditorComponent
  ],
  imports: [
    CommonModule,
    TextEditorRoutingModule,
    CKEditorModule
  ]
})
export class TextEditorModule { }
