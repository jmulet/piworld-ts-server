module.exports = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "idCreator",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "idGroup",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "trimestre",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "day",
      "type": "date",
      "nullable": false,
      "generated": false
    },
    {
      "name": "weight",
      "type": "float",
      "nullable": false,
      "generated": false
    },
    {
      "name": "category",
      "type": "longtext",
      "nullable": false,
      "generated": false
    },
    {
      "name": "formula",
      "type": "longtext",
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
    "idCreator": null,
    "idGroup": null,
    "trimestre": 1,
    "day": null,
    "weight": null,
    "category": null,
    "formula": null,
    "visible": 1
  }
};