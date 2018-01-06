var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['SchoolModel'] = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "schoolName",
      "type": "varchar",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "isNotEmpty"
        }
      ]
    },
    {
      "name": "professorName",
      "type": "varchar",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "isNotEmpty"
        }
      ]
    },
    {
      "name": "professorEmail",
      "type": "varchar",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "isEmail",
          "constraints": [
            null
          ]
        }
      ]
    },
    {
      "name": "language",
      "type": "varchar",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "LangValidator"
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
      "name": "enrollPassword",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "canEnroll",
      "type": "tinyint",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "IntRangeValidator",
          "constraints": [
            0,
            1
          ]
        }
      ]
    },
    {
      "name": "canPublish",
      "type": "tinyint",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "IntRangeValidator",
          "constraints": [
            0,
            1
          ]
        }
      ]
    }
  ],
  "defaultObject": {
    "id": null,
    "schoolName": null,
    "professorName": null,
    "professorEmail": null,
    "language": "en",
    "enrollPassword": null,
    "canEnroll": 0,
    "canPublish": 1
  }
};