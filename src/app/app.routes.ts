
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:"",
        loadComponent: () => import('./component/home/home.component').then(m => m.HomeComponent)
    },
    {
        path:"login",
        loadComponent: () => import('./component/login/login.component').then(m => m.LoginComponent)
    },
    {
        path:"home",
        loadComponent: () => import('./component/home/home.component').then(m => m.HomeComponent)
    },
    {
        path:"quien-soy",
        loadComponent: () => import('./component/quien-soy/quien-soy.component').then(m => m.QuienSoyComponent)
    },
    {
        path:"registro",
        loadComponent: () => import('./component/registro/registro.component').then(m => m.RegistroComponent)
    },
    {
        path:"juegos",
        loadChildren: () => import("./component/juegos/juegos.routes")
    }
];
