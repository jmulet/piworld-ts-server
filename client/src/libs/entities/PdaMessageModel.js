var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['PdaMessageModel'] = {
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
    }
  ],
  "defaultObject": {
    "id": null,
    "idCourse": null,
    "idUser": null,
    "day": null,
    "msg": null,
    "isFor": null
  }
};