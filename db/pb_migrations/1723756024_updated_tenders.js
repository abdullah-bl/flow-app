/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("akfglnzhno8q38q")

  collection.updateRule = "user.id = @request.auth.id || @request.auth.id ~ members"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("akfglnzhno8q38q")

  collection.updateRule = "user.id = @request.auth.id "

  return dao.saveCollection(collection)
})
