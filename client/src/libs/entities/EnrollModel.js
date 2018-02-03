var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['EnrollModel'] = {
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
      "name": "idRole",
      "type": "int",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idGroup": null,
    "idUser": null,
    "idRole": 200
  }
};