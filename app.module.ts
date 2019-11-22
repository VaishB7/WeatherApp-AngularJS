import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { ResultTabComponent } from './result-tab/result-tab.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { ChartsModule } from 'ng2-charts';
import { FavoriteEditorComponent } from './favorite-editor/favorite-editor.component';


import { StorageServiceModule} from 'angular-webstorage-service';



	


@NgModule({
  declarations: [
    AppComponent,
    BasicFormComponent,
    ResultTabComponent,
    FavoriteEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatAutocompleteModule,
    
    MatInputModule,
    ChartsModule,
    StorageServiceModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
