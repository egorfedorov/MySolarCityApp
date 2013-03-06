/// <reference path="vendor/require.js" />
/// <reference path="vendor/amplify.min.js" /

(function () {
    $(document).ready(function () {
        //prevents safari from opening a new window when site is bookmarked.
        var a = document.getElementsByTagName("a");
        for (var i = 0; i < a.length; i++) {
            a[i].onclick = function () {
                window.location = this.getAttribute("href");
                return false
            }
        }
        $('.alert').hide();
        $('#inputEmail').focus(function () {
            $('.alert').hide();
        });
        setTimeout(function () { window.scrollTo(0, 1) }, 100);
        var emailInCookie = $.cookie('username');
        if (emailInCookie) {
            $('#inputEmail').val(emailInCookie);
        }
        $('#loginButton').click(function () {
            var e = $('#inputEmail').val();
            var p = $('#inputPassword').val();
            var myRequest = amplify.request({
                resourceId: 'ajaxLogin',
                data: { "email": e, "password": p },
                success: function (data, status) {
                    if (data == true) {
                        $('#dismissAlert').trigger('click');
                        if ($('#rememberMeCheckbox').prop('checked')) {
                            $.cookie('username', e, { expires: 365, path: '/' });
                        }
                        window.location.href = "chart.htm";
                    } else {
                        $('.alert').show();
                    }
                },
                error: function (data, status) {

                }

            });
        });
    });
})();
