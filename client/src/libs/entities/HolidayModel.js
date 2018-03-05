module.exports = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "idSchool",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "year",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "fromDate",
      "type": "datetime",
      "nullable": false,
      "generated": false
    },
    {
      "name": "toDate",
      "type": "datetime",
      "nullable": false,
      "generated": false
    },
    {
      "name": "description",
      "type": "longtext",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idSchool": null,
    "year": 2017,
    "fromDate": null,
    "toDate": null,
    "description": null
  }
};