var Editor = {

    /* call on page startup - editor functionality initialize */
    initialize: function () {
        let urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('uri')) {
            Editor.uri = decodeURI(urlParams.get('uri').replace(/["';><]/gi, '')); //avoid injection

            $("div.container").append(
                `
<div id="editorModal" class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document" style="max-width:1024px;">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editorModalTitle">Editor</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="newValue" class="col-form-label">New value:</label>
            <textarea type="text" class="form-control" name="newValue" id="newValue" rows="10"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`
            );

            // testing
            setTimeout(Editor.start, 1000);
        }
    },

    /* call on edit button click - check the login and switch to edit mode on success */
    start: function () {
        // add edit icons to topics
        let topicRows = $("table#details tr");
        topicRows.each(function (index) {
            let r = $(this);
            var attribute = $("td:nth-child(1)", r);
            var content = $("td:nth-child(2) li", r);
            let count = content.length;
            content.each(function (index) {
                let c = $(this);
                let lang = $("span.lang", c).text();
                let h = c.html();
                let orig_h = h;
                let ix = h.indexOf("<span class=\"lang\"");
                if (ix > 0)
                    h = h.substring(0, ix);
                let attr = attribute.text().trim();
                let val = h.replaceAll("\"", "\\\"").replaceAll("\'", "\\\'");
                c.html(orig_h + "<a href='javascript: Editor.editAttribute(\"" + attr + "\"," + (count > 1 ? index : null) + ", \"" + val + "\", \"" + lang + "\");'>Edit " + attribute.text() + (count > 1 ? "[" + index + "]" : "") + "</a > ");
            });
        });
    },

    /* call on finish edit button click - switch to normal mode */
    stop: function () {

    },

    /* call on attribute edit button click - open edit panel */
    editAttribute: function (attribute, index, value, lang) {
        //alert(attribute + "[" + index + "]" + ": " + value + " (" + lang + ")");
        let form = $('#editorModal');
        form.modal('toggle');
        let attr = attribute;
        if (index != null)
            attr += "[" + index + "]";
        $('#editorModalTitle', form).text("Edit " + attr);
        $('#newValue', form).text(value);
    },

    /* call on attribute save button click - POST to ticket database */
    saveAttribute: function (attribute) {

    }


};

$(document).ready(function () {
    Editor.initialize();
});
