import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FIREBASE_OPTIONS } from "@angular/fire/compat";

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [ 
    provideAnimations(),
    provideToastr({timeOut:1200, preventDuplicates:true}),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    provideRouter(routes), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"sala-juegos-7233a","appId":"1:1022723929031:web:368fb409f0c8caa1091fe2","storageBucket":"sala-juegos-7233a.appspot.com","apiKey":"AIzaSyCSE-dPTDb5okrOFhyjHc2TIh9UsGbkRig","authDomain":"sala-juegos-7233a.firebaseapp.com","messagingSenderId":"1022723929031"}))), 
    importProvidersFrom(provideAuth(() => getAuth())), 
    importProvidersFrom(provideFirestore(() => getFirestore()))]
};
