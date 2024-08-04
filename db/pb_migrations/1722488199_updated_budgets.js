/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4zcgnr3oka65zv9")

  collection.name = "budgets_items"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_kM0mmyR` ON `budgets_items` (\n  `name`,\n  `reference`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4zcgnr3oka65zv9")

  collection.name = "budgets"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_kM0mmyR` ON `budgets` (\n  `name`,\n  `reference`\n)"
  ]

  return dao.saveCollection(collection)
})
