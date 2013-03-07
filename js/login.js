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
			if (isOnline) {
	            var myRequest = amplify.request({
	                resourceId: 'ajaxLogin',
	                data: { "email": e, "password": p },
	                success: function (data, status) {
	                    if (data == true) {
	                        $('#dismissAlert').trigger('click');
	                        if ($('#rememberMeCheckbox').prop('checked')) {
	                            $.cookie('username', e, { expires: 365, path: '/' });
								//this should be stored somewhere else and encrypted
	                            $.cookie('password', p, { expires: 365, path: '/' });
	                        }
	                        window.location.href = "chart.htm";
	                    } else {
	                        $('.alert').show();
	                    }
	                },
	                error: function (data, status) {
						alert('There was a problem connecting to the server');
	                }
	            });
			} else {
				//let's load from somewhere, for now let's get it from the cookie and compare
				var ucookie = $.cookie('username');
				var pcookie = $.cookie('password');
				if (ucookie && pcookie && e == ucookie && p == pcookie){
					window.location.href = "chart.htm";
				}
			}
        });
    });
})();
