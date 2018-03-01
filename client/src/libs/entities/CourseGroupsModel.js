var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['CourseGroupsModel'] = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "idCourse",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "idGroup",
      "type": "int",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idCourse": null,
    "idGroup": null
  }
};