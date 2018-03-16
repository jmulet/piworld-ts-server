module.exports = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "levels",
      "type": "json",
      "nullable": false,
      "generated": false
    },
    {
      "name": "idSubject",
      "type": "int",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "isNotEmpty"
        }
      ]
    },
    {
      "name": "activity",
      "type": "json",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "isNotEmpty"
        }
      ]
    },
    {
      "name": "activityType",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "share",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "createdBy",
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
      "name": "createdWhen",
      "type": "datetime",
      "nullable": false,
      "generated": false
    },
    {
      "name": "description",
      "type": "json",
      "nullable": false,
      "generated": false
    },
    {
      "name": "difficulty",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "icon",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "params",
      "type": "json",
      "nullable": false,
      "generated": false
    },
    {
      "name": "counter",
      "type": "int",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "levels": null,
    "idSubject": 1,
    "activity": null,
    "activityType": "V",
    "share": 2,
    "createdBy": null,
    "createdWhen": null,
    "description": null,
    "difficulty": null,
    "icon": null,
    "params": null,
    "counter": 0
  }
};