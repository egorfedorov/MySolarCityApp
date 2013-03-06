/// <reference path="vendor/amplify.min.js" /

    amplify.request.decoders.appEnvelope =
    function (data, status, xhr, success, error) {
        if (data.status === "success") {
            success(data.data);
        } else if (data.status === "fail" || data.status === "error") {
            error(data.message, data.status);
        } else {
            error(data.message, "fatal");
        }
    };

    amplify.request.define('ajaxLogin', 'ajax', {
        url: 'http://faguinaldo-ld/webapi/Preview/Api/V1/Authenticate?email={email}&password={password}',
        dataType: 'json',
        type: 'POST'
    });

    amplify.request.define('ajaxGetPVChart', 'ajax', {
        url: 'http://faguinaldo-ld/webapi/Preview/Api/V1/PVGraph?email={email}&password={password}&rangeType={rangeType}&chartDate={chartDate}&chartWidth={chartWidth}&chartHeight={chartHeight}&isMobile={isMobile}',
        dataType: 'json',
        type: 'GET',
        cache: false
    });
        