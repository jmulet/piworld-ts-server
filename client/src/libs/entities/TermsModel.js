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
      "generated": false,
      "validation": [
        {
          "type": "isInt"
        }
      ]
    },
    {
      "name": "year",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "term",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "fromDate",
      "type": "date",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "isDate"
        }
      ]
    },
    {
      "name": "toDate",
      "type": "date",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "HolidayValidator"
        },
        {
          "type": "isDate"
        }
      ]
    }
  ],
  "defaultObject": {
    "id": null,
    "idSchool": null,
    "year": null,
    "term": null,
    "fromDate": null,
    "toDate": null
  }
};