var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['HolidayModel'] = {
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
    },
    {
      "name": "description",
      "type": "longtext",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idSchool": null,
    "fromDate": null,
    "toDate": null,
    "description": null
  }
};