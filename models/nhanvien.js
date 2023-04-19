var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NVienSchema = new Schema({
    manv :{
        type : String,
        required: true
    },
    tennv :{
        type : String,
        required: true
    },
    namsinhnv :{
        type : String,
        required: true
    },
    anhnv :{
        type : String,
        required: true
    }
});

module.exports = mongoose.model('NhanVien',NVienSchema);