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
      "generated": false,
      "validation": [
        {
          "type": "isInt"
        }
      ]
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
      "name": "recovery",
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
      "name": "created",
      "type": "datetime",
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
      "type": "json",
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
      "name": "sdr",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "sdd",
      "type": "datetime",
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
    "uopts": null,
    "sdr": null,
    "sdd": null
  }
};