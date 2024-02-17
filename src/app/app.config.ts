import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideState, provideStore } from '@ngrx/store';
import { profileFeature } from './chore/state/profile/reducers';
import { ProfileEffects } from './chore/state/profile/effects';
import { reducer } from './chore/state/state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),

    provideStore(reducer),

    provideState(profileFeature),
    provideEffects(ProfileEffects),
    provideStoreDevtools(),
  ],
};
