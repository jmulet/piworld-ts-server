var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['TermsModel'] = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "idSchool",
      "type": "int",
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
      "name": "term",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "fromDate",
      "type": "date",
      "nullable": false,
      "generated": false
    },
    {
      "name": "toDate",
      "type": "date",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idSchool": null,
    "year": null,
    "term": null,
    "fromDate": null,
    "toDate": null
  }
};