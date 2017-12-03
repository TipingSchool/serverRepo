const catPromise = require('../models/PseudoArray').catPromise.then(function(cat) {
    catArray = cat;
});
let catArray;

module.exports =  function updateCategory (item) {
    let finalCat = "";
    let len , titleLength, linkLength;

    finalCat = "";
    //console.log("ASdasd  ansh");
    
    catArray.forEach(function(element) {
        //length = item.title.toLowerCase().match(new RegExp(element,"g")).length + item.link.toLowerCase().match(new RegExp(element,"g")).length; 
        titleLength = item.title.toLowerCase().match(new RegExp(element,"g")) == null ? 0 : item.title.toLowerCase().match(new RegExp(element,"g")).length ;
        linkLength = item.link.toLowerCase().match(new RegExp(element,"g")) == null ? 0 : item.link.toLowerCase().match(new RegExp(element,"g")).length;
        contentLength = item.contentSnippet.toLowerCase().match(new RegExp(element,"g")) == null ? 0 : item.contentSnippet.toLowerCase().match(new RegExp(element,"g")).length;
        //console.log(titleLength + "  and  " + linkLength);
        len = titleLength + linkLength;
        if(len >= 1 && finalCat.match(new RegExp(element, "g")) == null) {
            if(finalCat == 0 ) finalCat = finalCat + element;
            else finalCat = finalCat +',' + element;
        }
    }, this);

    
    //console.log("final cat is" + finalCat);
    if(finalCat == "") return "discard";

    //console.log("final cat is " + finalCat);
    //console.log("cateafalsjdkasd is " + finalCat);
    return finalCat;

}