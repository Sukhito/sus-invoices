app.controller('InvoiceEditCtrl',function($scope,InvoiceService,$stateParams, $timeout,$uibModal,$state){

    //init
    InvoiceService.getInvoice($stateParams.invoiceId).then(function(response){
        $scope.invoice = response.data;
        $scope.invoice.date = new Date(response.data.date);
        $scope.updateCarousel();
    });

    InvoiceService.getItems().then(function(response){
        $scope.items = response.data;
    })

    //construct
    $scope.saveInvoice = function(){
        InvoiceService.updateInvoice($stateParams.invoiceId,$scope.invoice).then(function(response){
            if(response.data.ok === 1){
                $scope.saveSuccess=true;
            }

            $timeout(function(){
                $scope.saveSuccess = false;
            },2500)
        })
    }

    $scope.home = function(){
        InvoiceService.updateInvoice($stateParams.invoiceId,$scope.invoice).then(function(response){
            if(response.data.ok === 1){
                $scope.saveSuccess=true;
                $state.go('invoices.detail',{invoiceId:$scope.invoice._id})
            }
        })
    }

    $scope.onSelectItem = function(item, model, label){
        $scope.selectedItem = item;
        $scope.inputString+="=";
    }

    function round500(x){
        return Math.ceil(x/500)*500;
    }

    $scope.isValid = function(inputString){
        if (inputString) {

            //construct newItem object
            var newItem = {
                _item : null,
                qty : 0,
                unit : "",
                name: "",
                price : 0,
                lineTotal :  null
            }

            $scope.search = newItem.name;
            //separate the item name and ordered quantity
            var inputArray = inputString.split("=");

            //assign item name to newItem.name
            newItem.name = inputArray[0];

            //separate ordered quantity to its unit and nominal
            if(inputArray[1]){
                newItem.unit = inputArray[1].replace(/\d|\./g,'');  //get the unit string 
                newItem.qty = Number(inputArray[1].replace(newItem.unit,'')); //get the qty number

                newItem.unit = newItem.unit.replace(/\s+/g, ''); //to delete the space character
            }

            //if item exist in db, please use its price
            if($scope.selectedItem){
                newItem._item = $scope.selectedItem;

                for(var i = 0; i < $scope.selectedItem.prices.length;i++){

                    //if unit can be found assign its price and lineTotal
                    if($scope.selectedItem.prices[i].unit === newItem.unit){
                        newItem.price = $scope.selectedItem.prices[i].nominal;
                        newItem.lineTotal = round500(newItem.price * newItem.qty);
                        newItem.price = newItem.lineTotal/newItem.qty;

                        //break from the loop
                        break;
                    }else{

                        //if by the end of the loop unit can be found newItem cannot be returned
                        if(i + 1 == $scope.selectedItem.prices.length) newItem = null;   
                    }
                }

                return newItem;
            }
            else{
                if(newItem.qty != 0 && typeof newItem.qty === 'number' && typeof newItem.unit === 'string' ){

                }else{
                    newItem = null;
                }

                return newItem;
            }


        }else{
            $scope.selectedItem = null;
        }

    }

    $scope.submit = function(keyEvent) {
        if (keyEvent.which === 13){
            if($scope.isValid($scope.inputString)){
                $scope.invoice.items.push($scope.isValid($scope.inputString));
                $scope.inputString = "";
                $scope.selectedItem = null;
                $scope.updateCarousel();
            }else{
                console.log("error!");
            }
        }
    }

    $scope.searchCatalog = function(input){
        $scope.searchInput = input.split("=")[0];
    }

    $scope.deleteItem = function(parentIndex,index){
        $scope.invoice.items.splice(parentIndex * 20 + index, 1);
        $scope.updateCarousel();
    }

    $scope.$watch('invoice.items', function() {
        if($scope.invoice){
            $scope.invoice.total = 0;
            for(var i = 0; i < $scope.invoice.items.length;i++){
                $scope.invoice.total = $scope.invoice.total + $scope.invoice.items[i].lineTotal;
            }
        }
    },true);

    $scope.updateCarousel = function(){
        var array = [];
        if($scope.invoice){
            
            var numberOfItemPerCarousel = 20;
            var slidesNumber = $scope.invoice.items.length /numberOfItemPerCarousel;
            for(var i = 0; i < slidesNumber; i++){
                array.push($scope.invoice.items.slice( i * numberOfItemPerCarousel, (i + 1)*numberOfItemPerCarousel));
            }
            
            $scope.carouselObjects = array;
        }

    }
});
