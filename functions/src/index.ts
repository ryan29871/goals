import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const userCreated = functions.auth.user().onCreate(async (user, context) => {
  try {
    console.log("userCreated()");
    console.log(user);
    console.log(context);
    return;
  } catch (error) {
    console.error(error);
    return (error);
  }
});

export const userDeleted = functions.auth.user().onDelete(async (user, context) => {
  try {
    console.log("userDeleted()");
    console.log(user);
    console.log(context);
    return admin.firestore().collection('users').doc(user.uid).delete();
  } catch (error) {
    console.error(error);
    return (error);
  }
});

export const loginEvent = functions.analytics.event('signedIn').onLog((event) => {
  console.log(event);
  return 'Login event complete!';
});

export const logoutEvent = functions.analytics.event('signOut').onLog((event) => {
  console.log(event);
  return 'Logout event complete!';
});
