const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Devops_schema = new Schema({
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

var Devops_model = mongoose.model("devops", Devops_schema);

module.exports = Devops_model;