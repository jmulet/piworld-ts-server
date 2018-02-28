var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['AssignmentModel'] = {
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
      "name": "idUnit",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "postDate",
      "type": "datetime",
      "nullable": false,
      "generated": false
    },
    {
      "name": "order",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "fromDate",
      "type": "datetime",
      "nullable": false,
      "generated": false
    },
    {
      "name": "toDate",
      "type": "datetime",
      "nullable": false,
      "generated": false
    },
    {
      "name": "maxAttempts",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "instructions",
      "type": "longtext",
      "nullable": false,
      "generated": false
    },
    {
      "name": "applyToAll",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "params",
      "type": "json",
      "nullable": false,
      "generated": false
    },
    {
      "name": "visible",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idUser": null,
    "idUnit": null,
    "postDate": null,
    "order": 0,
    "fromDate": null,
    "toDate": null,
    "maxAttempts": 0,
    "instructions": null,
    "applyToAll": 0,
    "params": null,
    "visible": 1
  }
};