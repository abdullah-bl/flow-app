/// <reference path="../pb_data/types.d.ts" />

onAfterBootstrap((e) => {
	console.log('App initialized!')
})

onRecordAfterUpdateRequest(
	(e) => {
		// console.log(e.httpContext)
		// console.log(`e.record is ${e.record.get('name')}`)
		const record = e.record.originalCopy()
		const user = e.record.get('user')
		const collection = $app.dao().findCollectionByNameOrId('histories')
		const new_record = new Record(collection, {
			target: e.record.id,
			action: 'UPDATE',
			user: user,
			note: `Record has been updated.`,
			original: record,
		})
		return $app.dao().saveRecord(new_record)
	},
	'tenders',
	'contracts'
)
