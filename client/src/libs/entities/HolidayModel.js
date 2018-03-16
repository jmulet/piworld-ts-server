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
      "generated": false,
      "validation": [
        {
          "type": "isInt"
        }
      ]
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