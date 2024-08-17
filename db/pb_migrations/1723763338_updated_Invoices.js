/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oytzyd4wwg2ufwy")

  collection.createRule = "@request.auth.id != \"\" && @request.auth.id = user"
  collection.updateRule = "@request.auth.id != \"\" && @request.auth.id = user"
  collection.deleteRule = "@request.auth.id != \"\" && @request.auth.id = user"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oytzyd4wwg2ufwy")

  collection.createRule = "@request.auth.id != \"\" && @request.auth.id = user.id"
  collection.updateRule = "@request.auth.id != \"\" && @request.auth.id = user.id"
  collection.deleteRule = "@request.auth.id != \"\" && @request.auth.id = user.id"

  return dao.saveCollection(collection)
})
