const parser = require("rss-parser");
const feedSchemaModel = require("../models/schemas/FeedSchema");

var productFunctionWhenDbIsEmpty = [
    function(){
        parser.parseURL("http://www.mindtheproduct.com/feed/", function(err_parsed, parsed){
            let len = parsed.feed.entries.length;
            let item = parsed.feed.entries;
            for(let i = 0; i < len; i++){
                var entry = new feedSchemaModel({
                    title : item[i].title,
                    description : item[i].contentSnippet,
                    date : item[i].pubDate,
                    link : item[i].link,
                    creator : item[i].creator,
                    category : "product",
                    archived : false,
                    published : false
                });
                entry.save(function(e){
                    if(e) throw e;
                    console.log("feed added from mindproduct");
                });
            }
        });
    },
    function(){
        parser.parseURL("http://blog.aha.io/category/product-management/feed/", function(err_parsed, parsed){
            let len = parsed.feed.entries.length;
            let item = parsed.feed.entries;
            for(let i = 0; i < len; i++){
                var entry = new feedSchemaModel({
                    title : item[i].title,
                    description : item[i].contentSnippet,
                    date : item[i].pubDate,
                    link : item[i].link,
                    creator : item[i].creator,
                    category : "product",
                    archived : false,
                    published : false
                });
                entry.save(function(e){
                    if(e) throw e;
                    console.log("feed added from aha.io");
                });
            }
        });
    }
];

var productFunctionWhenDbIsNotEmpty = [
    function(){
        parser.parseURL("http://www.mindtheproduct.com/feed/", function(err_parse, parsed){
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
                            category : "product",
                            archived : false,
                            published : false
                        });
                        entry.save(function(e){
                            if(e) throw e;
                            console.log("feeds added from mindtheproduct");
                        });
                    }
                });

            }
        });
    },
    function(){
        parser.parseURL("http://blog.aha.io/category/product-management/feed/", function(err_parse, parsed){
            let len = parsed.feed.entries.length;
            let item = parsed.feed.entries;
            for(let i = 0; i < len; i++){
                feedSchemaModel.find({"title" : item[i].title}, function(err,searchedItem){
                    if(searchedItem.length === 0){
                        var entry = new feedSchemaModel({
                            title : item[i].title,
                            description : item[i].content,
                            date : item[i].pubDate,
                            link : item[i].link,
                            creator : item[i].creator,
                            category : "product",
                            archived : false,
                            published : false
                        });
                        entry.save(function(e){
                            if(e) throw e;
                            console.log("feed added from aha.io");
                        });
                    }
                });

            }
        });
    }
];

module.exports = {
    productFunctionWhenDbIsEmpty : productFunctionWhenDbIsEmpty,
    productFunctionWhenDbIsNotEmpty : productFunctionWhenDbIsNotEmpty
};