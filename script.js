 var app = angular.module("app", []);

 app.controller("listController", ["$scope", '$timeout',
     function($scope, $timeout) {

         $scope.employees = [{ pageIndex: "div1", pageHeader: "This should be shown in page1" },
             { pageIndex: "div2", pageHeader: "This should be shown in page2" }
         ];


         $scope.export = function() {
             var pdf = new jsPDF('p', 'pt', 'A4');
             var pdfName = 'test.pdf';
             var vDom = $('#pdf-content').html($('#content-div').html());
             //console.log(vDom);
             var elementHandler = {
                 '#skipExport': function(element, renderer) {
                     return true;
                 }
             }
             var options = {
                 'elementHandlers': elementHandler
             };
             function formatHtml() {                
                 var imagesToResize = document.getElementById('pdf-content').getElementsByTagName("img");
                 for (i = 0; i < imagesToResize.length; i++) {
                     (function(i) {
                         imagesToResize[i].style.width = "100px";
                         imagesToResize[i].style.height = "100px";
                     })(i);
                 }
                 return new Promise(function(resolve, reject) {
                     resolve('success');
                     reject('err');
                 })
             }
             formatHtml().then(function(res) {
                 $("#pdf-content").find(".myDivClass").each(function(index) {
                     pdf.fromHTML($(this).html(),15, 20, options, function(){
                        pdf.addPage();
                     })
                 })
                 $timeout(function() {
                     pdf.save(pdfName);
                 }, 3000);

             })

         }
     }




 ]);