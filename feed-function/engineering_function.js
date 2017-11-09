const parser = require("rss-parser");
const feedSchemaModel = require("../models/schemas/FeedSchema");

var engineeringFunctionWhenDbIsEmpty = [
    function(){
        parser.parseURL("http://engineering.webengage.com/feed/", function(err, parsed){
            let len = parsed.feed.entries.length;
            let item = parsed.feed.entries;
            for(let i = 0; i < len; i++){
                var entry = new feedSchemaModel({
                    title : item[i].title,
                    description : item[i].contentSnippet,
                    date : item[i].pubDate,
                    link : item[i].link,
                    creator : item[i].creator,
                    category : item[i].category,
                    archived : false,
                    published : false
                });
                entry.save(function(e){
                    if(e) throw e;
                    console.log("feed added from webengage engineering");
                    console.log("cateogy is " + item[i].category);
                });
            }
        });
    }
];


var engineeringFunctionWhenDbIsNotEmpty = [
    function(){
        parser.parseURL("http://engineering.webengage.com/feed/", function(err, parsed){
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
                        category : "engineering",
                        archived : false,
                        published : false
                    });
                    entry.save(function(e){
                        if(e) throw e;
                        console.log("feed added from webengage engineering");
                    });
                }
            });
        }
    });
}
];

module.exports = {
    engineeringFunctionWhenDbIsEmpty : engineeringFunctionWhenDbIsEmpty,
    engineeringFunctionWhenDbIsNotEmpty : engineeringFunctionWhenDbIsNotEmpty
};

