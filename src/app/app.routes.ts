import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'blog', component: PostsComponent },
];
