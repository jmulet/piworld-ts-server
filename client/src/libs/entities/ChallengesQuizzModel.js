module.exports = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "idChallenge",
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
      "name": "idCourse",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "when",
      "type": "datetime",
      "nullable": false,
      "generated": false
    },
    {
      "name": "answer",
      "type": "longtext",
      "nullable": false,
      "generated": false
    },
    {
      "name": "valid",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idChallenge": null,
    "idUser": null,
    "idCourse": null,
    "when": null,
    "answer": null,
    "valid": null
  }
};