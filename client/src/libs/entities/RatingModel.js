var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['RatingModel'] = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "idActivity",
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
      "name": "rate",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "vrate",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idActivity": null,
    "idUser": null,
    "rate": 3,
    "vrate": 3
  }
};