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
    var studentObjId;
    var studentNum = 1;

    console.log('working');
    // FIREBASE
    // Firebase call that happens on page load and value updates.
    database.ref().on("value", function(snapshot) {
        $('#student-list').empty();
        // Console.log the value of this snapshot
        console.log(snapshot.val());
        snapshot.forEach(function(childSnapshot) {
            var name = childSnapshot.val().name;
            // var email = childSnapshot.val().email;
            $('#student-list').append("<a href='#!' class='collection-item'><p><input type='checkbox' id='test" + studentNum + "'/><label for='test" + studentNum + "'>" + name + "</label></p></a>");
            studentNum++;
        });
        // If it fails, cue error handling.
    }, function(errorObject) {
        // Log a read error and its error code.
        console.log("The read failed: " + errorObject.code);
    });

});
