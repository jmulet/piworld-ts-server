module.exports = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
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
            11
          ]
        },
        {
          "type": "isNotEmpty"
        }
      ]
    },
    {
      "name": "longname",
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
    }
  ],
  "defaultObject": {
    "id": null,
    "name": "",
    "longname": null
  }
};