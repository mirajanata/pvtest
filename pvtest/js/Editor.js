var Editor = {

    /* call on page startup - editor functionality initialize */
    initialize: function () {
        let urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('uri')) {
            Editor.uri = decodeURI(urlParams.get('uri').replace(/["';><]/gi, '')); //avoid injection

            // testing
            Editor.start();
        }
    },

    /* call on edit button click - check the login and switch to edit mode on success */
    start: function () {
        // add edit icons to topics
        let topicRows = $("table#details tr");
        topicRows.each(function (index) {
            r = $(this);
            var attribute = $("td:nth-child(1)", r);
            var content = $("td:nth-child(2) li", r);
            content = content;
        });
    },

    /* call on finish edit button click - switch to normal mode */
    stop: function () {

    },

    /* call on attribute edit button click - open edit panel */
    editAttribute: function (attribute) {

    },

    /* call on attribute save button click - POST to ticket database */
    saveAttribute: function (attribute) {

    }


};

$(document).ready(function () {
    Editor.initialize();
});
