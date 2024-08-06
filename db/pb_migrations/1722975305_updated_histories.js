/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9onaepvpuk3pkxh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gd2bbwbs",
    "name": "original",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9onaepvpuk3pkxh")

  // remove
  collection.schema.removeField("gd2bbwbs")

  return dao.saveCollection(collection)
})
