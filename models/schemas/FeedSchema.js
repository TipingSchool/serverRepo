const mongoose = require("mongoose");
const textSearch = require('mongoose-text-search');
const Schema = mongoose.Schema;

var feedSchema = new Schema({
    title : {type : String, required : true },
    description : {type : String, required : true},
    date : {type : Date, required : true},
    link : {type : String, required : true},
    creator : {type : String, required : true},
    category : {type : String, required : true, lowercase : true},
    archived : {type : Boolean, required : true},
    published : {type : Boolean, required : true}
});

feedSchema.plugin(textSearch);
feedSchema.index({'$**': 'text'});

var feedSchemaModel = mongoose.model("feed",feedSchema);

module.exports = feedSchemaModel;