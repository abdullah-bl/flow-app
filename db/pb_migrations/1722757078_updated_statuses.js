/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jid5j3ieept0r08")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xxvmdtxz",
    "name": "duration",
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
  const collection = dao.findCollectionByNameOrId("jid5j3ieept0r08")

  // remove
  collection.schema.removeField("xxvmdtxz")

  return dao.saveCollection(collection)
})
