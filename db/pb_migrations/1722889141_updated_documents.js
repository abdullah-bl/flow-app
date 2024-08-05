/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uak2irgeswmnwnp")

  collection.createRule = "@request.auth.id != \"\" || user.id = @request.auth.id"
  collection.updateRule = "@request.auth.id != \"\" || user.id = @request.auth.id"
  collection.deleteRule = "@request.auth.id != \"\" || user.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uak2irgeswmnwnp")

  collection.createRule = ""
  collection.updateRule = ""
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
