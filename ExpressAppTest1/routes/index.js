var express = require('express');
var router = express.Router();
var fs = require('fs');
var activitiesPath = 'public/api/activities';

function getData(path){
    var file = fs.readFileSync(path);
    if(file.length === 0){
        return [];
    }
    return JSON.parse(file);
}


/*********************************************
             GET home page.
**********************************************/
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});


/*********************************************
 ADD activity.
 **********************************************/
router.post('/api/addActivity', function(req, res, next) {

    let activities = getData(activitiesPath);
    let id = 0;
    if(activities.length !== 0){
        id = activities[activities.length - 1].id + 1;
    }
    var activity = {
        id: id,
        client: req.body.client,
        project: req.body.project
    };

    // add the order
    activities.push(activity);

    // update json file
    fs.writeFile(activitiesPath, JSON.stringify(activities));

    // send back a response to ajax
    res.send(JSON.stringify(activity));
});

/*********************************************
 REMOVE activity.
 **********************************************/
router.post('/api/removeActivity', function(req, res, next) {

    let activities = getData(activitiesPath);
    var activity = {};
    if(activities.length !== 0){
        for(var i = 0; i < activities.length; i++){
            if(parseInt(activities[i].id) === parseInt(req.body.id)){
                activity = activities[i];
                activities.splice(i,1);
                break;
            }
        }

        // update json file
        fs.writeFile(activitiesPath, JSON.stringify(activities));
    }

    // send back a response to ajax
    res.send(JSON.stringify(activity));
});

/*********************************************
 UPDATE activity.
 **********************************************/
router.post('/api/updateActivity', function(req, res, next) {

    let activities = getData(activitiesPath);
    var activity = {};
    if(activities.length !== 0){
        for(var i = 0; i < activities.length; i++){
            if(parseInt(activities[i].id) === parseInt(req.body.id)){
                activities[i].client = req.body.client;
                activities[i].project = req.body.project;
                break;
            }
        }

        // update json file
        fs.writeFile(activitiesPath, JSON.stringify(activities));
    }

    // send back a response to ajax
    res.send(JSON.stringify(activity));
});

module.exports = router;