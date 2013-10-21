/*jslint browser : true, evil :true, nomen : true */
/*global describe, expect, it, beforeEach, afterEach, jasmine, angular, module, inject, console, $, browserTrigger */

describe('Placeholder Testing - Modern Browsers', function () {
    "use strict";

    var rootScope, elem;

    beforeEach(module('app'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function ($compile, $rootScope) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        rootScope = $rootScope;

        // Compile a piece of HTML containing the directive
        elem = $compile('<input id="weight" name="weight" type="number" placeholder="lbs" min="50" max="500" required />')(rootScope);

    }));

    it('Expect that the element is defined', function () {
        rootScope.$digest();
        expect(elem).toBeDefined();
    });

    it('Expect that placeholder is set to the default text value', function () {
        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
        rootScope.$digest();
        elem.val('50');
        expect(elem.val()).toBe('50');
    });

    it('Expect min to be 50 and max to be 500', function () {
        rootScope.$digest();
        expect(elem.attr('min')).toBe('50');
        expect(elem.attr('max')).toBe('500');
    });

    it("Expect placeholder attribute to be 'lbs'", function () {
        rootScope.$digest();
        $(elem).focus();
        expect(elem.attr('placeholder')).toBeDefined();
        expect(elem.attr('placeholder')).toBe('lbs');
    });
});

describe('Placeholder Testing - IE Test', function () {
    "use strict";

    var rootScope, elem, timeout, $dBrower;

    beforeEach(function () {
        // change browser to IE
        $dBrower = {};
        $.extend($dBrower, $.browser);
        $.browser = {
            webkit: false,
            version: 9,
            safari: false,
            msie: true
        };

    });

    beforeEach(module('app'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function ($compile, $rootScope, $timeout) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        rootScope = $rootScope;
        timeout = $timeout;

        // html5 numeric field does not allow characters so a modified had to be made to allow testing with phamtomjs
        var elm = angular.element('<input id="weight" name="weight" type="number" placeholder="1111" min="50" max="500" required />');
        // Compile a piece of HTML containing the directive
        elem = $compile(elm)(rootScope);
    }));

    afterEach(function () {
        $.browser = $dBrower;
    });

    it('Expect that the element is defined', function () {
        rootScope.$digest();
        expect(elem).toBeDefined();
    });

    it('Expect that placeholder is set to the default text value', function () {
        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
        rootScope.$digest();
        elem.val('50');
        expect(elem.val()).toBe('50');
    });

    it('Expect min to be 50 and max to be 500', function () {
        rootScope.$digest();
        expect(elem.attr('min')).toBe('50');
        expect(elem.attr('max')).toBe('500');
    });

    it("Expect placeholder attribute to be '1111'", function () {
        rootScope.$digest();
        timeout.flush();
        // http://stackoverflow.com/questions/17211466/how-can-i-simulate-a-click-event-in-my-angularjs-directive-test
        // https://github.com/angular/angular.js/blob/master/src/ngScenario/browserTrigger.js
        browserTrigger(elem, 'focus');
        expect(elem.val()).toBe('');

        browserTrigger(elem, 'blur');
        expect(elem.val()).toBe('1111');
    });
});

describe('Placeholder Testing - IE Test', function () {
    "use strict";

    var rootScope, elem, $dBrower;

    beforeEach(function () {
        // change browser to IE
        $dBrower = {};
        $.extend($dBrower, $.browser);
        $.browser = {
            webkit: false,
            version: 9,
            safari: false,
            msie: true
        };

    });

    beforeEach(module('app'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function ($compile, $rootScope) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        rootScope = $rootScope;
        // html5 numeric field does not allow characters so a modified had to be made to allow testing with phamtomjs
        var elm = angular.element('<input id="password" name="password" type="password" placeholder="1111" min="50" max="500" required />');
        // Compile a piece of HTML containing the directive
        elem = $compile(elm)(rootScope);
    }));

    afterEach(function () {
        $.browser = $dBrower;
    });

    it("Expect placeholder attribute to be '1111'", function () {
        rootScope.$digest();
        // http://stackoverflow.com/questions/17211466/how-can-i-simulate-a-click-event-in-my-angularjs-directive-test
        // https://github.com/angular/angular.js/blob/master/src/ngScenario/browserTrigger.js
        browserTrigger(elem, 'focus');
        expect(elem.val()).toBe('');

        browserTrigger(elem, 'blur');
        // value should not change even if blurred
        expect(elem.val()).toBe('');
    });
});