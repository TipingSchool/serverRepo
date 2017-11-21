const addAutoFeeds = require('./addAutoFeeds');
const ArraySchema = require('../models/schemas/ArraySchema');
const async = require('async');
const urlArray = require('../models/PseudoArray').url;

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
