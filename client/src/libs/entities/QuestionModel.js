var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['QuestionModel'] = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "idAttempt",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "question",
      "type": "longtext",
      "nullable": false,
      "generated": false
    },
    {
      "name": "rightAnswer",
      "type": "longtext",
      "nullable": false,
      "generated": false
    },
    {
      "name": "seconds",
      "type": "int",
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
      "name": "category",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "level",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "askTheory",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "askHelp",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "askAnswer",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idAttempt": null,
    "question": null,
    "rightAnswer": null,
    "seconds": 0,
    "score": 0,
    "category": "g",
    "level": 0,
    "askTheory": 0,
    "askHelp": 0,
    "askAnswer": 0
  }
};