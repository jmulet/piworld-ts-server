module.exports = {
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
      "generated": false,
      "validation": [
        {
          "type": "isInt"
        }
      ]
    },
    {
      "name": "idChild",
      "type": "int",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "OffspringValidator"
        },
        {
          "type": "isInt"
        }
      ]
    }
  ],
  "defaultObject": {
    "id": null,
    "idParent": null,
    "idChild": null
  }
};