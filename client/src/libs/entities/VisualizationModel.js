module.exports = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "idActivity",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "idAssignment",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "idLogins",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "resource",
      "type": "longtext",
      "nullable": false,
      "generated": false
    },
    {
      "name": "vscore",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "vseconds",
      "type": "int",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idActivity": null,
    "idAssignment": null,
    "idLogins": null,
    "resource": null,
    "vscore": 0,
    "vseconds": 0
  }
};