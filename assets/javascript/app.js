$(document).ready(function () {
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
    var studentObjId;
    var studentNum = 1;
    //
    // CODE ==================================================================================
    //
    // FIREBASE
    // Firebase call that happens on page load and value updates.
    database.ref().on("value", function (snapshot) {
        $('#student-list').empty();
        // Console.log the value of this snapshot
        console.log(snapshot.val());
        snapshot.forEach(function (childSnapshot) {
            var name = childSnapshot.val().name;
            // var email = childSnapshot.val().email;
            $('#student-list').append("<a href='#!' class='collection-item'><p><input type='checkbox' id='test" + studentNum + "'/><label for='test" + studentNum + "'>" + name + "</label></p></a>");
            studentNum++;
        });
        // If it fails, cue error handling.
    }, function (errorObject) {
        // Log a read error and its error code.
        console.log("The read failed: " + errorObject.code);
    });
    // Adding Students
    $("#add-button").on('click', function () {
        var name = $('#icon_name').val().trim();
        var email = $('#icon_email').val().trim();
        if (name.length > 0 && email.length > 0) {
            // Push to database.
            database.ref().push({
                name: name,
                email: email
            });
            studentObjId = database.ref().push().getKey();
            console.log(studentObjId);
            // Empty input fields.
            $('#icon_name').val('');
            $('#icon_email').val('');
        } else if (name.length > 0) {
            // Push to database.
            database.ref().push({
                name: name,
            });
            studentObjId = database.ref().push().getKey();
            console.log(studentObjId);
            // Empty input fields.
            $('#icon_name').val('');
        } else {
            alert('Student Name field is required.');
        }
        // Don't refresh.
        return false;
    });
    // APIs
    $("#submit-button").on('click', function () {
        var searchTerm = $('#search-box').val().trim();
        $('#search-box').val('');
        console.log(searchTerm);
        youtubeAPIRequest(searchTerm);
        youtubeKhanAPIRequest(searchTerm);
        courseraAPIRequest(searchTerm);
        return false;
    });
    //
    // FUNCTIONS ==================================================================================
    //
    function youtubeAPIRequest(searchTerm) {
        var youtubeQuery = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + searchTerm + "&maxResults=15&order=relevance&key=AIzaSyBInOsaJzC5bjqZp0eHlS3V7vM3QNkhwVg";
        console.log(youtubeQuery);
        $.ajax({
            url: youtubeQuery,
            method: 'GET'
        }).done(function (response) {
            console.log(response);
            for (var i = 0; i < 10; i++) {
                var newEntry = $('<div>');
                var description = response.items[i].snippet.description;
                var img = $('<img>');
                img.attr('src', response.items[i].snippet.thumbnails.medium.url);
                var title = response.items[i].snippet.title;
                newEntry.append(img).append(title).append(description);
                $('#youtube').append(newEntry);
            }
        });
    }

    function youtubeKhanAPIRequest(searchTerm) {
        var khanYoutubeQuery = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + searchTerm + "&maxResults=15&channelId=UC4a-Gbdw7vOaccHmFo40b9g&order=relevance&key=AIzaSyBInOsaJzC5bjqZp0eHlS3V7vM3QNkhwVg";
        console.log(khanYoutubeQuery);
    }

    function courseraAPIRequest(searchTerm) {
        var courseraQuery = "https://api.coursera.org/api/courses.v1?q=search&query=" + searchTerm + "&fields=photoUrl,description,name";
        console.log(courseraQuery);
    }
});