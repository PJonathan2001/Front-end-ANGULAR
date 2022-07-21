import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComputerFormComponent } from './components/computer-form/computer-form.component';
import { ComputerListComponent } from './components/computer-list/computer-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ComputerListComponent },
  { path: 'add', component: ComputerFormComponent },
  { path: 'edit/:id', component: ComputerFormComponent }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
