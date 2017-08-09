app.controller('InvoiceCtrl',function($scope,InvoiceService,$stateParams,$http,$state){
    InvoiceService.getInvoice($stateParams.invoiceId).then(function(response){
        $scope.invoice = response.data;
    })

    $scope.printInvoice = function(){
        $http.post('api/printer',$scope.invoice)
    }

});