/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "9onaepvpuk3pkxh",
    "created": "2024-08-06 17:02:07.722Z",
    "updated": "2024-08-06 17:02:07.722Z",
    "name": "histories",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qwqbb4oi",
        "name": "target",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "kgyv6bwz",
        "name": "action",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "CREATE",
            "UPDATE",
            "DELETE"
          ]
        }
      },
      {
        "system": false,
        "id": "3omnpe9x",
        "name": "notes",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "hmyubsok",
        "name": "user",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "user.id = @request.auth.id && @request.auth.id != \"\"",
    "updateRule": "",
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("9onaepvpuk3pkxh");

  return dao.deleteCollection(collection);
})
