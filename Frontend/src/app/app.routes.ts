import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './create-post/create-post.component';

export const routes: Routes = [
    {'path': '', component: HomeComponent},
    {'path': 'register', component: RegisterComponent},
    {'path': 'login', component: LoginComponent},
    {'path': 'profile', component: ProfileComponent},
    {'path': 'create', component: CreatePostComponent}
];
