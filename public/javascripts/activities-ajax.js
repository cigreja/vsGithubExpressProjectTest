
$(function(){

    var $activities = $('#activities');

    addActivity = function(activity){
        $activities.append('<li> id: ' + activity.id + ', client: '+ activity.client + ', project: ' + activity.project + '</li>');
    }

    function getActivites(){
        $.ajax({
            type:'GET',
            url:'/api/activities',
            dataType: 'json',
            success: function(activities){
                if(activities){
                    activities.forEach(function(activity){
                        addActivity(activity);
                    })
                }
            },
            error: function(xhr, desc, err) {
                console.log(xhr);
                console.log("Details: " + desc + "\nError:" + err);
            }
        });
    };

    $(document).ready(getActivites());

    $('#add-form').on('submit', function () {

        var activity = {
            client: $('#client').val(),
            project: $('#project').val()
        };

        $.ajax({
            type:'POST',
            url:'/api/addActivity',
            data: activity,
            dataType:'json',
            success: function(activity){
                addActivity(activity);
                alert('success\n new activity = ' + activity);
            },
            error: function(err) {
                alert(JSON.stringify(err));
                console.log(err);
            }
        });
    });

    $('#remove-form').on('submit', function () {

        let id = {
            id: parseInt($('#remove-id').val())
        };

        $.ajax({
            type:'POST',
            url:'/api/removeActivity',
            data: id,
            dataType:'json',
            success: function(activity){
                $('#activities').empty();
                getActivites();
                alert('success\n new activity = ' + activity);
            },
            error: function(err) {
                alert(JSON.stringify(err));
                console.log(err);
            }
        });
    });

    $('#update-form').on('submit', function () {

        var activity = {
            id: $('#update-id').val(),
            client: $('#update-client').val(),
            project: $('#update-project').val()
        };

        $.ajax({
            type:'POST',
            url:'/api/updateActivity',
            data: activity,
            dataType:'json',
            success: function(activity){
                getActivites();
                alert('success\n new activity = ' + activity);
            },
            error: function(err) {
                alert(JSON.stringify(err));
                console.log(err);
            }
        });
    });

});