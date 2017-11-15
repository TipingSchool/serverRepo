const parser = require('rss-parser');
const feedSchemaModel = require("../models/schemas/FeedSchema");
const updateCategory = require("./updateCategory");

 
function addAutoFeeds (url) {
    let flag = 0;

    (function() {
        parser.parseURL(url, function(error, parsed){
            if(error) {
               flag = 1;
               return false;
            }
            let len = parsed.feed.entries.length;
            let item = parsed.feed.entries; 
            console.log(len);

            for(let i = 0; i < len; i++){
                
                let titleName = item[i].title;
                let initCat = "";
                feedSchemaModel.find({"title" : titleName}, function(err, searchedItem){
                    if(searchedItem.length === 0){
                        //console.log(item[i].categories);
                        //console.log(item[i]);
                        let entry = new feedSchemaModel({
                            title : item[i].title,
                            description : item[i].contentSnippet,
                            date : item[i].pubDate,
                            link : item[i].link,
                            creator : item[i].creator,
                            category : item[i].categories  == undefined ? updateCategory(item[i]) : item[i].categories,
                            archived : false,
                            published : false
                        });

                            if(entry.category != "discard") {
                                entry.save(function(e){
                                    if(e) throw e;
                                    //console.log("feed added..........");
                                    console.log("cateogy is " + entry.category);
                                });
                            }

                            
                        
                    }
                });
             }
            
            console.log("done............");
        });

        //updateCategory(cat);
    })();

    if(flag == 1) return false;
    return true;
}

module.exports = addAutoFeeds;