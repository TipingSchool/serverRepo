

const ArraySchema = require('../models/schemas/ArraySchema');
//const ArraySchema = require('../models/schemas/ArraySchema');


let catPromise = new Promise(function(resolve, reject) {
    let cat = [];
    ArraySchema.find({"category" : RegExp('.*?')}).select('category -_id').exec(function(err,items) {
        items.forEach(element => {
            cat.push(element.category);
           // console.log(cat);
        });
        //console.log(cat);
        resolve(cat);
    })
});

let urlPromise = new Promise(function(resolve, reject) {
    let url = [];
    ArraySchema.find({"url" : RegExp('.*?')}).select('url -_id').exec(function(err,items) {
        items.forEach(element => {
            url.push(element.url);
        });
        //console.log("Asd" + url);
        resolve(url); 
    })
});


module.exports = {
    catPromise,
    urlPromise
}