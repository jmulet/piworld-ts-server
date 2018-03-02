var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['BooksAssignModel'] = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "idBook",
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
      "name": "expires",
      "type": "datetime",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idBook": null,
    "idCourse": null,
    "expires": null
  }
};