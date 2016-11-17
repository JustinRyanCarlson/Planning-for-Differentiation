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


//
// GLOBAL VARIABLES ==================================================================================
//

var database = firebase.database();
var youtubeWatchURL = "https://www.youtube.com/watch?v=";


//
// CODE ==================================================================================
//



$("#submit-button").on('click', function() {
    var searchTerm = $('#search-box').val().trim();
    $('#search-box').val('');
    console.log(searchTerm);
    youtubeAPIRequest();
    // // youtubeKhanAPIRequest();
    // nasaAPIRequest();
    // courseraAPIRequest();



    return false;
});


//
// FUNCTIONS ==================================================================================
//


function youtubeAPIRequest() {
    var youtubeQuery = "https: //www.googleapis.com/youtube/v3/search?part=snippet&q=" + searchTerm + "&maxResults=15&order=relevance&key=AIzaSyBInOsaJzC5bjqZp0eHlS3V7vM3QNkhwVg";
    cnosole.log(youtubeQuery);
}

function youtubeKhanAPIRequest() {

}

function nasaAPIRequest() {
    var nasaQuery = 'https://api.nasa.gov/planetary/sounds?q=' + searchTerm + '&api_key=nzTA0ARjHxwopkNivUZKVDzWOfdQciYlgIbEV4XW';
}

function courseraAPIRequest() {
    var courseraQuery = "https://api.coursera.org/api/courses.v1?q=search&query=" + searchTerm + "&fields=photoUrl,description,name";
}
