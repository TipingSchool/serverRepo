const parser = require("rss-parser");
const feedSchemaModel = require("../models/schemas/FeedSchema");

var devopsFunctionWhenDbIsEmpty = [
    function(){
        parser.parseURL("https://devops.com/feed/", function(err_parse, parsed){
            let len = parsed.feed.entries.length;
            let item = parsed.feed.entries;
            for(let i = 0; i < len; i++){
                var entry = new feedSchemaModel({
                    title : item[i].title,
                    description : item[i].contentSnippet,
                    date : item[i].pubDate,
                    link : item[i].link,
                    creator : item[i].creator,
                    category : "devops",
                    archived : false,
                    published : false
                });
                entry.save(function(e){
                    if(e) throw e;
                    console.log("feed added from devops.com");
                });
            }
        });
    },
    function(){
        parser.parseURL("https://www.productplan.com/blog/feed/", function(err_parse, parsed){
            let len = parsed.feed.entries.length;
            let item = parsed.feed.entries;
            for(let i = 0; i < len; i++){
                var entry = new feedSchemaModel({
                    title : item[i].title,
                    description : item[i].contentSnippet,
                    date : item[i].pubDate,
                    link : item[i].link,
                    creator : item[i].creator,
                    category : "devops",
                    archived : false,
                    published : false
                });
                entry.save(function(e){
                    if(e) throw e;
                    console.log("feed added from productplan");
                });
            }
        });
    },
    function(){
        parser.parseURL("https://www.devopsguys.com/blog/feed/", function(err_parse,parsed){
            let len = parsed.feed.entries.length;
            let item = parsed.feed.entries;
            for(let i = 0; i < len; i++){
                var entry = new feedSchemaModel({
                    title : item[i].title,
                    description : item[i].contentSnippet,
                    date : item[i].pubDate,
                    link : item[i].link,
                    creator : item[i].creator,
                    category : "devops",
                    archived : false,
                    published : false
                });
                entry.save(function(e){
                    if(e) throw e;
                    console.log("feed added from devops guys");
                });
            }
        });
    }
];

var devopsFunctionWhenDbIsNotEmpty = [
    function(){
        parser.parseURL("https://www.productplan.com/blog/feed/", function(err_parse, parsed){
            let len = parsed.feed.entries.length;
            let item = parsed.feed.entries;
            for(let i = 0; i < len; i++){
                feedSchemaModel.find({"title" : item[i].title}, function(err,searchedItem){
                    if(searchedItem.length === 0){
                        var entry = new feedSchemaModel({
                            title : item[i].title,
                            description : item[i].contentSnippet,
                            date : item[i].pubDate,
                            link : item[i].link,
                            creator : item[i].creator,
                            category : "devops",
                            archived : false,
                            published : false
                        });
                        entry.save(function(e){
                            if(e) throw e;
                            console.log("feeds added from devops.com");
                        });
                    }
                });

            }
        });
    },
    function(){
        parser.parseURL("https://devops.com/feed/", function(err_parse,parsed){
            let len = parsed.feed.entries.length;
            let item = parsed.feed.entries;
            for(let i = 0; i < len; i++){
                feedSchemaModel.find({"title" : item[i].title}, function(err,searchedItem){
                    if(searchedItem.length === 0){
                        var entry = new feedSchemaModel({
                            title : item[i].title,
                            description : item[i].contentSnippet,
                            date : item[i].pubDate,
                            link : item[i].link,
                            creator : item[i].creator,
                            category : "devops",
                            archived : false,
                            published : false
                        });
                        entry.save(function(e){
                            if(e) throw e;
                            console.log("feeds added from devops.com");
                        });                
                    }
                });
                
            }
        });
    },

    function(){
        parser.parseURL("https://www.devopsguys.com/blog/feed/", function(err_parse,parsed){
            let len = parsed.feed.entries.length;
            let item = parsed.feed.entries;
            for(let i = 0; i < len; i++){
                feedSchemaModel.find({"title" : item[i].title}, function(err, searchedItem){
                    if(searchedItem.length === 0){
                        var entry = new feedSchemaModel({
                            title : item[i].title,
                            description : item[i].contentSnippet,
                            date : item[i].pubDate,
                            link : item[i].link,
                            creator : item[i].creator,
                            category : "devops",
                            archived : false,
                            published : false
                        });
                        entry.save(function(e){
                            if(e) throw e;
                            console.log("feed added from devops guys");
                        });
                    }
                });
                    
            }
        });
    }
];


module.exports = {
    devopsFunctionWhenDbIsEmpty : devopsFunctionWhenDbIsEmpty,
    devopsFunctionWhenDbIsNotEmpty : devopsFunctionWhenDbIsNotEmpty
};