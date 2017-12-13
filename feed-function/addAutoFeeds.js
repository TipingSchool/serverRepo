

const parser = require('rss-parser');
const feedSchemaModel = require("../models/schemas/FeedSchema");
const updateCategory = require("./updateCategory");

 
function addAutoFeeds (url, callback) {
    var flag;
    let parsePromise = new Promise ((resolve, reject) => {
        parser.parseURL(url, function(error, parsed){
            if(parsed == undefined) {
                console.log("inside eror")
                reject();
                return;
            }
            let len = parsed.feed.entries.length;
            let item = parsed.feed.entries; 
            //console.log(item);
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
                            category : updateCategory(item[i]),
                            archived : false,
                            published : false
                        });
    
                            if(entry.category != "discard") {
                                entry.save(function(e){
                                    if(e) throw e;
                                    //console.log("feed added..........");
                                    console.log("category is : " + entry.category);
                                });
                            }     
                    }
                });
                }
            
            //console.log("done............");
        });
        resolve();
        
    })
    

    return parsePromise;
}

module.exports = addAutoFeeds;