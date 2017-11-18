const mongoose = require("mongoose");
const textSearch = require('mongoose-text-search');
const Schema = mongoose.Schema;

var ArraySchema = new Schema({
    url : { type : String} ,
    category : {type : String }
});

var ArraySchemaModel = mongoose.model("array",ArraySchema);

module.exports = ArraySchemaModel;