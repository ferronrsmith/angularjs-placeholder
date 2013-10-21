/*global module */
module.exports = function (config) {
    "use strict";
    config.set({
        basePath: '../',
        frameworks: ['jasmine'],
        files: [
            'vendor/angularjs/angular.js',
            'vendor/angularjs/angular-mocks.js',
            'vendor/angularjs/browserTrigger.js',
            'vendor/jquery/jquery-1.9.1.js',
            'vendor/jquery/jquery.browser.js',
            'app/*.js',
            'test/*.js',
            'src/defaultText.js',
            'src/placeholder.js'
        ],
        autoWatch: true,
        browsers: ['Chrome'],
        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },
        reporters: ['progress', 'coverage'],
        coverageReporter : {
            type : 'lcov',
            dir : 'coverage/'
        },
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'src/*.js': ['coverage']
        }
    });
};
