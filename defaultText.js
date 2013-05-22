/***
 * The following functionality is a custom-based poly-fill placeholder for AngularJS
 * @example <input id="weight" name="weight" type="number" default-text="lbs" min="50" max="500" required />
 * For browsers lower than IE 10 the in-built placeholder functionality is used, otherwise
 * the poly-fill is used
 */
app.directive('defaultText', function($timeout){
    if (!$.browser.msie || $.browser.version >= 10) {
        return {
            link: function(scope, elm, attrs){
                $timeout(function(){
                    $(elm).attr('placeholder', attrs.defaultText);
                });
            }
        };
    }
    return {
        link: function(scope, elm, attrs){
            if (attrs.type === 'password') {
                return;
            }
            $timeout(function(){
                $(elm).val(attrs.defaultText).focus(function(){
                    if ($(this).val() == $(this).attr('defaultText')) {
                        $(this).val('');
                    }
                }).blur(function(){
                    if ($(this).val() == '') {
                        $(this).val($(this).attr('defaultText'));
                    }
                });
            });
        }
    };
});
