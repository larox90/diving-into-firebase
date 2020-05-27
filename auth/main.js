/**
 * Functions used from firebase/auth
 * signInWithEmailAndPassword
 * createUserWithEmailAndPassword
 * logout
 */
const txtEmail = document.getElementById('email');
const txtPassword = document.getElementById('password');
const btnSignIn = document.getElementById('signin');
const btnSignup = document.getElementById('signup');
const btnSignOut = document.getElementById('signout');
const lblTitle = document.getElementById('title');
const auth = firebase.auth();

// button for login
btnSignIn.addEventListener('click', () => {
    const email = txtEmail.value;
    const password = txtPassword.value;
    // this function returns a promise.
    const promise = auth.signInWithEmailAndPassword(email, password);
    // we can use then to receive the response but we're listening the realtime response, thats the reason why only are catching the errors.
    promise.catch(e => {
        console.log(e.message);
    })
});

// button for create user
btnSignup.addEventListener('click', () => {
    // TODO: Check real email.
    const email = txtEmail.value;
    const password = txtPassword.value;
    // this function returns a promise.
    const promise = auth.createUserWithEmailAndPassword(email, password);
    // we can use then to receive the response but we're listening the realtime response, thats the reason why only are catching the errors.
    promise.catch(e => {
        console.log(e.message);
    })
});

// button for logout
btnSignOut.addEventListener('click', () => {
    // we dont need to get something from this function, because the realtime listening catch when we signed out.
    auth.signOut();
});

/**
 * realtime listener
 * it returns null if we are not logged in.
 */
auth.onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
        console.log(firebaseUser);
        btnSignOut.classList.remove('hidden');
        lblTitle.innerText = 'Firebase - Auth: ' + firebaseUser.email;
    } else {
        console.log('not logged in');
        btnSignOut.classList.add('hidden');
        lblTitle.innerText = 'Firebase - Auth:';
    }
})
