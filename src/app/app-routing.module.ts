import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DeetsComponent } from './deets/deets.component';
import { HomeComponent } from './home/home.component';
import { NewShowComponent } from './new-show/new-show.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-show', component: NewShowComponent },
  { path: 'about', component: AboutComponent },
  { path: 'deets/:id', component: DeetsComponent },
  // { path: 'deets/:id', component: DeetsComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
