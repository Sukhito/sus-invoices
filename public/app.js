var app = angular.module('suus',['ui.router','ui.bootstrap','ui.sortable']);

app.config(function($stateProvider,$urlRouterProvider,$locationProvider){
    $urlRouterProvider.otherwise('/');
    
    $stateProvider

        .state('invoices',{
            url: '/invoices',
            templateUrl: 'js/invoices/index.html',
            controller:'InvoicesCtrl'
        })
        .state('invoices.detail',{
            url: '/:invoiceId',
            templateUrl : 'js/invoices/invoice/index.html',
            controller: 'InvoiceCtrl'
        })
        .state('invoices-edit',{
            url: '/invoices/:invoiceId/edit',
            templateUrl : 'js/invoices/invoice-edit/index.html',
            controller: 'InvoiceEditCtrl'
        })
    
    $locationProvider.hashPrefix('');
});