/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q0cq3r75q7chype")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pyd3dpsk",
    "name": "tender",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "akfglnzhno8q38q",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q0cq3r75q7chype")

  // remove
  collection.schema.removeField("pyd3dpsk")

  return dao.saveCollection(collection)
})
