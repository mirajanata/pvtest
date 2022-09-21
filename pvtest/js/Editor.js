var Editor = {

    /* call on page startup - editor functionality initialize */
    initialize: function () {
        let urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('uri')) {
            Editor.uri = decodeURI(urlParams.get('uri').replace(/["';><]/gi, '')); //avoid injection

            $("div.container").append(
                `
<div id="editorModal" class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="editorModalTitle" aria-hidden="true">
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
            <textarea class="form-control" name="newValue" id="newValue" rows="10"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
<div id="loginModal" class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="loginModalTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="loginModalTitle">Please login to ticket database</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="userName" class="col-form-label">Username:</label>
            <input type="text" class="form-control" name="userName" id="userName" />
          </div>
          <div class="form-group">
            <label for="userName" class="col-form-label">Password:</label>
            <input type="password" class="form-control" name="password" id="password" />
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="Editor.handleLogin();">Login</button>
      </div>
    </div>
  </div>
</div>
`
            );

            Editor.startLink = `<i class="fas fa-pen"></i>&nbsp;Edit`;
            Editor.stopLink = `<i class="fas fa-check"></i>&nbsp;Done edits`;

            $("#editorLink").html(Editor.startLink);
        }
    },

    /* call on edit button click - check the login and switch to edit mode on success */
    start: function () {
        if (!Editor.started) {
            if (!Editor.loggedIn) {
                Editor.savedEditData = null;
                Editor.login();
                return;
            }
            Editor.started = 1;
            $("#editorLink").html(Editor.stopLink);
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
                    c.html(orig_h + "&nbsp;<a class='editorLink' href='javascript: Editor.editAttribute(\"" + attr + "\"," + (count > 1 ? index : null) + ", \"" + val + "\", \"" + lang + "\");'><i class=\"fa fa-edit\"></i></a> ");
                });
            });
        }
        else {
            $("a.editorLink").remove();
            Editor.started = 0;
            $("#editorLink").html(Editor.startLink);
        }
    },

    login: function () {
        Editor.loggedIn = 0;
        $('#loginModal').modal('toggle');
    },

    handleLogin: function () {
        // call API and on success do:
        $('#loginModal').modal('hide');
        Editor.loggedIn = 1;
        if (Editor.savedEditData) {
            // restore after login - if saved before
            let p = Editor.savedEditData;
            Editor.editAttribute(p[0], p[1], p[2], p[3]);
        } else if (!Editor.started) {
            Editor.start();
        }
    },

    /* call on attribute edit button click - open edit panel */
    editAttribute: function (attribute, index, value, lang) {
        if (!Editor.loggedIn) {
            Editor.savedEditData = [attribute, index, value, lang];
            Editor.login();
            return;
        }
        else
            Editor.savedEditData = null;

        let form = $('#editorModal');
        form.modal('toggle');
        let attr = attribute;
        if (index != null)
            attr += " [" + index + "]";
        $('#editorModalTitle', form).text("Modify attribute value: " + Editor.uri + "/" + attr);
        $('#newValue', form).text(value);
    },

    /* call on attribute save button click - POST to ticket database */
    saveAttribute: function (attribute) {

    }


};

$(document).ready(function () {
    Editor.initialize();
});
