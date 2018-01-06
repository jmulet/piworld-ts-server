var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['LoginsModel'] = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "idUser",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "parents",
      "type": "tinyint",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "max",
          "constraints": [
            1
          ]
        },
        {
          "type": "min",
          "constraints": [
            0
          ]
        },
        {
          "type": "isInt"
        }
      ]
    },
    {
      "name": "ip",
      "type": "varchar",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "isIp",
          "constraints": [
            null
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
      "name": "login",
      "type": "datetime",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "isDate"
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
      "name": "logout",
      "type": "datetime",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "isDate"
        },
        {
          "type": "conditionalValidation",
          "constraints": [
            null
          ]
        }
      ]
    }
  ],
  "defaultObject": {
    "id": null,
    "idUser": null,
    "parents": 0,
    "ip": null,
    "login": null,
    "logout": null
  }
};