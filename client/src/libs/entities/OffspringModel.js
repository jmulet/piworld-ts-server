var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['OffspringModel'] = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "idParent",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "idChild",
      "type": "int",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idParent": null,
    "idChild": null
  }
};