import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModule } from '../app/components/main.module';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CommonBlogComponent } from './shared/common-blog/common-blog.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'shared', component: CommonBlogComponent},
  {path: 'content', component: ContentComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'blog',
    loadChildren: () => import('../app/shared/shared.module').then(m => m.SharedModule)
  },
  {
    path: 'blogs',
    loadChildren: () => import('../app/components/main.module').then(m => m.MainModule)
  },
  {path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
