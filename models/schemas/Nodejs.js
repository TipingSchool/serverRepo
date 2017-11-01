const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Nodejs_schema = new Schema({
    title : {type : String, required : true },
    description : {type : String, required : true},
    date : {type : Date},
    link : {type : String, required : true},
    creator : {type : String, required : true},
    media_url : {type : String, required : true},
    category : {type : String, required : true},
    archived : {type : Boolean, required : true},
    published : {type : Boolean, required : true}
});


var Nodejs_model = mongoose.model("nodes", Nodejs_schema, "nodejs");

module.exports = Nodejs_model;