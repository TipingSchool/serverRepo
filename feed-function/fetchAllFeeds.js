const addAutoFeeds = require('./addAutoFeeds');
const ArraySchema = require('../models/schemas/ArraySchema');
const async = require('async');
const urlArray = require('../models/PseudoArray').url;

function fetchAllFeeds() {
            console.log(urlArray);
            urlArray.forEach(function(element) {
                console.log("asd");
                addAutoFeeds(element);
            }, this);
}

module.exports = fetchAllFeeds;
