"use strict";
module.exports = function(app, superUserModel) {
    app.get("/api/project/superUser", getSuperUser);
    app.put("/api/project/superUser", updateSuperUser);

    function getSuperUser(req, res) {
        superUserModel
            .getSuperUser()
            .then(function(user) {
                res.json(user);
            });
    }

    function updateSuperUser(req, res) {
        superUserModel
            .updateSuperUser(req.body)
            .then(function(user) {
                res.json(user);
            });
    }
};
