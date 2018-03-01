var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['CourseModel'] = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "year",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "name",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "description",
      "type": "longtext",
      "nullable": false,
      "generated": false
    },
    {
      "name": "courseLevel",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "courseStudies",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "idSubject",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "idUserCreator",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "currentUnit",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "enrollPassword",
      "type": "varchar",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "year": null,
    "name": null,
    "description": null,
    "courseLevel": 1,
    "courseStudies": "BAT",
    "idSubject": "1",
    "idUserCreator": "0",
    "currentUnit": "0",
    "enrollPassword": null
  }
};