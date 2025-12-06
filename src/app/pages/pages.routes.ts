import { Routes } from '@angular/router';
import { Home } from './home/home';
import { UrlList } from '../components/url-list/url-list';
import { Characters } from '../components/characters/characters';
import { Locations } from '../components/locations/locations';
import { CharacterDetail } from '../components/character-detail/character-detail';

const routes: Routes = [
 { path: '', component: Home },
 { path: 'urls', component: UrlList },
 { path: 'characters', component: Characters },
 { path: 'locations', component: Locations },
 { path: 'character-detail/:id', component: CharacterDetail },
];

export default routes;


