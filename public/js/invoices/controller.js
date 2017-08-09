app.controller('InvoicesCtrl',function(InvoiceService,$scope,$state){

	//construct
	$scope.getInvoices = function(){
    	InvoiceService.getInvoices({date:$scope.date}).then(function(response){
    		$scope.invoices = response.data;
    	})
    }
    
    $scope.newInvoice = function(){
        InvoiceService.createInvoice().then(function(response){
            $state.go('invoices-edit',{invoiceId:response.data._id})
        })
    }

    //init
    $scope.date = new Date();
    $scope.getInvoices();


})