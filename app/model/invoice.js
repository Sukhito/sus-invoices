var mongoose = require('mongoose');

module.exports = mongoose.model('Invoice',{
    id: {type:Number,default:0},
    customer: {type:String, default:""},
    date    : {type:Date, default:Date.now},
    items   : [{
        _item : {type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
        name        :   {type:String},
        qty         :   {type:Number},
        unit        :   {type:String},
        price       :   {type:Number},
        lineTotal   :   {type:Number}
    }],
    total   : {type:Number, default:0}
});