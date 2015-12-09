"use strict";
module.exports = function(app, mongoose) {
    var documentModel = require("./models/document.model.js")(app, mongoose);
    var tagModel = require("./models/tag.model.js")(app, mongoose);
    var commentModel = require("./models/comment.model.js")(app, mongoose);
    var userModel = require("./models/user.model.js")(app, mongoose);
    require("./services/document.service.js")(app, documentModel);
    require("./services/comment.service.js")(app, commentModel, documentModel);
    require("./services/tag.service.js")(app, tagModel, documentModel);
    require("./services/user.service.js")(app, userModel);
};
