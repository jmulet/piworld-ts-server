module.exports = {
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
      "name": "idUser",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "file",
      "type": "longtext",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "isNotEmpty"
        }
      ]
    },
    {
      "name": "message",
      "type": "longtext",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "isNotEmpty"
        }
      ]
    },
    {
      "name": "uploadDate",
      "type": "datetime",
      "nullable": false,
      "generated": false
    },
    {
      "name": "score",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "feedback",
      "type": "longtext",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idSection": null,
    "idUser": null,
    "file": null,
    "message": null,
    "uploadDate": null,
    "score": 0,
    "feedback": null
  }
};