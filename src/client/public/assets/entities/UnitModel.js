var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['UnitModel'] = {
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
      "name": "unit",
      "type": "longtext",
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
      "name": "visible",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idGroup": 0,
    "unit": null,
    "order": 0,
    "visible": 2
  }
};