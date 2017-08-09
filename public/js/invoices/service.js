app.factory('InvoiceService',['$http',function($http){
    return{
        getInvoices: function(query){
            return $http.get('api/invoices',{params: query})
        },
        getInvoice : function(id){
            return $http.get('api/invoices/' + id);
        },
        createInvoice : function(){
            return $http.post('api/invoices')
        },
        
        updateInvoice :function(id,invoice){
            return $http.put('api/invoices/' + id,invoice);
        },
        deleteInvoice:function(id,invoice){
            invoice.status = "delete";
            return $http.put('api/invoices/' + id,invoice);
        },
        getItems: function(){
            return $http.get('api/items');
        }
    }
}]);