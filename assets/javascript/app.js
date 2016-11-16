var config = {
    apiKey: "AIzaSyA0WvCTQpp042R62Jtz3Gy_qXbDnNm97XE",
    authDomain: "planning-for-differentiation.firebaseapp.com",
    databaseURL: "https://planning-for-differentiation.firebaseio.com",
    storageBucket: "planning-for-differentiation.appspot.com",
    messagingSenderId: "490282172405"
};
firebase.initializeApp(config);


var database = firebase.database();
var searchTerm = "";
var courseraQuery = "https://api.coursera.org/api/courses.v1?q=search&query=" + searchTerm + "&fields=photoUrl,description";
