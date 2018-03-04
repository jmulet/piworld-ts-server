module.exports = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "idSchool",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "idRole",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "username",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "fullname",
      "type": "longtext",
      "nullable": false,
      "generated": false
    },
    {
      "name": "password",
      "type": "text",
      "nullable": false,
      "generated": false
    },
    {
      "name": "mustChgPwd",
      "nullable": false,
      "generated": false
    },
    {
      "name": "email",
      "type": "text",
      "nullable": false,
      "generated": false
    },
    {
      "name": "emailPassword",
      "type": "text",
      "nullable": false,
      "generated": false
    },
    {
      "name": "recovery",
      "type": "text",
      "nullable": false,
      "generated": false
    },
    {
      "name": "created",
      "type": "datetime",
      "nullable": false,
      "generated": false
    },
    {
      "name": "valid",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "uopts",
      "type": "json",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idSchool": 1,
    "idRole": null,
    "username": null,
    "fullname": null,
    "password": null,
    "mustChgPwd": 0,
    "email": null,
    "emailPassword": null,
    "recovery": null,
    "valid": 1,
    "uopts": null
  }
};