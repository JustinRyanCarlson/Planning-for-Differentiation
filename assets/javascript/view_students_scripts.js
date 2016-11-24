$(document).ready(function() {
    //
    // FIREBASE INITIALIZE ==================================================================================
    //


    var database = firebase.database();
    var youtubeLink = "https://www.youtube.com/watch?v=";
    var arr = [];


    // FIREBASE
    // Firebase call that happens on page load and value updates.
    database.ref().on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var student = String(childSnapshot.key);
            var studentName = childSnapshot.val().name;
            var studentEmail = childSnapshot.val().email;
            var studentVideos = childSnapshot.val().videos;
            console.log(student, studentName, studentEmail, studentVideos);
            var newStudent = $('<div>');
            var newStudentName = $('<div>').append('<h4> Name: ' + studentName + '</h4>');
            var newStudentEmail = $('<div>').append('<h4> Email: ' + studentEmail + '</h4>');
            newStudent.append(newStudentName);
            newStudent.append(newStudentEmail);

            childSnapshot.forEach(function(childSnapshot) {
                childSnapshot.forEach(function(childSnapshot) {
                    console.log(childSnapshot.val().videoId);
                    studentVideo = childSnapshot.val().videoId;
                    var newStudentVideo = $('<div>').append('<h4> Video: ' + youtubeLink + studentVideo + '</h4>');
                    newStudent.append(newStudentVideo);
                });

                $('.getting-started-text').append(newStudent);
            });
        });


        // If it fails, cue error handling.
    }, function(errorObject) {
        // Log a read error and its error code.
        console.log("The read failed: " + errorObject.code);
    });


});
