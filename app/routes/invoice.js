var Invoice = require('../model/invoice');
var Counter = require('../model/counter');

module.exports = function(app){
    app.get('/api/invoices',function(req,res){

        query = {};

        if(req.query.date){
            var start = new Date(req.query.date);
            start.setHours(0,0,0,0);

            var end = new Date(req.query.date);
            end.setHours(23,59,59,999);
            query = {"date" : {$gte: start, $lt: end}};
        }
        
        Invoice.find(query,function(err,invoices){
            if(err) res.send(err);
            res.json(invoices);
        })
    })
    app.post('/api/invoices',function(req,res){
        Counter.findByIdAndUpdate({_id:'productid'},{$inc:{sequence_value:1}},function(err,count){

            var newInvoice = new Invoice();
            newInvoice.id = count.sequence_value;

            Invoice.findOneAndUpdate(
                {_id: newInvoice._id},
                newInvoice,
                {upsert:true,new:true},
                function(err,newInvoice){
                    if(err) res.send(err);
                    res.json(newInvoice)
                }
            )
        })
    })
    app.get('/api/invoices/:id',function(req,res){
        Invoice
            .findOne({_id : req.params.id})
            .populate('items._item',"name")
            .exec(function(err,invoice){
                if(err) res.send(err);
                res.json(invoice);
            })
    })
    app.put('/api/invoices/:id',function(req,res){
        Invoice.update({_id: req.body._id},req.body,function(err,values){
            if(err)res.send(err);
            res.json(values)
        })
    })
}