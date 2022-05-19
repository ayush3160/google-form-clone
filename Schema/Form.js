const mongoose = require('mongoose')

const formSchema = new mongoose.Schema({
    
    formtitle : {
        type : String,
        required : true
    },
    formdescription : {
        type : String,
        required : true
    },
    question : {
        type : Array,
        required : true
    },
    response : {
        type : Array,
        required : true
    },
    authorid : {
        type : String,
        required : true
    }
})

const Form = new mongoose.model("Form",formSchema);

module.exports = Form