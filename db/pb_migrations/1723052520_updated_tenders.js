/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("akfglnzhno8q38q")

  collection.updateRule = "user.id = @request.auth.id "
  collection.deleteRule = "user.id = @request.auth.id"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bfdigcsl",
    "name": "type",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("akfglnzhno8q38q")

  collection.updateRule = "user.id =@request.auth.id "
  collection.deleteRule = null

  // remove
  collection.schema.removeField("bfdigcsl")

  return dao.saveCollection(collection)
})
