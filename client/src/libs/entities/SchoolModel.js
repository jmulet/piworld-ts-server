module.exports = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "schoolName",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "professorName",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "professorEmail",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "language",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "enrollPassword",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "canEnroll",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "canPublish",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "sopts",
      "type": "json",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "schoolName": null,
    "professorName": null,
    "professorEmail": null,
    "language": "en",
    "enrollPassword": null,
    "canEnroll": 0,
    "canPublish": 1,
    "sopts": null
  }
};