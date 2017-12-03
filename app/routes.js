


const express = require("express");
const router = express.Router();
const path = require("path");
const feedSchemaModel = require("../models/schemas/FeedSchema");
const ArraySchemaModel = require('../models/schemas/ArraySchema');
const addAutoFeeds = require("../feed-function/addAutoFeeds");
const addNewCategory = require('../models/catArray');
const ArrayFunctions = require('../feed-function/ArrayFunctions');
const async = require('async');

// categories function imports
// const Function_for_fetching_Nodejs_feeds = require("../feed-function/nodejs_function");
// const Function_for_fetching_Devops_feeds = require("../feed-function/devops_function");
const FetchAllFeeds = require("../feed-function/fetchAllFeeds");

////////////////////////// API endpoints GET / POST / PUT /DELETE////////////////////
//ArrayFunctions.Init();
//FetchAllFeeds();

async.series(ArrayFunctions.Init() ,FetchAllFeeds());
 setInterval(function(){
     FetchAllFeeds();
     
 }, 604800000);


router.get('/feeds/:cat/', function(req,res) {

    if(Object.keys(req.query).length == 0 ) {
        feedSchemaModel.find({"category" : {$regex : req.params.cat.toLowerCase()},"published" : false, "archived" : false}).sort({"date" : -1}).exec(function(err, data){
            if(err) {
                res.setHeader("status",false);
                res.json({"status" : false});
                return;
            }
            res.setHeader("status",true);
            res.json(data);
        }); 
    }


    if(req.query.state === 'pub') {
        feedSchemaModel.find({"category" : {$regex : req.params.cat}, "published" : true }).sort({"date" : -1}).exec(function(err, data){
            if(err) {
                res.json({"status" : false});
                return;
            }
            res.setHeader("status",true);
            res.json(data);
            console.log("published : " + req.params.cat)
        });
    }

    if (req.query.state === 'arch'){
        feedSchemaModel.find({"category" : {$regex : req.params.cat}, "archived" : true }).sort({"date" : -1}).exec(function(err, data){
            if(err) {
                res.setHeader("status",false);
                return;
            }
           
            res.setHeader("status",true);
            res.json(data);
        });
    }

    if (req.query.state === 'pubarch') {
        feedSchemaModel.find({"category" : {$regex : req.params.cat}, "published" : true , "archived" : true }).sort({"date" : -1}).exec(function(err, data){
            if(err) {
                res.setHeader("status",false);
                return;
            }
           
            res.setHeader("status",true);
            res.json(data);
        });
    }

    if (req.query.state === 'unpubarch') {
        feedSchemaModel.find({"category" : {$regex : req.params.cat}, "published" : false , "archived" : true }).sort({"date" : -1}).exec(function(err, data){
            if(err) {
                res.setHeader("status",false);
                return;
            }
            
            res.setHeader("status",true);
            res.json(data);
        });
    }

    if(req.query.state === "unpub") {
        feedSchemaModel.find({"category" : {$regex : req.params.cat}, "published" : false }).sort({"date" : -1}).exec(function(err, data){
            console.log("unpublished" + req.params.cat)
            if(err) {
                res.setHeader("status",false);
                return;
            }
           
            res.setHeader("status",true);
            res.json(data);
            });
    }
    if(req.query.state === "latest100") {
        feedSchemaModel.find({"category" : {$regex : req.params.cat}}).sort({"date" : -1}).limit(100).exec(function(err, data){
            if(err) {
                res.setHeader("status",false);
                res.end();
                return;
            }
           
            res.setHeader("status",true);
            res.json(data);
           // console.log("errassssssssssssssssssssssssssssssssssssl");
            return;
        });  
    }

    if(req.query.state === "last7days") {
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() -7);
        feedSchemaModel.find({"category" : {$regex : req.params.cat},"date":{$gte:lastWeek}}).sort({"date" : -1}).exec(function(err, data){
            if(err) {
                res.setHeader("status",false);
                console.log("asdas");
                res.end();
                return;
            }
           
            res.setHeader("status",true);
            //console.log(data);
            res.json(data);
            return;
        });  
    }

    if(req.query.state === "last14days") {
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() -14);
        feedSchemaModel.find({"category" : {$regex : req.params.cat},"date":{$gte:lastWeek}}).sort({"date" : -1}).exec(function(err, data){
            if(err) {
                res.setHeader("status",false);
                res.end();
                return;
            }
           
            res.setHeader("status",true);
            res.json(data); 
            return;
        });  
    }
    if(req.query.state === "last21days") {
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() -21);
        feedSchemaModel.find({"category" : {$regex : req.params.cat},"date":{$gte:lastWeek}}).sort({"date" : -1}).exec(function(err, data){
            if(err) {
                res.setHeader("status",false);
                res.end();
                return;
            }
           
            res.setHeader("status",true);
            res.json(data); 
            return;
        });  
    }

});


router.get("/",function(req,res){
    if(req.query.state === "pub") {
        feedSchemaModel.find({"published" : true, "archived" : false}).sort({"date" : -1}).exec(function(err, data){
            if(err) {
                res.setHeader("status",false);
                //res.end();
                data = {};
                return;
            }
           
            res.setHeader("status",true);
            res.json(data);
            return;
         });  
    }

    if(req.query.state === "arch") {
        feedSchemaModel.find({"published" : false, "archived" : true}).sort({"date" : -1}).exec(function(err, data){
            if(err) {
                res.setHeader("status",false);
                data = {};
                return;
            }
          
            res.setHeader("status",true);
            res.json(data);
            return;
         });  
    }

    if(req.query.state == undefined) {
        feedSchemaModel.find({"published" : false, "archived" : false}).sort({"date" : -1}).exec(function(err, data){
            if(err) {
                res.setHeader("status",false);
                data = {};
                return;
            }
           
            res.setHeader("status",true);
            res.json(data);
            return;
        });  
    }

    if(req.query.state === "pubarch") {
        feedSchemaModel.find({"published" : true, "archived" : true}).sort({"date" : -1}).exec(function(err, data){
            if(err) {
                res.setHeader("status",false);
                return;
            }
         
            res.setHeader("status",true);
            res.json(data);
            return;
        });  
    }

    if(req.query.state === "unpubarch") {
        feedSchemaModel.find({"published" : false, "archived" : true}).sort({"date" : -1}).exec(function(err, data){
            if(err) {
                res.setHeader("status",false);
                return;
            }
           
            res.setHeader("status",true);
            res.json(data); 
            return;
        });  
    }
    
    if(req.query.state === "latest100") {
        feedSchemaModel.find({}).sort({"date" : -1}).limit(100).exec(function(err, data){
            if(err) {
                res.setHeader("status",false);
                res.end();
                return;
            }
            
            res.setHeader("status",true);
            res.json(data); 
            return;
        });  
    }

    if(req.query.state === "last7days") {
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() -7);
        feedSchemaModel.find({"category" : {$regex : req.params.cat},"date":{$gte:lastWeek}}).sort({"date" : -1}).exec(function(err, data){
            if(err) {
                res.setHeader("status",false);
                return;
            }
           
            res.setHeader("status",true);
            res.json(data);
            return; 
        });  
    }

    if(req.query.state === "last14days") {
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() -14);
        feedSchemaModel.find({"category" : {$regex : req.params.cat},"date":{$gte:lastWeek}}).sort({"date" : -1}).exec(function(err, data){
            if(err) {
                res.setHeader("status",false);
                return;
            }
           
            res.setHeader("status",true);
            res.json(data); 
            return;
        });  
    }
    if(req.query.state === "last21days") {
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() -21);
        feedSchemaModel.find({"category" : {$regex : req.params.cat},"date":{$gte:lastWeek}}).sort({"date" : -1}).exec(function(err, data){
            if(err) {
                res.setHeader("status",false);
                return;
            }
           
            res.setHeader("status",true);
            res.json(data); 
            return;
        });  
    }

   
     
});


// ***************************** POST *********************************
// post can pub , unpub, delete, archive any cat 
//feeds?cat=react  and body.action = delete, body.id = blabla 

router.post('/',function(req,res){
    res.removeHeader(status);
    if(req.body.action === "delete"){
        let _id = req.body.feedObjectId;
        feedSchemaModel.findByIdAndRemove(_id, function(err){
            if(err) {
                res.setHeader("status" , false);
                res.end();
                return;
            }
            res.setHeader("status" , true);
            res.end();
        });
    }
    else if(req.body.action === "archive"){
        let _id = req.body.feedObjectId;
        feedSchemaModel.findByIdAndUpdate(_id, { $set : {"archived" : true}}, function(err,doc){
            if(err) {
                res.setHeader("status" , false);
                res.end();
                return;
            }
            res.setHeader("status" , true);
            res.end();
        });
    }

    else if(req.body.action === "publish"){
        let _id = req.body.feedObjectId;
        feedSchemaModel.findByIdAndUpdate(_id, { $set : {"published" : true}}, function(err,doc){
            if(err) {
                res.setHeader("status" , false);
                res.end();
                return;
            }
            res.setHeader("status" , true);
            res.end();
        });
    }

    else if(req.body.action === "unpublish"){
        let _id = req.body.feedObjectId;
        feedSchemaModel.findByIdAndUpdate(_id, { $set : {"published" : false}}, function(err,doc){
            if(err) {
                res.setHeader("status" , false);
                res.end();
                return;
            }
            res.setHeader("status" , true);
            res.end();
        });
    }

});

router.post('/feeds/:cat',function(req,res){
    if(req.body.action === "delete"){
        let _id = req.body.feedObjectId;
        feedSchemaModel.findByIdAndRemove(_id, function(err){
            if(err) {
                res.setHeader("status" , false);
                res.end();
                return;
            }
            res.setHeader("status" , true);
            res.end();
        });
    }
    else if(req.body.action === "archive"){
        let _id = req.body.feedObjectId;
        feedSchemaModel.findByIdAndUpdate(_id, { $set : {"archived" : true}}, function(err,doc){
            if(err) {
                res.setHeader("status" , false);
                res.end();
                return;
            }
            res.setHeader("status" , true);
            res.end();
        });
    }

    else if(req.body.action === "publish"){
        console.log("called");
        let _id = req.body.feedObjectId;
        feedSchemaModel.findByIdAndUpdate(_id, { $set : {"published" : true}}, function(err,doc){
            if(err) {
                res.setHeader("status" , false);
                res.end();
                return;
            }
        });
    }

    else if(req.body.action === "unpublish"){
        let _id = req.body.feedObjectId;
        feedSchemaModel.findByIdAndUpdate(_id, { $set : {"published" : false}}, function(err,doc){
            if(err) {
                res.setHeader("status" , false);
                res.end();
                return;
            }
            res.setHeader("status" , true);
            res.end();
        });
    }

});



router.get("/search",function(req,res){
      feedSchemaModel.find(
          {$text: {$search: req.query.q}},
        { score : { $meta: "textScore" } }
      ).sort({ score : { $meta : 'textScore' } }
      ).exec(function(err, data){
        res.json(data);
    });
        
});

router.post('/addnewurl',function(req,res) {
    let url = req.body.url;
    //console.log(req.body.url);
    

    if(addAutoFeeds(url)) {

        ArrayFunctions.addNewUrl(url,function (err,status) {
            if(err) {
                res.json({"status" : false});
                return;
            }
               // console.log("statis is " + status);
                //addAutoFeeds(url);
                res.json({"status" : true});
        });
    }
    
});

router.post('/addnewcat', function(req,res) {
    let category = req.body.cat;
    ArrayFunctions.addNewCat(category, function (err,status) {
        if(err) {
            res.json({"status" : false});
            return;
        }
            res.json({"status" : true});
    });
});

// ***************************************** DONEEEEEEEEEEEEEEEEEEEEEEEEEEE **************************
module.exports = router;