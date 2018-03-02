var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['ChallengesModel'] = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "day",
      "type": "date",
      "nullable": false,
      "generated": false
    },
    {
      "name": "level",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "formulation",
      "type": "longtext",
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
      "name": "ranswer",
      "type": "longtext",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "day": null,
    "level": null,
    "formulation": null,
    "score": 0,
    "ranswer": null
  }
};