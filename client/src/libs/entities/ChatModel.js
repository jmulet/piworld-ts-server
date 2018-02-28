var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['ChatModel'] = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "idGroup",
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
      "generated": false
    },
    {
      "name": "msg",
      "type": "longtext",
      "nullable": false,
      "generated": false
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
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idGroup": null,
    "idUser": null,
    "day": null,
    "msg": null,
    "isFor": null,
    "parents": null
  }
};