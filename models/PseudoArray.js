const ArraySchema = require('../models/schemas/ArraySchema');
//const ArraySchema = require('../models/schemas/ArraySchema');
var url = [];
var cat = [];

function fillUrl() {
    ArraySchema.find({"category" : RegExp('.*?')}).select('category -_id').exec(function(err,items) {
        items.forEach(element => {
            cat.push(element.category);
           // console.log(cat);
        });
    });

    console.log(url);
}

function fillCat(item)  {
    ArraySchema.find({"url" : RegExp('.*?')}).select('url -_id').exec(function(err,items) {
        items.forEach(element => {
            url.push(element.url);
            //console.log(element.url);
        });

    });
}

module.exports = {
    fillCat,
    fillUrl,
    url,
    cat
}