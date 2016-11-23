$(document).ready(function() {
    //
    // GLOBAL VARIABLES ==================================================================================
    //
    var youtubeWatchURL = "https://www.youtube.com/watch?v=";
    var searchTerm = "";
    //
    // CODE ==================================================================================
    //
    // Hides preloader on page load
    $(".preloader-wrapper").hide();
    $(".indicator").hide();
    // Search button
    $("#search-button").on('click', function() {
        searchTerm = $('#search-box').val().trim();
        if (searchTerm.length > 0) {
            $(".getting-started").hide();
            $('#search-links').empty();
            $(".preloader-wrapper").show();
            $('#search-box').val('');
            youtubeAPIRequest(searchTerm);
            return false;
        } else {
            $("#modal2").show();
            $('.modal-close').on('click', function() {
                $('#modal2').hide();
            });
        }
    });
    $(".site").on('click', function() {
        $(".preloader-wrapper").show();
        var clickedSite = $(this).attr('data-site');
        $('#search-links').empty();
        if (clickedSite === 'youtube') {
            $('.site').removeClass('active-tab');
            $(this).addClass('active-tab');
            youtubeAPIRequest(searchTerm);
        } else if (clickedSite === 'khan') {
            $('.site').removeClass('active-tab');
            $(this).addClass('active-tab');
            youtubeKhanAPIRequest(searchTerm);
        } else {
            $('.site').removeClass('active-tab');
            $(this).addClass('active-tab');
            courseraAPIRequest(searchTerm);
        }
        return false;
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
                newEntry.attr('data-id', response.items[i].id.videoId);
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
                newEntry.attr('data-id', response.items[i].id.videoId);
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
                newEntry.attr('data-id', response.elements[i].name);
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
