import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyChbwwuesFUo63u-YnngdpWjjNAqG0_rmM',
  authDomain: 'engaz-c8f5a.firebaseapp.com',
  projectId: 'engaz-c8f5a',
  storageBucket: 'engaz-c8f5a.appspot.com',
  messagingSenderId: '220065946293',
  appId: '1:220065946293:web:f13313a1454e62f7937cfc',
};


/* Initializing the firebase app and getting the authentication service. */
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
