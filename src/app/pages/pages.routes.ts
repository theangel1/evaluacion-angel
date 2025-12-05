import { Routes } from '@angular/router';
import { Home } from './home/home';
import { UrlList } from '../components/url-list/url-list';
import { Characters } from '../components/characters/characters';
import { Locations } from '../components/locations/locations';

const routes: Routes = [
 { path: '', component: Home },
 { path: 'urls', component: UrlList },
 { path: 'characters', component: Characters },
 { path: 'locations', component: Locations },
];

export default routes;


