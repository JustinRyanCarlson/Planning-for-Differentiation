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
    //
    // GLOBAL VARIABLES ==================================================================================
    //
    var database = firebase.database();
    var youtubeWatchURL = "https://www.youtube.com/watch?v=";
    var searchTerm = "";
    var studentNum = 1;
    var pushKey;
    //
    // CODE ==================================================================================
    //
    // Hides preloader on page load
    $(".preloader-wrapper").hide();
    // Submit button
    $("#submit-button").on('click', function() {
        $(".getting-started").hide();
        $('#search-links').empty();
        $(".preloader-wrapper").show();
        searchTerm = $('#search-box').val().trim();
        $('#search-box').val('');
        youtubeAPIRequest(searchTerm);
        return false;
    });
    $(".site").on('click', function() {
        $(".preloader-wrapper").show();
        var clickedSite = $(this).attr('data-site');
        $('#search-links').empty();
        if (clickedSite === 'youtube') {
            $(this).addClass('active');
            $('[data-site="khan"], [data-site="coursera"]').removeClass('active');
            youtubeAPIRequest(searchTerm);
        } else if (clickedSite === 'khan') {
            $(this).addClass('active');
            $('[data-site="youtube"], [data-site="coursera"]').removeClass('active');
            youtubeKhanAPIRequest(searchTerm);
        } else {
            $(this).addClass('active');
            $('[data-site="khan"], [data-site="youtube"]').removeClass('active');
            courseraAPIRequest(searchTerm);
        }
        return false;
    });
    // FIREBASE
    // Firebase call that happens on page load and value updates.
    database.ref().on("value", function(snapshot) {
        $('#student-list').empty();
        // Console.log the value of this snapshot
        console.log(snapshot.val());
        snapshot.forEach(function(childSnapshot) {
            var name = childSnapshot.val().name;
            var keyFromDatabase = childSnapshot.val().key;
            // var email = childSnapshot.val().email;
            $('#student-list').append("<a href='#!' class='collection-item' data-studentKey='" + keyFromDatabase + "'><p><input type='checkbox' id='test" + studentNum + "'/><label for='test" + studentNum + "'>" + name + "</label><span class='right delete' data-keyDelete='" + keyFromDatabase + "'>X</span></p></a>");
            studentNum++;
        });
        // If it fails, cue error handling.
    }, function(errorObject) {
        // Log a read error and its error code.
        console.log("The read failed: " + errorObject.code);
    });
    // Adding Students
    $("#add-button").on('click', function() {
        var name = $('#icon_name').val().trim();
        var email = $('#icon_email').val().trim();
        if (name.length > 0 && email.length > 0) {
            // Push to database and get key.
            pushKey = database.ref().push({
                name: name,
                email: email,
                videos: 'none',
                key: 'none'
            }).key;
            console.log(pushKey);
            database.ref().child(pushKey).update({
                key: pushKey
            });
            // Empty input fields.
            $('#icon_name').val('');
            $('#icon_email').val('');
        } else if (name.length > 0) {
            // Push to database and get key.
            pushKey = database.ref().push({
                name: name,
                videos: 'none',
                key: 'none'
            }).key;
            console.log(pushKey);
            database.ref().child(pushKey).update({
                key: pushKey
            });
            // Empty input fields.
            $('#icon_name').val('');
        } else {
            alert('Student Name field is required.');
        }
        // Don't refresh.
        return false;
    });

    // Delete student from database and DOM when X is clicked
    $(document.body).on('click', '.delete', function() {
        var key = $(this).attr('data-keyDelete');
        console.log(key);
        String(key);
        database.ref().child(key).remove();
    });
    //
    // FUNCTIONS ==================================================================================
    //
    function youtubeAPIRequest(searchTerm) {
        var youtubeQuery = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + searchTerm + "&maxResults=15&order=relevance&key=AIzaSyBInOsaJzC5bjqZp0eHlS3V7vM3QNkhwVg";
        // $.ajax({ url: youtubeQuery, method: 'GET' }).done(function(response) {
        //     for (var i = 0; i < 10; i++) {
        //         var newEntry = $('<div>');
        //         newEntry.addClass('card-panel');
        //         var description = response.items[i].snippet.description;
        //         var img = $('<img>');
        //         img.attr('src', response.items[i].snippet.thumbnails.default.url);
        //         var title = response.items[i].snippet.title;
        //         newEntry.append(img).append(title).append(description);
        //         $('#search-links').hide().append(newEntry).fadeIn(1500);
        //     }
        // });
        //testing out dynamically making a card
        $.ajax({
            url: youtubeQuery,
            method: 'GET'
        }).done(function(response) {
            $(".preloader-wrapper").hide();
            console.log(response);
            for (var i = 0; i < 10; i++) {
                var newEntry = $('<div>').addClass('card-panel');
                $('<h5>').addClass('header').text(response.items[i].snippet.title).appendTo(newEntry);
                var cardHorizontal = $('<div>').addClass('card horizontal');
                var cardImg = $('<div>').addClass('card-image');
                $('<img>').attr('src', response.items[i].snippet.thumbnails.medium.url).appendTo(cardImg);
                cardHorizontal.append(cardImg);
                var cardStacked = $('<div>').addClass('card-stacked');
                var cardContent = $('<div>').addClass('card-content');
                $('<p>').text(response.items[i].snippet.description).appendTo(cardContent);
                cardStacked.append(cardContent);
                var cardAction = $('<div>').addClass('card-action');
                var videoURL = youtubeWatchURL + response.items[i].id.videoId;
                $('<a>').attr('href', videoURL).attr('target', "_BLANK").text(videoURL).appendTo(cardAction);
                cardStacked.append(cardAction);
                cardHorizontal.append(cardStacked);
                newEntry.append(cardHorizontal);
                $('#search-links').append(newEntry);
            }
        });
    }

    function youtubeKhanAPIRequest(searchTerm) {
        var khanYoutubeQuery = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + searchTerm + "&maxResults=15&channelId=UC4a-Gbdw7vOaccHmFo40b9g&order=relevance&key=AIzaSyBInOsaJzC5bjqZp0eHlS3V7vM3QNkhwVg";
        // $.ajax({ url: khanYoutubeQuery, method: 'GET' }).done(function(response) {
        //     for (var i = 0; i < 10; i++) {
        //         var newEntry = $('<div>');
        //         newEntry.addClass('card-panel');
        //         var description = response.items[i].snippet.description;
        //         var img = $('<img>');
        //         img.attr('src', response.items[i].snippet.thumbnails.default.url);
        //         var title = response.items[i].snippet.title;
        //         newEntry.append(img).append(title).append(description);
        //         $('#search-links').hide().append(newEntry).fadeIn(1500);
        //     }
        // });
        $.ajax({
            url: khanYoutubeQuery,
            method: 'GET'
        }).done(function(response) {
            $(".preloader-wrapper").hide();
            for (var i = 0; i < 10; i++) {
                var newEntry = $('<div>').addClass('card-panel');
                $('<h5>').addClass('header').text(response.items[i].snippet.title).appendTo(newEntry);
                var cardHorizontal = $('<div>').addClass('card horizontal');
                var cardImg = $('<div>').addClass('card-image');
                $('<img>').attr('src', response.items[i].snippet.thumbnails.medium.url).appendTo(cardImg);
                cardHorizontal.append(cardImg);
                var cardStacked = $('<div>').addClass('card-stacked');
                var cardContent = $('<div>').addClass('card-content');
                $('<p>').text(response.items[i].snippet.description).appendTo(cardContent);
                cardStacked.append(cardContent);
                var cardAction = $('<div>').addClass('card-action');
                var videoURL = youtubeWatchURL + response.items[i].id.videoId;
                $('<a>').attr('href', videoURL).attr('target', "_BLANK").text(videoURL).appendTo(cardAction);
                cardStacked.append(cardAction);
                cardHorizontal.append(cardStacked);
                newEntry.append(cardHorizontal);
                $('#search-links').append(newEntry);
            }
        });
    }

    function courseraAPIRequest(searchTerm) {
        var courseraQuery = "https://crossorigin.me/https://api.coursera.org/api/courses.v1?q=search&query=" + searchTerm + "&fields=photoUrl,description,name";
        // $.ajax({ url: courseraQuery, method: 'GET' }).done(function(response) {
        //     for (var i = 0; i < 10; i++) {
        //         var newEntry = $('<div>');
        //         newEntry.addClass('card-panel');
        //         var description = response.elements[i].description;
        //         var img = $('<img>');
        //         img.attr('src', response.elements[i].photoUrl);
        //         img.attr('height', 90);
        //         var title = response.elements[i].name;
        //         newEntry.append(img).append(title).append(description);
        //         $('#search-links').hide().append(newEntry).fadeIn(1500);
        //     }
        // });
        $.ajax({
            url: courseraQuery,
            method: 'GET'
        }).done(function(response) {
            $(".preloader-wrapper").hide();
            for (var i = 0; i < 10; i++) {
                var newEntry = $('<div>').addClass('card-panel');
                $('<h5>').addClass('header').text(response.elements[i].name).appendTo(newEntry);
                var cardHorizontal = $('<div>').addClass('card horizontal');
                var cardImg = $('<div>').addClass('card-image');
                $('<img>').attr('src', response.elements[i].photoUrl).appendTo(cardImg);
                cardHorizontal.append(cardImg);
                var cardStacked = $('<div>').addClass('card-stacked');
                var cardContent = $('<div>').addClass('card-content');
                $('<p>').text(response.elements[i].description).appendTo(cardContent);
                cardStacked.append(cardContent);
                var cardAction = $('<div>').addClass('card-action');
                $('<a>').attr('href', '#').appendTo(cardAction);
                cardStacked.append(cardAction);
                cardHorizontal.append(cardStacked);
                newEntry.append(cardHorizontal);
                $('#search-links').append(newEntry);
            }
        });
    }
});
