/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oytzyd4wwg2ufwy")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_YR7TCH5` ON `Invoices` (`number`)",
    "CREATE INDEX `idx_jB4psys` ON `Invoices` (`budget`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d1cpiuue",
    "name": "budget",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "4zcgnr3oka65zv9",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oytzyd4wwg2ufwy")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_YR7TCH5` ON `Invoices` (`number`)"
  ]

  // remove
  collection.schema.removeField("d1cpiuue")

  return dao.saveCollection(collection)
})
