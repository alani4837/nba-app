import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAKdeTb4Q6ag_n2OyGk0eSdMpRJooSJqhM",
    authDomain: "nba-app-50e9a.firebaseapp.com",
    databaseURL: "https://nba-app-50e9a.firebaseio.com",
    projectId: "nba-app-50e9a",
    storageBucket: "nba-app-50e9a.appspot.com",
    messagingSenderId: "1097135351669"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapshot)=>{
        data.push({
            ...childSnapshot.val(),
            id:childSnapshot.key
        })
    });
    return data;
}


export {
    firebase,
    firebaseDB,
    firebaseArticles,
    firebaseVideos,
    firebaseTeams,
    firebaseLooper
}