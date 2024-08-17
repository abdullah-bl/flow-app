/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nk5jtnxreyh24hp")

  // remove
  collection.schema.removeField("txs6z2uz")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nk5jtnxreyh24hp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "txs6z2uz",
    "name": "award_date",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
