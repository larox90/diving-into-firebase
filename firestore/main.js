// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "APPI KEY",
    authDomain: "AUTH URL",
    databaseURL: "DATABASE URL",
    projectId: "PROJECT ID",
    storageBucket: "STORAGE URKL",
    messagingSenderId: "SENDER ID",
    appId: "APP ID"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();
// samples = our main collection. (collection is a collection of documents)
// sandwichData = our first document. (document is a object of data)
const docRef = firestore.doc("samples/sandwichData");
const title = document.getElementById('title');
const input = document.getElementById('input-text');
const save = document.getElementById('save-button');
const load = document.getElementById('load-button');

// function to save on firebase
save.addEventListener('click', ($event) => {
    const textToSave = input.value;
    docRef.set({
        hotDogStatus: textToSave
    }).then(() => {
        console.log('Status saved!')
    }).catch((error) => {
        console.log('Got an error: ', error);
    })
});

// function to get manually the info from firebase
load.addEventListener('click', () => {
    docRef.get().then((doc) => {
        console.log('our doc gotten', doc);
        if (doc && doc.exists) {
            const myData = doc.data();
            title.innerText = "Hot dog status: " + myData.hotDogStatus;
        }
    }).catch(error => {
        console.log('Got an error: ', error);
    });
});

getRealTimeUpdates = function() {
    docRef.onSnapshot(doc => {
        console.log('our doc gotten realtime!', doc);
        if (doc && doc.exists) {
            const myData = doc.data();
            title.innerText = "Hot dog status: " + myData.hotDogStatus;
        }
    });
}

getRealTimeUpdates();