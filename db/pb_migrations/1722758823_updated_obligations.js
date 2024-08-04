/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("81aghtl330o9e5n")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uemzbjtw",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("81aghtl330o9e5n")

  // remove
  collection.schema.removeField("uemzbjtw")

  return dao.saveCollection(collection)
})
