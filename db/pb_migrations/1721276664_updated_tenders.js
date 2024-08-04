/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("akfglnzhno8q38q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pywfag4u",
    "name": "department",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "n0486itrsu3qc9y",
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
  collection.schema.removeField("pywfag4u")

  return dao.saveCollection(collection)
})
