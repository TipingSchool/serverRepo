const feedSchemaModel = require("../models/schemas/FeedSchema");

let catArray = ['nodejs','react','devops','mongodb','html', 'engineering', 'crypto', 'design', 'product'];
let finalCat = "";
let len , titleLength, linkLength;

module.exports =  function updateCategory (item) {

    finalCat = "";
    
    catArray.forEach(function(element) {
        //length = item.title.toLowerCase().match(new RegExp(element,"g")).length + item.link.toLowerCase().match(new RegExp(element,"g")).length; 
        titleLength = item.title.toLowerCase().match(new RegExp(element,"g")) == null ? 0 : item.title.toLowerCase().match(new RegExp(element,"g")).length ;
        linkLength = item.link.toLowerCase().match(new RegExp(element,"g")) == null ? 0 : item.link.toLowerCase().match(new RegExp(element,"g")).length;
        contentLength = item.contentSnippet.toLowerCase().match(new RegExp(element,"g")) == null ? 0 : item.contentSnippet.toLowerCase().match(new RegExp(element,"g")).length;
        //console.log(titleLength + "  and  " + linkLength);
        len = titleLength + linkLength;
        if(len >= 2 && finalCat.match(new RegExp(element, "g")) == null) {
            if(finalCat == 0 ) finalCat = finalCat + element;
            else finalCat = finalCat +',' + element;
        }

        if ( len == 1 ) {
            finalCat = "uncategorized"
        }
    }, this);

    if(finalCat == "") return "discard";

    console.log("final cat is " + finalCat);

    return finalCat;

}