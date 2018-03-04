module.exports = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "html",
      "type": "longtext",
      "nullable": false,
      "generated": false
    },
    {
      "name": "title",
      "type": "longtext",
      "nullable": false,
      "generated": false
    },
    {
      "name": "expires",
      "type": "datetime",
      "nullable": false,
      "generated": false
    },
    {
      "name": "order",
      "type": "int",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "html": null,
    "title": null,
    "expires": null,
    "order": 0
  }
};