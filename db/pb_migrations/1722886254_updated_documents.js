/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uak2irgeswmnwnp")

  // remove
  collection.schema.removeField("noswhhqd")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kcyymahy",
    "name": "file",
    "type": "file",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 15242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uak2irgeswmnwnp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "noswhhqd",
    "name": "date",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kcyymahy",
    "name": "url",
    "type": "file",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 15242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
})
