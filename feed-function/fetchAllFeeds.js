const addAutoFeeds = require('./addAutoFeeds');
const urlArray = require('../models/urlArray');




function fetchAllFeeds() {
    urlArray.forEach(function(element) {
        if(!(addAutoFeeds(element))){
            console.log("error in url" + element);
        }
    }, this);
}

module.exports = fetchAllFeeds;