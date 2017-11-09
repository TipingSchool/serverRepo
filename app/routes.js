const express = require("express");
const router = express.Router();
const path = require("path");
const feedSchemaModel = require("../models/schemas/FeedSchema");
const addAutoFeeds = require("../feed-function/addAutoFeeds");


// categories function imports
// const Function_for_fetching_Nodejs_feeds = require("../feed-function/nodejs_function");
// const Function_for_fetching_Devops_feeds = require("../feed-function/devops_function");
const FetchAllFeeds = require("../feed-function/fetchAllFeeds");

////////////////////////// API endpoints GET / POST / PUT /DELETE////////////////////

FetchAllFeeds();
 setInterval(function(){
     FetchAllFeeds();
 }, 604800000);
    



router.get("/",function(req,res){
    if(req.query.state === "pub") {
        feedSchemaModel.find({"published" : true, "archived" : false}).sort({"date" : -1}).exec(function(err, data){
        res.json(data);
         });  
    }

    if(req.query.state === "arch") {
        feedSchemaModel.find({"published" : false, "archived" : true}).sort({"date" : -1}).exec(function(err, data){
        res.json(data);
         });  
    }

    if(req.query.state === "unpub") {
        feedSchemaModel.find({"published" : false, "archived" : false}).sort({"date" : -1}).exec(function(err, data){
        res.json(data);
         });  
    }

    if(req.query.state === "pubarch") {
        feedSchemaModel.find({"published" : true, "archived" : true}).sort({"date" : -1}).exec(function(err, data){
        res.json(data);
         });  
    }

    if(req.query.state === "unpubarch") {
        feedSchemaModel.find({"published" : false, "archived" : true}).sort({"date" : -1}).exec(function(err, data){
        res.json(data);
         });  
    }
     
});

// **************************** GET ************************************88
// feeds?cat=react&state=none => all unpublished of react
// get can get pub, unpub, archived, pub&arch

router.get('/feeds',function(req,res){

    //console.log(req.query);
    if(req.query.state === 'pub') {
        feedSchemaModel.find({"category" : {$regex : req.query.cat}, "published" : true }).sort({"date" : -1}).exec(function(err, data){
        res.json(data);
        });
    }

    if (req.query.state === 'arch'){
        feedSchemaModel.find({"category" : {$regex : req.query.cat}, "archived" : true }).sort({"date" : -1}).exec(function(err, data){
        res.json(data);
        });
    }

    if (req.query.state === 'archpub') {
        feedSchemaModel.find({"category" : {$regex : req.query.cat}, "published" : true , "archived" : true }).sort({"date" : -1}).exec(function(err, data){
        res.json(data);
        });
    }

    if(req.query.state === "unpub") {
        feedSchemaModel.find({"category" : {$regex : req.query.cat}, "published" : false }).sort({"date" : -1}).exec(function(err, data){
            res.json(data);
            });
    }

    if(req.query.state === "none" ) {
        
        feedSchemaModel.find({"category" : {$regex : req.query.cat}, "published" : false }).sort({"date" : -1}).exec(function(err, data){
        res.json(data);
        });
    }
}); 

// ***************************** POST *********************************
// post can pub , unpub, delete, archive any cat 
//feeds?cat=react  and body.action = delete, body.id = blabla 

router.post('/feeds',function(req,res){
    if(req.body.action === "delete"){
        let _id = req.body.feedObjectId;
        feedSchemaModel.findByIdAndRemove(_id, function(err){
            if(err){
                console.log("something gone wrong");
            }
            else{
                console.log("deleted successfully");
            }
        });
    }
    else if(req.body.action === "archive"){
        let _id = req.body.feedObjectId;
        feedSchemaModel.findByIdAndUpdate(_id, { $set : {"archived" : true}}, function(err,doc){
            if(err){
                console.log("Something gone wrong!!");
            }
            else{
                console.log("archived succesfully");
            }
        });
    }

    else if(req.body.action === "publish"){
        let _id = req.body.feedObjectId;
        feedSchemaModel.findByIdAndUpdate(_id, { $set : {"published" : true}}, function(err,doc){
            if(err){
                console.log("Something gone wrong!!");
            }
            else{
                console.log("published succesfully");
            }
        });
    }

    else if(req.body.action === "unpublish"){
        let _id = req.body.feedObjectId;
        feedSchemaModel.findByIdAndUpdate(_id, { $set : {"published" : false}}, function(err,doc){
            if(err){
                console.log("Something gone wrong!!");
            }
            else{
                console.log("published succesfully");
            }
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

router.post('/autoadd',function(req,res) {
    let url = req.query.url;
    addAutoFeeds(url);
});

// ***************************************** DONEEEEEEEEEEEEEEEEEEEEEEEEEEE **************************
module.exports = router;