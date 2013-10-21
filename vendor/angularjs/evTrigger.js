/*jslint browser:true */
/*global document */
/**
 * @author ferron on 10/21/13.
 * Adapted from http://stackoverflow.com/questions/17211466/how-can-i-simulate-a-click-event-in-my-angularjs-directive-test
 * a simple trigger mechanism to allow testing of events to work inside phamtomjs
 */

function evTrigger(element, event) {
    "use strict";
    if (element && !element.nodeName) {
        element = element[0];
    }
    var ev = document.createEvent("MouseEvent");
    ev.initMouseEvent(
        event,
        true, /* bubble */
        true, /* cancelable */
        window,
        null,
        0,
        0,
        0,
        0, /* coordinates */
        false,
        false,
        false,
        false, /* modifier keys */
        0, /*left*/
        null
    );
    element.dispatchEvent(ev);
}