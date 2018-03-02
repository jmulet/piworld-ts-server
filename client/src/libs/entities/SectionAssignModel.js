var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['SectionAssignModel'] = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "idSection",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "idGroup",
      "type": "int",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idSection": null,
    "idGroup": null
  }
};