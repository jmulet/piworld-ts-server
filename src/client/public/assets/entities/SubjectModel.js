var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['SubjectModel'] = {
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
      "name": "longname",
      "type": "varchar",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "name": "",
    "longname": null
  }
};