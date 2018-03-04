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
      "name": "idActivity",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "day",
      "type": "datetime",
      "nullable": false,
      "generated": false
    },
    {
      "name": "comment",
      "type": "longtext",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idUser": null,
    "idActivity": null,
    "day": null,
    "comment": null
  }
};