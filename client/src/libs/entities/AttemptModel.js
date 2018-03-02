var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['AttemptModel'] = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "idSectionAssign",
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
      "name": "attemptStart",
      "type": "datetime",
      "nullable": false,
      "generated": false
    },
    {
      "name": "attemptEnd",
      "type": "datetime",
      "nullable": false,
      "generated": false
    },
    {
      "name": "done",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "score",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "level",
      "type": "int",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idSectionAssign": null,
    "idUser": null,
    "attemptStart": null,
    "attemptEnd": null,
    "done": null,
    "score": 0,
    "level": 0
  }
};