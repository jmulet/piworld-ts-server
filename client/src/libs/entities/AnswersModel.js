var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['AnswersModel'] = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "idQuestion",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "answer",
      "type": "text",
      "nullable": false,
      "generated": false
    },
    {
      "name": "isCorrect",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "seconds",
      "type": "int",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idQuestion": null,
    "answer": null,
    "isCorrect": null,
    "seconds": null
  }
};