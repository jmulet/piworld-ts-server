var pwApp = window.pwApp || {};
pwApp.entities = pwApp.entities || {};
pwApp.entities['BooksModel'] = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "bookCode",
      "type": "longtext",
      "nullable": false,
      "generated": false
    },
    {
      "name": "title",
      "type": "longtext",
      "nullable": false,
      "generated": false
    },
    {
      "name": "author",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "url",
      "type": "longtext",
      "nullable": false,
      "generated": false
    },
    {
      "name": "year",
      "type": "int",
      "nullable": false,
      "generated": false
    },
    {
      "name": "level",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "genre",
      "type": "varchar",
      "nullable": false,
      "generated": false
    },
    {
      "name": "img",
      "type": "longtext",
      "nullable": false,
      "generated": false
    },
    {
      "name": "key",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "allStudents",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "allTeachers",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "bookCode": null,
    "title": null,
    "author": null,
    "url": null,
    "year": null,
    "level": null,
    "genre": null,
    "img": null,
    "key": null,
    "allStudents": null,
    "allTeachers": null
  }
};