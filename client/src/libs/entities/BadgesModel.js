var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['BadgesModel'] = {
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
      "name": "idCourse",
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
    }
  ],
  "defaultObject": {
    "id": null,
    "idUser": null,
    "idCreator": null,
    "idCourse": null,
    "type": null,
    "day": null,
    "rscore": 0
  }
};