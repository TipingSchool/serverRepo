
const ArraySchema = require('../models/schemas/ArraySchema'); 
const urlArray = require('../models/urlArray');
const catArray = require('../models/catArray');

function Init () {
    //For Hard Coded Category and URL 
   // console.log(urlArray);
    urlArray.forEach(element => {
        ArraySchema.find({"url" : element}, function(error,items) {
            //console.log(items);
            if(items.length == 0) {
                    let entry = new ArraySchema ({
                    url : element
                });

                entry.save(function(e){
                    if(e) throw e;
                    console.log("New url Added..." + element)
                });
            }
        });
    });

    //console.log(catArray);

    catArray.forEach(element => {
        ArraySchema.find({"category" : element}, function(error,items) {
            if(items.length == 0) {
                     entry = new ArraySchema ({
                    category : element
                });

                entry.save(function(e){
                    if(e) throw e;
                    console.log("New Category Added..." + element)
                });

            }

            
        });
    });
}

function addNewUrl (url) {
        ArraySchema.find({"url" : url}, function(error,items) {
            if(items.length == 0) {
                     entry = new ArraySchema ({
                    url : url
                });

                entry.save(function(e){
                    if(e) throw e;
                    console.log("new url added" + url);
                });
            }
            
        });
}

function addNewCat (cat) {
        let flag = false;
         ArraySchema.find({"category" : cat}, function(error,items) {
            if(items.length == 0) {
                flag = true;
                     entry = new ArraySchema ({
                    category : cat
                });

                entry.save(function(e){
                    if(e) throw e;
                    console.log("new category added" + cat);
                });
                
            }

            
            
            
        });
        console.log("flag is " + flag)
        return flag;
}

module.exports = {
    addNewCat : addNewCat,
    addNewUrl : addNewUrl,
    Init : Init
}