$(document).ready(function() {

    var database = firebase.database();
    var youtubeLink = "www.youtube.com/watch?v=";


    // FIREBASE
    // Firebase call that happens on page load and value updates.
    database.ref().on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var student = String(childSnapshot.key);
            var studentName = childSnapshot.val().name;
            var studentEmail = childSnapshot.val().email;
            var studentVideos = childSnapshot.val().videos;


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
                    console.log(childSnapshot.val().videoId);
                    studentVideo = childSnapshot.val().videoId;
                    var newStudentVideo;
                    if (studentVideo.length === 11) {
                        newStudentVideo = $('<a>').text(youtubeLink + studentVideo).attr('href', 'youtubeLink + studentVideo');
                    } else {
                        newStudentVideo = $('<a>').text('Coursera Course: ' + studentVideo);
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
        });


        // If it fails, cue error handling.
    }, function(errorObject) {
        // Log a read error and its error code.
        console.log("The read failed: " + errorObject.code);
    });


});
