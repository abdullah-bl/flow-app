/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4zcgnr3oka65zv9")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_kM0mmyR` ON `budgets` (\n  `name`,\n  `reference`\n)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rsewvdyl",
    "name": "closed",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4zcgnr3oka65zv9")

  collection.indexes = []

  // remove
  collection.schema.removeField("rsewvdyl")

  return dao.saveCollection(collection)
})
