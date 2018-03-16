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
      "name": "idUser",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "day",
      "type": "datetime",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "isDate"
        }
      ]
    },
    {
      "name": "msg",
      "type": "longtext",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "isNotEmpty"
        }
      ]
    },
    {
      "name": "isFor",
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
    "idCourse": null,
    "idUser": null,
    "day": null,
    "msg": null,
    "isFor": null,
    "parents": null
  }
};