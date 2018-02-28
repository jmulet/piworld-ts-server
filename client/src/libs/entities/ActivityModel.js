var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['ActivityModel'] = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "levels",
      "type": "json",
      "nullable": false,
      "generated": false
    },
    {
      "name": "idSubject",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "activity",
      "type": "json",
      "nullable": false,
      "generated": false
    },
    {
      "name": "activityType",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "share",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "createdBy",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "createdWhen",
      "type": "datetime",
      "nullable": false,
      "generated": false
    },
    {
      "name": "description",
      "type": "json",
      "nullable": false,
      "generated": false
    },
    {
      "name": "difficulty",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "icon",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "ytid",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "ytqu",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "ggbid",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "hasAct",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "createjs",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "counter",
      "type": "int",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "levels": null,
    "idSubject": 1,
    "activity": null,
    "activityType": "V",
    "share": 2,
    "createdBy": null,
    "createdWhen": null,
    "description": null,
    "difficulty": null,
    "icon": null,
    "ytid": null,
    "ytqu": 0,
    "ggbid": null,
    "hasAct": 0,
    "createjs": null,
    "counter": 0
  }
};