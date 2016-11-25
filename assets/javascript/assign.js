$(document).ready(function() {
    //
    // GLOBAL VARIABLES ==================================================================================
    //
    var database = firebase.database();
    var materialClicked = false;
    var materialId = '';
    var studentObjKey = '';
    var videosObj;
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
        String(studentObjKey);
        console.log(studentObjKey);
        $('.collection-item').removeClass('active');
        $(this).addClass('active');
    });

    $('#assign-button').on('click', function() {
        if (materialId.length > 0 && studentObjKey.length > 0) {
            database.ref().child(studentObjKey).child('videos').push({
                videoId: materialId
            });
            $('.card-panel').removeClass('selected-card');
            //reset video ID and student key
            materialId = '';
            studentObjKey = '';
        } else {
            $("#modal3").show();
            $('.modal-close').on('click', function() {
                $('#modal3').hide();
            });
        }
    });
});
