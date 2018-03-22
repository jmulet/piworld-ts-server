module.exports = {
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
    },
    {
      "name": "sopts",
      "type": "json",
      "nullable": false,
      "generated": false
    },
    {
      "name": "sdr",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "sdd",
      "type": "datetime",
      "nullable": false,
      "generated": false
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
    "canPublish": 1,
    "sopts": null,
    "sdr": null,
    "sdd": null
  }
};