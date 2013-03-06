/// <reference path="vendor/require.js" />

(function () {
    requirejs.config(
        {
            baseUrl: 'js',
            paths: {
                'jquery': 'vendor/jquery-1.9.0.min',
                'jcookie': 'vendor/jquery.cookie',
                'bootstrap': 'vendor/bootstrap.min',
                'knockout': 'vendor/knockout-2.2.1',
                'amplify': 'vendor/amplify.min'
            }
        }
    );

})();
