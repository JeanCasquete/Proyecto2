import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudAnimesComponent } from './components/crud-animes/crud-animes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnimeService } from './components/crud-animes/anime.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CrudAnimesComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [AnimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
