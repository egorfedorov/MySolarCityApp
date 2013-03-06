(function () {

    user = $.cookie('username');
    pass = $.cookie('password');

    if (user && user.length < 1) {
        window.location.href = "index.html";
    }

    //checking if device is online or offline
    var isOnline = false;
    function checkOnlineStatus() {
        isOnline = window.navigator.onLine;
    };
    //lets get the initial status;
    checkOnlineStatus();

    window.addEventListener("offline", function (e) {
        isOnline = false;
    }, false);

    window.addEventListener("online", function (e) {
        isOnline = true;
    }, false);

    function getWidth() {
        if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            return document.documentElement.clientWidth;
        }
        else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
            return document.body.clientWidth;
        }
        // Browser isn't returning its width, pick a reasonable value.
        return 800;
    }

    function getHeight() {
        if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            return document.documentElement.clientHeight - 100;
        }
        else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
            return document.body.clientHeight - 100;
        }

        // Browser isn't returning its height, pick a reasonable value.
        return 300;
    }

    var initializeDaySlider = function () {
        for (var i = 0; i < 60; i++) {
            var d = (i).days().ago();
            var ds = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
            $('#daySlider ul').prepend("<li style='display:none'><div>" + d.toString('ddd, MMM dd, yyyy') + "<div><img src='img/loading.gif' data-rangeType='Day' data-srcloaded='false' data-chartdate='" + ds + "'></li>");
        }
    };

    var initializeWeekSlider = function () {
        var weekStartingDate = Date.today().moveToDayOfWeek(0);
        for (var i = 0; i < 52; i++) {
            var w = weekStartingDate.moveToDayOfWeek(0, -1).addWeeks(i * -1);
            var ws = w.getMonth() + 1 + "/" + w.getDate() + "/" + w.getFullYear();
            $('#weekSlider ul').prepend("<li style='display:none'><div>Week of " + w.toString('MMM dd, yyyy') + "<div><img src='img/loading.gif' data-rangeType='Week' data-srcloaded='false' data-chartdate='" + ws + "'></li>");
        }
    };

    var initializeMonthSlider = function () {
        var monthStartingDate = Date.today().set({ day: 1, hour: 1, minute: 0 });
        for (var i = 0; i < 13; i++) {
            var m = monthStartingDate.addMonths(i * -1);
            var ms = m.getMonth() + 1 + "/" + m.getDate() + "/" + m.getFullYear();
            $('#monthSlider ul').prepend("<li style='display:none'><div>" + m.toString('MMM yyyy') + "<div><img src='img/loading.gif' data-rangeType='Month' data-srcloaded='false' data-chartdate='" + ms + "'></li>");
        }
    };

    var initializeYearSlider = function () {
        var yearStartingDate = Date.today().set({ month: 0, day: 1, hour: 1, minute: 0 });
        for (var i = 0; i < 2; i++) {
            var y = yearStartingDate.addYears(i * -1);
            var ys = y.getMonth() + 1 + "/" + y.getDate() + "/" + y.getFullYear();
            $('#yearSlider ul').prepend("<li style='display:none'><div>" + y.toString('yyyy') + "<div><img src='img/loading.gif' data-rangeType='Year' data-srcloaded='false' data-chartdate='" + ys + "'></li>");
        }
    };

    var initialize = function () {
        initializeDaySlider();
        initializeWeekSlider();
        initializeMonthSlider();
        initializeYearSlider();
    };


    var loadCurrentDay = function (loadDayCallback) {
        var cc = $('#daySlider ul li:nth-child(60) img').attr('data-chartdate');

        amplify.request({
            resourceId: 'ajaxGetPVChart',
            data: { email: user, password: pass, rangeType: "Day", chartDate: cc, chartWidth: getWidth(), chartHeight: getHeight(), isMobile: true },
            success: function (data, status) {
                $('#daySlider ul li:nth-child(60) img').attr('src', 'data:image/png;base64,' + data.imageData);
            },
            error: function (data, status) {
                alert('Error fetching chart.  Try again later.');
            }
        });
        //we're loading the dayslider as soon as it's populated.
        if (loadDayCallback != null) { loadDayCallback(); }
    };

    var loadCurrentWeek = function () {
        var ww = $('#weekSlider ul li:nth-child(52) img').attr('data-chartdate');
        amplify.request({
            resourceId: 'ajaxGetPVChart',
            data: { email: user, password: pass, rangeType: "Week", chartDate: ww, chartWidth: getWidth(), chartHeight: getHeight(), isMobile: true },
            success: function (data, status) {
                $('#weekSlider ul li:nth-child(52) img').attr('src', 'data:image/png;base64,' + data.imageData);
            },
            error: function (data, status) {
                alert('Error fetching chart.  Try again later.');
            }
        });
    };

    var loadCurrentMonth = function () {
        var mm = $('#monthSlider ul li:nth-child(13) img').attr('data-chartdate');
        amplify.request({
            resourceId: 'ajaxGetPVChart',
            data: { email: user, password: pass, rangeType: "Month", chartDate: mm, chartWidth: getWidth(), chartHeight: getHeight(), isMobile: true },
            success: function (data, status) {
                $('#monthSlider ul li:nth-child(13) img').attr('src', 'data:image/png;base64,' + data.imageData);
            },
            error: function (data, status) {
                alert('Error fetching chart.  Try again later.');
            }
        });
    };

    var loadCurrentYear = function () {
        var yy = $('#yearSlider ul li:nth-child(2) img').attr('data-chartdate');
        amplify.request({
            resourceId: 'ajaxGetPVChart',
            data: { email: user, password: pass, rangeType: "Year", chartDate: yy, chartWidth: getWidth(), chartHeight: getHeight(), isMobile: true },
            success: function (data, status) {
                $('#yearSlider ul li:nth-child(2) img').attr('src', 'data:image/png;base64,' + data.imageData);
            },
            error: function (data, status) {
                alert('Error fetching chart.  Try again later.');
            }
        });
    };


    initialize();
    if (isOnline) {
        loadCurrentDay(function () {
            $('#daySlider').show();
        });
        loadCurrentWeek();
        loadCurrentMonth();
        loadCurrentYear();
    }
    setTimeout(function () {
        if (isOnline) {

            //triggers every 15 minutes

            //if next day then we recreate the day slider
            var lastDate = Date.parse($('#daySlider ul li:nth-child(60) img').attr('data-chartdate'));
            if (Date.compare(lastDate.clearTime(), Date.today().clearTime()) == 1) {
                //its the next day, so we need to reload the slider
                initializeSlider();
            }
            //if next week then we recreate the week slider
            if (Date.compare(lastDate.addWeeks(1).clearTime(), Date.today().clearTime()) >= 0) {
                //its the next week, so we need to reload the slider
                initializeWeekSlider();
            }

            //if next month then we recreate the month slider
            if (Date.compare(lastDate.addMonths(1).clearTime(), Date.today().clearTime()) >= 0) {
                //its the next month, so we need to reload the slider
                initializeMonthSlider();
            }

            //if next year then we recreate the year slider
            if (Date.compare(lastDate.addYear(1).clearTime(), Date.today().clearTime()) >= 0) {
                //its the next month, so we need to reload the slider
                initializeYearSlider();
            }

            //reload the current charts
            loadCurrentDay(function () { });
            loadCurrentWeek();
            loadCurrentMonth();
            loadCurrentYear();

        }

    }, (15 * 60 * 1000));

    var currentRangeType = "Day";
    var swipeSliders = new Swipe(document.getElementById('sliders'), { callback: function (e, e1, e2) {
        var cdate = $(e2).find('img').attr('data-chartdate');
        var srcloaded = $(e2).find('img').attr('data-srcloaded');
        if (srcloaded == 'false') {
            var rType = $(e2).find('img').attr('data-rangeType');
            var myRequest1 = amplify.request({
                resourceId: 'ajaxGetPVChart',
                data: { email: user, password: pass, rangeType: rType, chartDate: cdate, chartWidth: getWidth(), chartHeight: getHeight(), isMobile: true },
                success: function (data, status) {
                    $(e2).find('img').attr('src', 'data:image/png;base64,' + data.imageData);
                    $(e2).find('img').attr('srcloaded', 'true');

                },
                error: function (data, status) {
                    alert('Error fetching chart.  Try again later.');
                }

            });
        }
    }
        , callbackGetData: function (e, e1, e2) {
            var switchRangeType = $(e2).find('img').attr('data-rangeType');
            if (switchRangeType != currentRangeType) {
                currentRangeType = switchRangeType;
                $('div .btn-group a.disabled').removeClass('disabled');
                $('#link' + switchRangeType).addClass('disabled');
            }
        }
    });
    $('div .btn-group a').click(function (event) {
        //alert(event.target.id);
        var a = $('#' + event.target.id);
        var index = $('div .btn-group a').index(a);
        $('div .btn-group a').removeClass('disabled');
        a.addClass('disabled');
        swipeSliders.switchSlider(index);
    });

})();