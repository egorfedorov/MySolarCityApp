(function () {

    for (var i = 0; i < 60; i++) {
        var d = (i).days().ago();
        var ds = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
        $('#daySlider ul').prepend("<li style='display:none'><div>" + d.toString('ddd, MMM dd, yyyy') + "<div><img src='img/loading.gif' data-rangeType='Day' data-srcloaded='false' data-chartdate='" + ds + "'></li>");
    }
    var cc = $('#daySlider ul li:nth-child(60) img').attr('data-chartdate');
    amplify.request({
        resourceId: 'ajaxGetPVChart',
        data: { email: 'cecpdx@hevanet.com', password: 'asdf', rangeType: "Day", chartDate: cc, chartWidth: 340, chartHeight: 220 },
        success: function (data, status) {
            $('#daySlider ul li:nth-child(60) img').attr('src', 'data:image/png;base64,' + data.imageData);
        },
        error: function (data, status) {
            alert(data);
        }
    });
    $('#daySlider').show();

    var weekStartingDate = Date.today().moveToDayOfWeek(0);
    for (var i = 0; i < 52; i++) {
        var w = weekStartingDate.moveToDayOfWeek(0, -1).addWeeks(i * -1);
        var ws = w.getMonth() + 1 + "/" + w.getDate() + "/" + w.getFullYear();
        $('#weekSlider ul').prepend("<li style='display:none'><div>Week of " + w.toString('MMM dd, yyyy') + "<div><img src='img/loading.gif' data-rangeType='Week' data-srcloaded='false' data-chartdate='" + ws + "'></li>");
    }
    var ww = $('#weekSlider ul li:nth-child(52) img').attr('data-chartdate');
    amplify.request({
        resourceId: 'ajaxGetPVChart',
        data: { email: 'cecpdx@hevanet.com', password: 'asdf', rangeType: "Week", chartDate: ww, chartWidth: 340, chartHeight: 220 },
        success: function (data, status) {
            $('#weekSlider ul li:nth-child(52) img').attr('src', 'data:image/png;base64,' + data.imageData);
        },
        error: function (data, status) {
            alert(data);
        }
    });

    var monthStartingDate = Date.today().set({ day: 1, hour: 1, minute: 0 });
    for (var i = 0; i < 13; i++) {
        var m = monthStartingDate.addMonths(i * -1);
        var ms = m.getMonth() + 1 + "/" + m.getDate() + "/" + m.getFullYear();
        $('#monthSlider ul').prepend("<li style='display:none'><div>" + m.toString('MMM yyyy') + "<div><img src='img/loading.gif' data-rangeType='Month' data-srcloaded='false' data-chartdate='" + ms + "'></li>");
    }
    var mm = $('#monthSlider ul li:nth-child(13) img').attr('data-chartdate');
    amplify.request({
        resourceId: 'ajaxGetPVChart',
        data: { email: 'cecpdx@hevanet.com', password: 'asdf', rangeType: "Month", chartDate: mm, chartWidth: 340, chartHeight: 220 },
        success: function (data, status) {
            $('#monthSlider ul li:nth-child(13) img').attr('src', 'data:image/png;base64,' + data.imageData);
        },
        error: function (data, status) {
            alert(data);
        }
    });

    var yearStartingDate = Date.today().set({ month: 0, day: 1, hour: 1, minute: 0 });
    for (var i = 0; i < 2; i++) {
        var y = yearStartingDate.addYears(i * -1);
        var ys = y.getMonth() + 1 + "/" + y.getDate() + "/" + y.getFullYear();
        $('#yearSlider ul').prepend("<li style='display:none'><div>" + y.toString('yyyy') + "<div><img src='img/loading.gif' data-rangeType='Year' data-srcloaded='false' data-chartdate='" + ys + "'></li>");
    }
    var yy = $('#yearSlider ul li:nth-child(2) img').attr('data-chartdate');
    amplify.request({
        resourceId: 'ajaxGetPVChart',
        data: { email: 'cecpdx@hevanet.com', password: 'asdf', rangeType: "Year", chartDate: yy, chartWidth: 340, chartHeight: 220 },
        success: function (data, status) {
            $('#yearSlider ul li:nth-child(2) img').attr('src', 'data:image/png;base64,' + data.imageData);
        },
        error: function (data, status) {
            alert(data);
        }
    });

    var currentRangeType = "Day";
    var swipeSliders = new Swipe(document.getElementById('sliders'), { callback: function (e, e1, e2) {
        var cdate = $(e2).find('img').attr('data-chartdate');
        var srcloaded = $(e2).find('img').attr('data-srcloaded');
        if (srcloaded == 'false') {
            var rType = $(e2).find('img').attr('data-rangeType');
            var myRequest1 = amplify.request({
                resourceId: 'ajaxGetPVChart',
                data: { email: 'cecpdx@hevanet.com', password: 'asdf', rangeType: rType, chartDate: cdate, chartWidth: 340, chartHeight: 220 },
                success: function (data, status) {
                    $(e2).find('img').attr('src', 'data:image/png;base64,' + data.imageData);
                    $(e2).find('img').attr('srcloaded', 'true');

                },
                error: function (data, status) {
                }

            });
        }
    }
        , callbackGetData: function (e, e1, e2) {
            var switchRangeType = $(e2).find('img').attr('data-rangeType');
            if (switchRangeType != currentRangeType) {
                currentRangeType = switchRangeType;
                $('div .btn-group a').removeClass('disabled');
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