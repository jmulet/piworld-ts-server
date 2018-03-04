module.exports = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "idCourse",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "unit",
      "type": "longtext",
      "nullable": false,
      "generated": false
    },
    {
      "name": "order",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "visible",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idCourse": 0,
    "unit": null,
    "order": 0,
    "visible": 2
  }
};