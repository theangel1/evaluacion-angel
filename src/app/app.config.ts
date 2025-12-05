import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import customTheme from './resources/custom-theme';
import { NgIconsModule, provideNgIconsConfig, withContentSecurityPolicy, withExceptionLogger } from '@ng-icons/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes,
      withInMemoryScrolling(
        {
          scrollPositionRestoration: 'enabled',
          anchorScrolling: 'enabled'
        }),
      withEnabledBlockingInitialNavigation()
    ),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
    ),
        providePrimeNG({
      theme: {
        preset: customTheme,
        options: {
          darkModeSelector: '.app-dark',
          cssLayer:{
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities'
          }
        }
      }
    }),
    MessageService,
    importProvidersFrom(NgIconsModule.withIcons({})),
    provideNgIconsConfig({
      size: '2rem',
    },
      withContentSecurityPolicy(),
      withExceptionLogger()
    ),
  ]
};
