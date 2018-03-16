module.exports = {
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
      "generated": false,
      "validation": [
        {
          "type": "maxLength",
          "constraints": [
            255
          ]
        },
        {
          "type": "isNotEmpty"
        }
      ]
    },
    {
      "name": "longname",
      "type": "longtext",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "isNotEmpty"
        }
      ]
    }
  ],
  "defaultObject": {
    "id": null,
    "idSubject": null,
    "name": null,
    "longname": null
  }
};