/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("akfglnzhno8q38q")

  collection.listRule = "user.id = @request.auth.id || members.id = @request.auth.id"
  collection.viewRule = "user.id = @request.auth.id || members.id = @request.auth.id"
  collection.createRule = "user.id = @request.auth.id && @request.auth.id != \"\""
  collection.updateRule = "user.id =@request.auth.id "

  // remove
  collection.schema.removeField("9cy4yzbo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rmo3xusq",
    "name": "members",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wezowc2g",
    "name": "reference",
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

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = ""
  collection.updateRule = ""

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9cy4yzbo",
    "name": "start_date",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // remove
  collection.schema.removeField("rmo3xusq")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wezowc2g",
    "name": "reference_number",
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
