var mongoose = require('mongoose');

module.exports = mongoose.model('Counter',{
    _id: {type:String},
    sequence_value: {type:Number}
});