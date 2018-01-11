var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['GroupsModel'] = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "groupName",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "groupLevel",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "groupStudies",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "groupLetter",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "groupYear",
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
      "name": "enrollPassword",
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
      "name": "currentUnit",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "gopts",
      "type": "longtext",
      "nullable": false,
      "generated": false
    },
    {
      "name": "thmcss",
      "type": "longtext",
      "nullable": false,
      "generated": false
    },
    {
      "name": "subject",
      "type": "int",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "groupName": null,
    "groupLevel": 1,
    "groupStudies": "BAT",
    "groupLetter": "A",
    "groupYear": null,
    "idUserCreator": "0",
    "enrollPassword": null,
    "idSubject": "1",
    "currentUnit": "0",
    "gopts": null,
    "thmcss": null,
    "subject": null
  }
};