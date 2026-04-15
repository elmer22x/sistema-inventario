// -----------------------------------------------------------------
// ARCHIVO: app.routes.ts
// FUNCIÓN: Define las rutas (URLs) de la aplicación
// IMPORTANCIA: Asocia cada URL con un componente
// -----------------------------------------------------------------

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { InventoryComponent } from './inventory/inventory.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },      // /login
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Página inicial → login
  { path: '**', redirectTo: '/login' }  // Cualquier ruta no existente → login
];