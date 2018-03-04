module.exports = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "idUser",
      "type": "int",
      "nullable": false,
      "generated": false
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
      "name": "type",
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
      "name": "rscore",
      "type": "int",
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
    "idUser": null,
    "idCreator": null,
    "idGroup": null,
    "type": null,
    "day": null,
    "rscore": 0,
    "description": null
  }
};