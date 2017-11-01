const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Archived_Schema = new Schema({
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

var Archived_model = mongoose.model("archive", Archived_Schema);

module.exports = Archived_model;