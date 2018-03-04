module.exports = {
  "properties": [
    {
      "name": "id",
      "type": "int",
      "nullable": true,
      "generated": true
    },
    {
      "name": "idVisualization",
      "type": "int",
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
      "name": "rightAnwer",
      "type": "longtext",
      "nullable": false,
      "generated": false
    },
    {
      "name": "isValid",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    },
    {
      "name": "penalty",
      "type": "tinyint",
      "nullable": false,
      "generated": false
    }
  ],
  "defaultObject": {
    "id": null,
    "idVisualization": null,
    "answer": null,
    "rightAnwer": null,
    "isValid": null,
    "penalty": 0
  }
};