import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudAnimesComponent } from './components/crud-animes/crud-animes.component';

const routes: Routes = [
  { path: 'animes', component: CrudAnimesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
