$(document).ready(function() {
//
// FIREBASE INITIALIZE ==================================================================================
//
var config = {
    apiKey: "AIzaSyA0WvCTQpp042R62Jtz3Gy_qXbDnNm97XE",
    authDomain: "planning-for-differentiation.firebaseapp.com",
    databaseURL: "https://planning-for-differentiation.firebaseio.com",
    storageBucket: "planning-for-differentiation.appspot.com",
    messagingSenderId: "490282172405"
};
firebase.initializeApp(config);

var database = firebase.database();
var studentVideoList = [];

console.log('working');
// FIREBASE
// Firebase call that happens on page load and value updates.
database.ref().on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var videos = childSanpshot.val().videos;
        var videoKeys = Object.keys(videos);

        for (var i = 0; i < videoKeys.length; i++) {
            studentVideoList.push(videoKeys[i]);
        }
    });
});
// If it fails, cue error handling.
}, function(errorObject) {
// Log a read error and its error code.
console.log("The read failed: " + errorObject.code);
});

});
