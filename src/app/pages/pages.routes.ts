import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: []
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home').then(m => m.Home),
  },
];

export default routes;

