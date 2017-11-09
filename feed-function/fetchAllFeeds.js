const addAutoFeeds = require('./addAutoFeeds');
const urlArray = require('../models/urlArray');




function fetchAllFeeds() {
    urlArray.forEach(function(element) {
        addAutoFeeds(element);
    }, this);
}

module.exports = fetchAllFeeds;


