const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// components of the conection string
// - change localhost to the ip address of the host
// - change crunchbase to the name of the db in the host
MongoClient.connect('mongodb://localhost:27017/crunchbase', (err, db) => {
	assert.strictEqual(err, null);
	console.log('Successfully connected to MongoDB.');

	const query = { category_code: 'biotech' };
	const projection = { name: 1, number_of_employees: 1, _id: 0 };

	const cursor = db.collection('companies').find(query);
	cursor.project(projection);

	cursor.forEach(
		doc => {
			// console.log(doc.name + ' is a ' + doc.category_code + ' company.');
			console.log(doc);
		},
		err => {
			assert.strictEqual(err, null);
			return db.close();
		}
	);
});
