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
      "generated": false,
      "validation": [
        {
          "type": "RoleValidator"
        }
      ]
    },
    {
      "name": "username",
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
      "name": "fullname",
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
      "name": "password",
      "type": "text",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "PasswordValidator",
          "constraints": [
            4,
            true
          ]
        },
        {
          "type": "isNotEmpty"
        }
      ]
    },
    {
      "name": "passwordParents",
      "type": "text",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "PasswordValidator",
          "constraints": [
            4,
            true
          ]
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
      "name": "emailParents",
      "type": "text",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "isEmail",
          "constraints": [
            null
          ]
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
      "name": "mustChgPwd",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "IntRangeValidator",
          "constraints": [
            0,
            1
          ]
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
      "name": "email",
      "type": "text",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "isEmail",
          "constraints": [
            null
          ]
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
      "name": "emailPassword",
      "type": "text",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "conditionalValidation",
          "constraints": [
            null
          ]
        }
      ]
    },
    {
      "name": "phone",
      "type": "text",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "conditionalValidation",
          "constraints": [
            null
          ]
        }
      ]
    },
    {
      "name": "schoolId",
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
      "name": "created",
      "type": "date",
      "nullable": false,
      "generated": false
    },
    {
      "name": "valid",
      "type": "tinyint",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "IntRangeValidator",
          "constraints": [
            -1,
            1
          ]
        }
      ]
    },
    {
      "name": "uopts",
      "type": "longtext",
      "nullable": false,
      "generated": false,
      "validation": [
        {
          "type": "JsonStringValidator"
        }
      ]
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