/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oytzyd4wwg2ufwy")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_YR7TCH5` ON `Invoices` (`number`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tvby9o99",
    "name": "number",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oytzyd4wwg2ufwy")

  collection.indexes = [
    "CREATE INDEX `idx_YR7TCH5` ON `Invoices` (`number`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tvby9o99",
    "name": "number",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
