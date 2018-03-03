var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['SubjectCategoryModel'] = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "idSubject",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "name",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "longname",
      "type": "longtext",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idSubject": null,
    "name": null,
    "longname": null
  }
};