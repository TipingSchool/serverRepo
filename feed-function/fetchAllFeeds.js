const addAutoFeeds = require('./addAutoFeeds');
const ArraySchema = require('../models/schemas/ArraySchema');
let urlArray = [];
ArraySchema.find({"category" : RegExp('.*?')}).select('url -_id').exec(function(err,items) {
    items.forEach(element => {
        urlArray.push(element.category);
    });
});


function fetchAllFeeds() {
    urlArray.forEach(function(element) {
        addAutoFeeds(element, function(err,status) {
            if(err) {
                console.log("error in url :" + element );
            }
        });
    }, this);
}

module.exports = fetchAllFeeds;
