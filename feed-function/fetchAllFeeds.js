const addAutoFeeds = require('./addAutoFeeds');
const ArraySchema = require('../models/schemas/ArraySchema');
const async = require('async');

let urlArray = [];

function fetchAllFeeds() {
            //console.log("array is " + urlArray);
            const urlPromise = require('../models/PseudoArray').urlPromise.then((urlArray) => {

                urlArray.forEach(function(element) {
                    //console.log("asd");
                    addAutoFeeds(element).catch(() => console.log('Couldnt Parse : ' + element ));
                }, this);

                
            });

            
}

module.exports = fetchAllFeeds;
