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
    var studentNum = 1;
    var pushKey;
    //
    // CODE ==================================================================================
    //
    // Firebase call that happens on page load and value updates.
    database.ref().on("value", function(snapshot) {
        $('#student-list').empty();
        // Console.log the value of this snapshot
        console.log(snapshot.val());
        snapshot.forEach(function(childSnapshot) {
            var name = childSnapshot.val().name;
            var keyFromDatabase = childSnapshot.val().key;
            var studentElement = "<a href='#!' class='collection-item' data-studentKey='" + keyFromDatabase + "'><p><input type='checkbox' id='test" + studentNum + "'/><label for='test" + studentNum + "'>" + name + "</label><span class='right delete' data-keyDelete='" + keyFromDatabase + "'>X</span></p></a>";
            // var email = childSnapshot.val().email;
            $('#student-list').append(studentElement);
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
});
