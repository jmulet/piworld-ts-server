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
      "generated": false,
      "validation": [
        {
          "type": "minLength",
          "constraints": [
            1
          ]
        }
      ]
    },
    {
      "name": "title",
      "type": "longtext",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "minLength",
          "constraints": [
            1
          ]
        }
      ]
    },
    {
      "name": "expires",
      "type": "datetime",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "isDate"
        },
        {
          "type": "conditionalValidation",
          "constraints": [
            null
          ]
        }
      ]
    },
    {
      "name": "order",
      "type": "int",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "min",
          "constraints": [
            -1
          ]
        },
        {
          "type": "isInt"
        }
      ]
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