/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("akfglnzhno8q38q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4deeofff",
    "name": "status",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "jid5j3ieept0r08",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("akfglnzhno8q38q")

  // remove
  collection.schema.removeField("4deeofff")

  return dao.saveCollection(collection)
})
