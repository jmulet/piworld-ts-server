var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['AssignmentUsersModel'] = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "idAssignment",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "idUser",
      "type": "int",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idAssignment": null,
    "idUser": null
  }
};