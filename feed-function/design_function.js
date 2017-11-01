const parser = require("rss-parser");
const feedSchemaModel = require("../models/schemas/FeedSchema");

var designFunctionWhenDbIsEmpty = [
    function(){
        parser.parseURL("https://webdesignledger.com/feed/", function(err_parsed, parsed){
            let len = parsed.feed.entries.length;
            let item = parsed.feed.entries;
            for(let i = 0; i < len; i++){
                var entry = new feedSchemaModel({
                    title : item[i].title,
                    description : item[i].contentSnippet,
                    date : item[i].pubDate,
                    link : item[i].link,
                    creator : item[i].creator,
                    category : "design",
                    archived : false,
                    published : false
                });
                entry.save(function(e){
                    if(e) throw e;
                    console.log("feed added web design ledger");
                });
            }
        });
    }
];

var designFunctionWhenDbIsNotEmpty = [
    function(){
        parser.parseURL("https://webdesignledger.com/feed/", function(err_parse, parsed){
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
                            category : "design",
                            archived : false,
                            published : false
                        });
                        entry.save(function(e){
                            if(e) throw e;
                            console.log("feed added web design ledger");
                        });
                    }
                });

            }
        });
    }
];

module.exports = {
    designFunctionWhenDbIsEmpty : designFunctionWhenDbIsEmpty,
    designFunctionWhenDbIsNotEmpty : designFunctionWhenDbIsNotEmpty
};