var printer = require("node-thermal-printer");
printer.init({
    type: 'epson',
    interface: '/dev/usb/lp0',
    ip: "192.168.1.100",
    port: '9100'
});


module.exports = function(app){    
	app.post('/api/printer',function(req,res){
        var toPrint = "";

        var date = new Date(req.body.date).toDateString();

        toPrint += date;
        for(var space = 0; space < 40 - date.length; space++){
            toPrint += " ";
        }



        for(var i = 0; i < req.body.items.length; i++){
            var qty = req.body.items[i].qty.toString();
            var unit = req.body.items[i].unit.toString();
            var name = req.body.items[i].name;
            var lineTotal = req.body.items[i].lineTotal.toString();

            toPrint += qty;

            for(var space = 0; space < 4 - qty.length;space++){
                toPrint += " ";
            }

            toPrint += unit + " ";

            toPrint += name;

            for(var space = 0; space < 32 - (name.length + lineTotal.length); space++){
                toPrint += " ";
            }

            toPrint += lineTotal;

        }

        var total = "Total " + req.body.total.toString();

        for(var space = 0; space < 40 - total.length; space++){
            toPrint += " ";
        }

        toPrint += total;

        printer.println(toPrint);
        printer.println(" ");
        printer.println(" ");
        printer.println(" ");
        printer.println(" ");
        printer.println(" ");
        printer.println(" ");

        printer.execute();
        printer.clear();

        res.json({ok : 1})
    })
}