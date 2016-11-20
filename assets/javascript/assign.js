$(document).ready(function() {
    //
    // GLOBAL VARIABLES ==================================================================================
    //
    var database = firebase.database();
    var materialClicked = false;
    var materialId;
    var studentObjKey;
    var videosObj;
    // var materialArray = [];
    //
    // CODE ==================================================================================
    //
    $(document.body).on('click', '.card-panel', function() {
        if (materialClicked === false) {
            materialClicked = true;
            $(this).addClass('selected-card');
            materialId = $(this).data('id');
        } else {
            $('.card-panel').removeClass('selected-card');
            $(this).addClass('selected-card');
            materialId = $(this).data('id');
        }
    });

    $(document.body).on('click', '.collection-item', function() {
        studentObjKey = $(this).attr('data-studentKey');
        studentCounter = $(this).attr('data-counter');
        String(studentObjKey);
        console.log(studentObjKey);
        $('.collection-item').removeClass('active');
        $(this).addClass('active');
    });

    $('#submit-button').on('click', function() {

        studentCounter++;
        //var vidoesObj = object we get back from firebase
        //add new video as new key value pair with key being counter value
        console.log(studentCounter);
        database.ref().child(studentObjKey).update({
            counter: studentCounter
        });
        database.ref().on("value", function(snapshot) {
            videosObj = snapshot.child(studentObjKey).val().videos;
            console.log(videosObj);
            videosObj[studentCounter] = materialId;
            database.ref().child(studentObjKey).update({
                videos: videosObj
            });
        });
        $('.card-panel').removeClass('selected-card');
    });
});
