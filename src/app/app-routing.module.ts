import { Part3Component } from './part3/part3.component';
import { Part2Component } from './part2/part2.component';
import { Part1Component } from './part1/part1.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'part1' },
  { path: 'part1', component: Part1Component },
  { path: 'part2', component: Part2Component },
  { path: 'part3', component: Part3Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

