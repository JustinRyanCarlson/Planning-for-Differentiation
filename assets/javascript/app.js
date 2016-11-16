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
var courseraQuery = "https://api.coursera.org/api/courses.v1?q=search&query=" + searchTerm + "&fields=photoUrl,description,name";
var youtubeQuery = "https: //www.googleapis.com/youtube/v3/search?part=snippet&q=" + searchTerm + "&maxResults=15&order=relevance&key=AIzaSyBInOsaJzC5bjqZp0eHlS3V7vM3QNkhwVg";
var nasaQuery = 'https://api.nasa.gov/planetary/sounds?q=' + searchTerm + '&api_key=nzTA0ARjHxwopkNivUZKVDzWOfdQciYlgIbEV4XW';
var youtubeWatchURL = "https://www.youtube.com/watch?v=";
