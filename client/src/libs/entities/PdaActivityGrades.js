var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['PdaActivityGrades'] = {
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
      "name": "grade",
      "type": "float",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idActivity": null,
    "idUser": null,
    "grade": -10
  }
};