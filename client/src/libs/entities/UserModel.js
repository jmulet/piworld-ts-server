var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['UserModel'] = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
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
      "name": "passwordParents",
      "type": "text",
      "nullable": false,
      "generated": false
    },
    {
      "name": "emailParents",
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
      "name": "phone",
      "type": "text",
      "nullable": false,
      "generated": false
    },
    {
      "name": "schoolId",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "created",
      "type": "date",
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
    "idRole": null,
    "username": null,
    "fullname": null,
    "password": null,
    "passwordParents": null,
    "emailParents": null,
    "mustChgPwd": 0,
    "email": null,
    "emailPassword": null,
    "phone": null,
    "schoolId": 1,
    "created": null,
    "valid": 1,
    "uopts": null
  }
};