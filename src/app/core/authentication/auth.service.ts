import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /* Creating a new BehaviorSubject that is of type User and is setting the value to an empty object. */
  userData$ = new BehaviorSubject<User>({} as User);

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router
  ) {
    this.authState();
  }

  /**
   * This function subscribes to the authState observable and returns the user data if the user is
   * logged in
   * @returns A subscription to the authState observable.
   */
  authState() {
    return this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData$.next(user as User);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  /**
   * If the user is not null and the user's uid is not null, then the user is logged in
   * @returns A boolean value that is true if the user is logged in and false if the user is not logged
   * in.
   */
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') as string) as User;
    return user !== null && this.userData$.value.uid !== null;
  }

  /**
   * The function takes in an email and password, and then signs the user in with those credentials. If
   * the sign in is successful, the user's data is stored in the userData$ BehaviorSubject and the
   * SetUserData() function is called. If the sign in is unsuccessful, an alert is displayed with the
   * error message
   * @param {string} email - string - The email address of the user.
   * @param {string} password - string - The password of the user.
   * @returns The user data is being returned.
   */
  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.userData$.next(result.user as User);
        this.router.navigate(['/panel']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  /**
   * It creates a new user with the email and password provided, then sets the user data in the
   * database and navigates to the panel page
   * @param {string} email - string - The email address of the user.
   * @param {string} password - string - The password of the user.
   * @returns The user data is being returned.
   */
  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.userData$.next(result.user as User);
        this.setUserData(result.user as User);
        this.router.navigate(['/panel']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  /**
   * We're creating a reference to the user's document in the users collection, and then we're setting
   * the data to the user object that we passed in
   * @param {User} user - User - This is the user object that we are going to be saving to the
   * database.
   * @returns The userRef.set(data, { merge: true }) is being returned.
   */
  setUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    return userRef.set(data, { merge: true });
  }

  /**
   * SignOut() is an async function that returns a promise that removes the user from local storage and
   * navigates to the root route
   * @returns The promise is being returned.
   */
  async signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    });
  }
}
