"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $routeParams, FieldService, FormService) {
        $scope.form = null;
        $scope.fields = null;
        $scope.types = [
            {
                id: 0,
                value:"TEXT",
                label: "Single Line Text Field",
                name: "New Text Field"
            },
            {
                id: 1,
                value:"TEXTAREA",
                label: "Multi Line Text Field",
                name: "New Text Field"},
            {
                id: 2,
                value:"DATE",
                label: "Date Field",
                name: "New Date Field"
            },
            {
                id: 3,
                value:"SELECT",
                label: "Dropdown Field",
                name:"New Dropdown"
            },
            {
                id: 4,
                value:"CHECKBOX",
                label: "Checkboxes Field",
                name:"New Checkboxes"
            },
            {
                id: 5,
                value:"RADIO",
                label: "Radio Buttons Field",
                name:"New Radio Buttons"
            }
        ];
        $scope.newField = $scope.types[0];
        $scope.addField = addField;
        $scope.removeField= removeField;
        $scope.fieldType = fieldType;


        function init() {
            $scope.userId = $routeParams["userId"];
            $scope.formId = $routeParams["formId"];
            FormService
                .findFormById($scope.formId)
                .then(function(form) {
                    console.log(form);
                    $scope.form = form;
                    $scope.fields = form.fields;
                });
        }
        init();

        function addField(type) {
            var field = {id: null, label: type.name, type: type.value};
            if (type.id == 0 || type.id == 1) {
                field.placeholder = "New Field";
            }
            else if (type.id == 3) {
                field.options = [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ];
            }
            else if (type.id == 4) {
                field.options = [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ];
            }
            else if (type.id == 5) {
                field.options = [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ];
            }

            FieldService
                .createFieldForForm($scope.formId, field)
                .then(function (newfields) {
                    $scope.fields = newfields;
                });
        }

        function removeField(field) {
            console.log("REMOVE FIELD ID: "+ field.id);
            FieldService
                .deleteFieldFromForm($scope.formId, field.id)
                .then(function(newfields) {
                    $scope.fields = newfields;
                });
        }

        function fieldType(type) {
            for (var i = 0; i < $scope.types.length; ++i) {
                if (type == $scope.types[i].value) {
                    return $scope.types[i].id;
                }
            }
            return $scope.types[0].id;
        }


    }
})();
