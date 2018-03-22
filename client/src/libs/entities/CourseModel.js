module.exports = {
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
      "generated": false,
      "validation": [
        {
          "type": "isNotEmpty"
        }
      ]
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
      "generated": false,
      "validation": [
        {
          "type": "isInt"
        }
      ]
    },
    {
      "name": "courseStudies",
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
    "year": 2017,
    "name": null,
    "description": null,
    "courseLevel": 1,
    "courseStudies": "BAT",
    "idSubject": "1",
    "idUserCreator": "0",
    "currentUnit": "0",
    "enrollPassword": null,
    "sdr": null,
    "sdd": null
  }
};