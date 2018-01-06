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
      "generated": false,
      "validation": [
        {
          "type": "isInt"
        }
      ]
    },
    {
      "name": "groupStudies",
      "type": "varchar",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "length",
          "constraints": [
            1,
            5
          ]
        }
      ]
    },
    {
      "name": "groupLetter",
      "type": "varchar",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "length",
          "constraints": [
            1,
            255
          ]
        }
      ]
    },
    {
      "name": "groupYear",
      "type": "int",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "min",
          "constraints": [
            0
          ]
        },
        {
          "type": "conditionalValidation",
          "constraints": [
            null
          ]
        }
      ]
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
      "generated": false,
      "validation": [
        {
          "type": "JsonStringValidator"
        },
        {
          "type": "conditionalValidation",
          "constraints": [
            null
          ]
        }
      ]
    },
    {
      "name": "thmcss",
      "type": "longtext",
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
    "thmcss": null
  }
};