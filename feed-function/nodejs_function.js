const parser = require("rss-parser");
const feedSchemaModel = require("../models/schemas/FeedSchema");

var nodejsFunctionWhenDbIsEmpty = [
    function(){
        parser.parseURL("https://www.toptal.com/blog.rss", function(error,parsed){
            let len = parsed.feed.entries.length;
            let item = parsed.feed.entries;
            let regex = /https:\/\/www.toptal.com\/nodejs/;
            for(let i = 0; i < len; i++){
                if(regex.test(item[i].link)){
                    let entry = new feedSchemaModel({
                        title : item[i].title,
                        description : item[i].contentSnippet,
                        date : item[i].pubDate,
                        link : item[i].link,
                        creator : item[i].creator,
                        category : "nodejs",
                        archived : false,
                        published : false
                    });
                    entry.save(function(e){
                        if(e) throw e;
                        console.log("feed added from toptal");
                    });
                }
            }
        });
    },
    function(){
        parser.parseURL("https://nodesource.com/blog/rss", function(error,parsed){       
            let len = parsed.feed.entries.length;
            let item = parsed.feed.entries;
            for(let i = 0; i < len; i++){                            
                    let entry = new feedSchemaModel({
                    title : item[i].title,
                    description : item[i].contentSnippet,
                    date : item[i].pubDate,
                    link : item[i].link,
                    creator : item[i].creator,
                    category : "nodejs",
                    archived : false,
                    published : false
                });

                entry.save(function(e){
                    if(e) throw e;
                    console.log("feed added from nodesource");
                });
            
            }
        });
    } 
];

/////////////////////////////

var nodejsFunctionWhenDbIsNotEmpty = [
    function(){
        parser.parseURL("https://www.toptal.com/blog.rss", function(error,parsed){
            let len = parsed.feed.entries.length;
            let item = parsed.feed.entries;
            let regex = /https:\/\/www.toptal.com\/nodejs/;
            for(let i = 0; i < len; i++){
                if(regex.test(item[i].link)){
                    let titleName = item[i].title;
                    feedSchemaModel.find({"title" : titleName}, function(err, searchedItem){
                        if(searchedItem.length === 0){
                            let entry = new feedSchemaModel({
                                title : item[i].title,
                                description : item[i].contentSnippet,
                                date : item[i].pubDate,
                                link : item[i].link,
                                creator : item[i].creator,
                                category : "nodejs",
                                archived : false,
                                published : false
                            });
                            entry.save(function(e){
                                if(e) throw e;
                                console.log("feed added from toptal");
                            });
                        }
                    });
                }
            }
        });
    },

    function(){
        parser.parseURL("https://nodesource.com/blog/rss", function(error,parsed){       
            let len = parsed.feed.entries.length;
            let item = parsed.feed.entries;
            for(let i = 0; i < len; i++){
                let titleName = item[i].title;
                feedSchemaModel.find({"title" : titleName}, function(err,searchedItem){
                    if(searchedItem.length === 0){
                        let entry = new feedSchemaModel({
                            title : item[i].title,
                            description : item[i].contentSnippet,
                            date : item[i].pubDate,
                            link : item[i].link,
                            creator : item[i].creator,
                            category : "nodejs",
                            archived : false,
                            published : false
                        });
    
                        entry.save(function(e){
                            if(e) throw e;
                            console.log("feed added from nodesource");
                        });
                    }
                });                            
            }
        });
    }
];

module.exports = {
    nodejsFunctionWhenDbIsEmpty : nodejsFunctionWhenDbIsEmpty,
    nodejsFunctionWhenDbIsNotEmpty : nodejsFunctionWhenDbIsNotEmpty
};