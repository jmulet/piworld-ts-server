module.exports = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "name",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "idCourse",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "gopts",
      "type": "json",
      "nullable": false,
      "generated": false,
      "validation": [
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
    },
    {
      "name": "idUserCreator",
      "type": "int",
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
    "name": null,
    "idCourse": "0",
    "gopts": null,
    "thmcss": null,
    "idUserCreator": null,
    "sdr": null,
    "sdd": null
  }
};