$(document).ready(function() {

    var database = firebase.database();
    var youtubeLink = "www.youtube.com/watch?v=";

    $(".preloader-wrapper").show();

    // FIREBASE
    // Firebase call that happens on page load and value updates.
    database.ref().on("value", function(snapshot) {
        $('#search-links').empty();
        snapshot.forEach(function(childSnapshot) {
            var student = String(childSnapshot.key);
            var studentName = childSnapshot.val().name;
            var studentEmail = childSnapshot.val().email;
            var studentVideos = childSnapshot.val().videos;
            var studentKeyRemove = childSnapshot.val().key;


            var col = $('<div>').addClass('col s12 m6');
            var cardColor = $('<div>').addClass('card blue-grey darken-1');
            var cardContent = $('<div>').addClass('card-content white-text');
            var cardTitle = $('<span>').addClass('card-title').text(studentName + ' (' + studentEmail + ')');
            var cardAction = $('<div>').addClass('card-action');



            // <div class="row">
            //   <div class="col s12 m6">
            //     <div class="card blue-grey darken-1">
            //       <div class="card-content white-text">
            //         <span class="card-title">Card Title</span>
            //         <p>I am a very simple card. I am good at containing small bits of information.
            //         I am convenient because I require little markup to use effectively.</p>
            //       </div>
            //       <div class="card-action">
            //         <a href="#">This is a link</a>
            //         <a href="#">This is a link</a>
            //       </div>
            //     </div>
            //   </div>
            // </div>
            //


            childSnapshot.forEach(function(childSnapshot) {
                childSnapshot.forEach(function(childSnapshot) {
                    var studentVideoKey = childSnapshot.val().videoKey;
                    var studentVideo = childSnapshot.val().videoId;
                    var newStudentVideo;
                    var newStudentRemove;
                    if (studentVideo.length === 11) {
                        newStudentVideo = $('<a>').text(youtubeLink + studentVideo);
                        newStudentRemove = $('<span>').text('X').addClass('right remove').attr('data-keyRemove', studentKeyRemove).attr('data-videoRemove', studentVideoKey);
                        newStudentVideo.append(newStudentRemove);
                    } else {
                        newStudentVideo = $('<a>').text('Coursera Course: ' + studentVideo);
                        newStudentRemove = $('<span>').text('X').addClass('right remove').attr('data-keyRemove', studentKeyRemove).attr('data-videoRemove', studentVideoKey);
                        newStudentVideo.append(newStudentRemove);
                    }
                    var newLine = $('<br>');
                    cardAction.append(newStudentVideo);
                    cardAction.append(newLine);
                });
                col.append(cardColor);
                cardColor.append(cardContent);
                cardContent.append(cardTitle);
                cardContent.append(cardAction);
                $('#search-links').append(col);
            });
            $(".preloader-wrapper").hide();
        });


        // If it fails, cue error handling.
    }, function(errorObject) {
        // Log a read error and its error code.
        console.log("The read failed: " + errorObject.code);
    });

    // Delete student from database and DOM when X is clicked      EDIT EDIT OLD
    $(document.body).on('click', '.remove', function() {
        var keyRemove = $(this).attr('data-keyRemove');
        var videoRemove = $(this).attr('data-videoRemove');
        String(videoRemove);
        String(keyRemove);
        var counterDecriment;
        database.ref().on("value", function(snapshot) {
            counterDecriment = (snapshot.child(keyRemove).val().counter) - 1;
        });
        database.ref().child(keyRemove).update({
            counter: counterDecriment
        });
        database.ref().child(keyRemove).child('videos').child(videoRemove).remove();
    });


});
