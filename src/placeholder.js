/**
 * @license AngularJS PlaceHolder v0.1
 * (c) 2010-2012 Ferron Hanse. http://ferronrsmith.githib.io
 * License: MIT
 */

/*jslint unparam : true */
/*global app, $*/
/***
 * The following functionality is a custom-based poly-fill placeholder for AngularJS
 * @example  <input id="weight" name="weight" type="number" default-text="lbs" min="50" max="500" required />
 * For browsers lower than IE 10 the in-built placeholder functionality is used, otherwise
 * the poly-fill is used
 */
app.directive('placeholder', function ($timeout) {
    "use strict";
    if (!$.browser.msie || $.browser.version >= 10) {
        return {};
    }
    return {
        link: function (scope, elm, attrs) {
            if (attrs.type === 'password') {
                return;
            }
            $timeout(function () {
                $(elm).val(attrs.placeholder).focus(function () {
                    if ($(this).val() === $(this).attr('placeholder')) {
                        $(this).val('');
                    }
                }).blur(function () {
                    if ($(this).val() === '') {
                        $(this).val($(this).attr('placeholder'));
                    }
                });
            });
        }
    };
});
