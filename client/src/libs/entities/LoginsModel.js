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
      "name": "parents",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "ip",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "login",
      "type": "datetime",
      "nullable": false,
      "generated": false
    },
    {
      "name": "logout",
      "type": "datetime",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idUser": null,
    "parents": 0,
    "ip": null,
    "login": null,
    "logout": null
  }
};