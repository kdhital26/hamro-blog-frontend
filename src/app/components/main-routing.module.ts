import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { ListBlogComponent } from './list-blog/list-blog.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {path: '', component: ListBlogComponent},
  {path: 'users', component: UsersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
 }
