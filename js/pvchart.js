/// <reference path="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"/>
/// <reference path="vendor/require.js" />
/// <reference path="vendor/knockout-2.2.1.js" />
/// <reference path="vendor/amplify.min.js" /
/// <reference path="vendor/jquery.touchwipe.min.js" />

(function () {
    var viewModel = function () {
        self = this;
        self.currentDayTracker = ko.observable();
        self.currentDaySlideIndex = ko.observable();
    };
    var vm = new viewModel();
    ko.applyBindings(vm);

    var e = $.cookie("username");
    var p = "asfasd";

    vm.currentDayTracker(Date.today());
    vm.currentDaySlideIndex($('#dayGraphImageSlider ul').children().length - 1);


    $('#barousel_itemnav').barousel({
        manualCarousel: 1
    });

//    $("#dayGraphImageSlider").touchwipe({
//        wipeLeft: function () {
//            alert("left");

//        },
//        wipeRight: function () {
//            alert("right");
//        },
//        wipeUp: function () { alert("up"); },
//        wipeDown: function () { alert("down"); },
//        min_move_x: 20,
//        min_move_y: 20,
//        preventDefaultEvents: true
//    });

//    var myRequest1 = amplify.request({
//        resourceId: 'ajaxGetPVChart',
//        data: { email: e, password: p, rangeType: "Day", chartDate: vm.currentDayTracker(), chartWidth: 400, chartHeight: 400 },
//        success: function (data, status) {
//            var c = vm.currentDaySlideIndex()+1;
//           // $('#dayGraphImageSlider ul li:nth-child(' + c + ') img').attr('src', 'data:image/png;base64,' + data);
//            //alert(vm.currentDaySlideIndex() + 1);


//        },
//        error: function (data, status) {

//        }

//    });



//    setTimeout(function () {
//        //look for the next element graph

//    }, 3000);





})();