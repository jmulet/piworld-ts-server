var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['GroupsModel'] = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "name",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "year",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "idCourse",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "gopts",
      "type": "json",
      "nullable": false,
      "generated": false
    },
    {
      "name": "thmcss",
      "type": "longtext",
      "nullable": false,
      "generated": false
    },
    {
      "name": "_creator",
      "type": "int",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "name": null,
    "year": null,
    "idCourse": "0",
    "gopts": null,
    "thmcss": null,
    "_creator": null
  }
};