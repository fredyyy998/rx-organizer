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
import { sessionFeature } from './chore/state/session/reducers';
import { SessionEffects } from './chore/state/session/effects';
import { todoFeature } from './chore/state/todo/reducer';
import { TodoEffects } from './chore/state/todo/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),

    provideStore(reducer),

    provideState(profileFeature),
    provideEffects(ProfileEffects),

    provideState(sessionFeature),
    provideEffects(SessionEffects),

    provideState(todoFeature),
    provideEffects(TodoEffects),

    provideStoreDevtools(),
  ],
};
